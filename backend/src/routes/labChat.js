import crypto from "node:crypto";
import express from "express";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import { z } from "zod";
import { pool } from "../db/pool.js";
import {
  answerQuestion,
  deleteDocument,
  ingestDocument,
  listDocuments,
  loadChunkCacheFromDb,
} from "../services/labRag.js";
import { seedLabContent } from "../services/labContentSeed.js";
import {
  isLabAdminEmail,
  isOtpRequestThrottled,
  issueSessionToken,
  requestOtp,
  requireLabAdmin,
  verifyOtp,
} from "../services/labAuth.js";
import { sendLabAdminOtpEmail, sendLabUnansweredQuestionEmail } from "../services/mailer.js";

const router = express.Router();

const emailSchema = z.string().trim().email().transform((value) => value.toLowerCase());

function asyncHandler(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

function validationMessage(result) {
  return result.error.issues[0]?.message || "Invalid request.";
}

function maxUploadBytes() {
  const mb = Number(process.env.LAB_MAX_UPLOAD_MB);
  return (Number.isFinite(mb) && mb > 0 ? mb : 15) * 1024 * 1024;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxUploadBytes() },
});

// -------------------------------------------------------------
// Public ask endpoint — light per-IP rate limiting.
// -------------------------------------------------------------

const askSchema = z.object({
  question: z.string().trim().min(2).max(500),
  sessionId: z.string().trim().max(120).optional(),
});

const ASK_RATE_LIMIT = 15;
const ASK_RATE_WINDOW_MS = 5 * 60 * 1000;
const askRateBuckets = new Map();

function isAskRateLimited(ip) {
  const now = Date.now();
  const bucket = askRateBuckets.get(ip);

  if (!bucket || now - bucket.windowStart > ASK_RATE_WINDOW_MS) {
    askRateBuckets.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  bucket.count += 1;
  return bucket.count > ASK_RATE_LIMIT;
}

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

// Only escalate a question the founders haven't already been told about, and cap how many
// alerts can go out per hour so a visitor hammering the box can't flood their inbox.
async function shouldEscalate(question) {
  const dedupeDays = envNumber("LAB_UNANSWERED_DEDUPE_DAYS", 7);
  const maxPerHour = envNumber("LAB_UNANSWERED_MAX_PER_HOUR", 10);

  const duplicate = await pool.query(
    `SELECT 1 FROM lab_chat_logs
     WHERE escalated = TRUE
       AND lower(btrim(question)) = lower(btrim($1))
       AND created_at > NOW() - ($2 || ' days')::interval
     LIMIT 1`,
    [question, String(dedupeDays)],
  );

  if (duplicate.rows.length > 0) {
    return false;
  }

  const recent = await pool.query(
    `SELECT COUNT(*)::int AS count FROM lab_chat_logs
     WHERE escalated = TRUE AND created_at > NOW() - INTERVAL '1 hour'`,
  );

  if (recent.rows[0].count >= maxPerHour) {
    console.warn("Lab unanswered-question alert suppressed: hourly cap reached.");
    return false;
  }

  return true;
}

async function escalateUnansweredQuestion({ logId, question, sessionId }) {
  if (!(await shouldEscalate(question))) {
    return;
  }

  const sent = await sendLabUnansweredQuestionEmail({ question, sessionId, askedAt: new Date() });

  if (sent && logId) {
    await pool.query(`UPDATE lab_chat_logs SET escalated = TRUE WHERE id = $1`, [logId]);
  }
}

router.post(
  "/ask",
  asyncHandler(async (request, response) => {
    if (isAskRateLimited(request.ip)) {
      return response.status(429).json({ success: false, message: "Too many questions, please slow down." });
    }

    const parsed = askSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({ success: false, message: validationMessage(parsed) });
    }

    const { question, sessionId } = parsed.data;
    const result = await answerQuestion(question);

    let logId = null;

    try {
      const inserted = await pool.query(
        `INSERT INTO lab_chat_logs (session_id, question, answer, matched) VALUES ($1, $2, $3, $4) RETURNING id`,
        [sessionId || null, question, result.answer, result.matched],
      );
      logId = inserted.rows[0].id;
    } catch (error) {
      console.warn("Lab chat log insert failed:", error.message);
    }

    // The visitor shouldn't wait on an outbound email, so alert the founders after replying.
    const { agencyRelated, ...payload } = result;
    response.json({ success: true, ...payload });

    if (!result.matched && agencyRelated) {
      escalateUnansweredQuestion({ logId, question, sessionId }).catch((error) =>
        console.error("Lab unanswered-question alert failed:", error.message),
      );
    }
  }),
);

// -------------------------------------------------------------
// Admin login (email OTP)
// -------------------------------------------------------------

router.post(
  "/admin/login/request",
  asyncHandler(async (request, response) => {
    const parsed = emailSchema.safeParse(request.body?.email);

    if (!parsed.success) {
      return response.status(400).json({ success: false, message: "Enter a valid email address." });
    }

    const email = parsed.data;

    if (!isLabAdminEmail(email)) {
      return response.status(403).json({ success: false, message: "This email is not authorized to manage the Lab assistant." });
    }

    if (isOtpRequestThrottled(email)) {
      return response.status(429).json({ success: false, message: "Please wait a moment before requesting another code." });
    }

    const code = await requestOtp(email);
    const sent = await sendLabAdminOtpEmail({ email, code });

    return response.json({ success: true, message: sent ? "Code sent." : "Code generated but email delivery is not configured." });
  }),
);

const verifySchema = z.object({
  email: emailSchema,
  code: z.string().trim().length(6),
});

router.post(
  "/admin/login/verify",
  asyncHandler(async (request, response) => {
    const parsed = verifySchema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({ success: false, message: validationMessage(parsed) });
    }

    const { email, code } = parsed.data;

    if (!isLabAdminEmail(email)) {
      return response.status(403).json({ success: false, message: "This email is not authorized." });
    }

    const valid = await verifyOtp(email, code);

    if (!valid) {
      return response.status(401).json({ success: false, message: "Invalid or expired code." });
    }

    const token = issueSessionToken(email);
    return response.json({ success: true, token, email });
  }),
);

// -------------------------------------------------------------
// Admin document management
// -------------------------------------------------------------

router.get(
  "/admin/documents",
  requireLabAdmin,
  asyncHandler(async (_request, response) => {
    const documents = await listDocuments();
    return response.json({ success: true, documents });
  }),
);

function extToMime(filename) {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "pdf";
  if (ext === "md" || ext === "txt") return "text";
  return null;
}

router.post(
  "/admin/documents",
  requireLabAdmin,
  upload.single("file"),
  asyncHandler(async (request, response) => {
    if (!request.file) {
      return response.status(400).json({ success: false, message: "No file uploaded." });
    }

    const { originalname, buffer } = request.file;
    const kind = extToMime(originalname);

    if (!kind) {
      return response.status(400).json({ success: false, message: "Only .txt, .md, and .pdf files are supported." });
    }

    let content;

    if (kind === "pdf") {
      const parser = new PDFParse({ data: buffer });
      try {
        const parsed = await parser.getText();
        content = parsed.text;
      } finally {
        await parser.destroy();
      }
    } else {
      content = buffer.toString("utf8");
    }

    if (!content || !content.trim()) {
      return response.status(400).json({ success: false, message: "Could not extract any text from this file." });
    }

    const sourceKey = `${Date.now()}-${originalname}`;
    const contentHash = crypto.createHash("sha256").update(content).digest("hex");

    const documentId = await ingestDocument({
      title: originalname,
      sourceType: "upload",
      sourceKey,
      contentHash,
      content,
      uploadedBy: request.labAdminEmail,
    });

    await loadChunkCacheFromDb();

    return response.status(201).json({ success: true, documentId });
  }),
);

router.delete(
  "/admin/documents/:id",
  requireLabAdmin,
  asyncHandler(async (request, response) => {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ success: false, message: "Invalid document id." });
    }

    await deleteDocument(id);
    await loadChunkCacheFromDb();

    return response.json({ success: true });
  }),
);

router.post(
  "/admin/reindex-site-content",
  requireLabAdmin,
  asyncHandler(async (_request, response) => {
    const result = await seedLabContent();
    await loadChunkCacheFromDb();

    return response.json({ success: true, ...result });
  }),
);

export default router;
