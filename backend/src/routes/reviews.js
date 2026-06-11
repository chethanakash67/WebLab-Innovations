import crypto from "node:crypto";
import express from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import {
  canSendReviewModerationEmail,
  sendReviewModerationEmail,
} from "../services/mailer.js";

const router = express.Router();

const emailSchema = z.string().trim().email().transform((value) => value.toLowerCase());

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: emailSchema,
  role: z.string().trim().max(160).optional().default(""),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  quote: z.string().trim().min(10).max(1200),
});

function asyncHandler(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

function validationMessage(result) {
  return result.error.issues[0]?.message || "Invalid request.";
}

function reviewSecret() {
  return process.env.REVIEW_SECRET || "local-development-review-secret";
}

function hashApprovalToken(token) {
  return crypto.createHmac("sha256", reviewSecret()).update(token).digest("hex");
}

function isMatchingToken(receivedToken, savedHash) {
  const receivedHash = hashApprovalToken(receivedToken);
  const receivedBuffer = Buffer.from(receivedHash);
  const savedBuffer = Buffer.from(savedHash);

  return (
    receivedBuffer.length === savedBuffer.length &&
    crypto.timingSafeEqual(receivedBuffer, savedBuffer)
  );
}

function backendBaseUrl(request) {
  const configuredUrl = process.env.BACKEND_PUBLIC_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  return `${request.protocol}://${request.get("host")}`;
}

function sendModerationEmailInBackground({ review, approveUrl }) {
  sendReviewModerationEmail({ review, approveUrl })
    .then((sent) => {
      if (!sent) {
        console.warn("Review moderation email skipped: recipient or EmailJS config is missing.");
      }
    })
    .catch((error) => {
      console.error("Review moderation email failed:", error);
    });
}

function approvalPage(title, message) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #020303; color: #fff; font-family: Arial, sans-serif; }
      main { width: min(92vw, 520px); border: 1px solid rgba(255,255,255,.14); border-radius: 18px; padding: 32px; background: #0a0c0e; }
      h1 { margin: 0 0 12px; font-size: 28px; }
      p { margin: 0; color: rgba(255,255,255,.72); line-height: 1.6; }
    </style>
  </head>
  <body>
    <main>
      <h1>${title}</h1>
      <p>${message}</p>
    </main>
  </body>
</html>`;
}

router.get(
  "/",
  asyncHandler(async (_request, response) => {
    const result = await pool.query(
      `SELECT id, name, role, rating, quote, approved_at
       FROM portfolio_reviews
       WHERE status = 'approved'
       ORDER BY approved_at DESC, created_at DESC
       LIMIT 30`,
    );

    response.set("Cache-Control", "no-store");
    return response.json({
      success: true,
      reviews: result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        role: row.role || "Client",
        rating: row.rating,
        quote: row.quote,
        approvedAt: row.approved_at,
      })),
    });
  }),
);

router.post(
  "/",
  asyncHandler(async (request, response) => {
    const parsed = reviewSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({ success: false, message: validationMessage(parsed) });
    }

    const review = parsed.data;
    const approvalToken = crypto.randomBytes(32).toString("hex");
    const approvalTokenHash = hashApprovalToken(approvalToken);

    const insertResult = await pool.query(
      `INSERT INTO portfolio_reviews
        (name, email, role, rating, quote, approval_token_hash)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [
        review.name,
        review.email,
        review.role,
        review.rating,
        review.quote,
        approvalTokenHash,
      ],
    );

    const id = insertResult.rows[0].id;
    const approveUrl = `${backendBaseUrl(request)}/api/reviews/${id}/approve?token=${approvalToken}`;
    const notificationQueued = canSendReviewModerationEmail();
    sendModerationEmailInBackground({
      review: { ...review, id },
      approveUrl,
    });

    return response.status(201).json({
      success: true,
      message: "Review received and waiting for approval.",
      id,
      createdAt: insertResult.rows[0].created_at,
      notificationQueued,
    });
  }),
);

router.get(
  "/:id/approve",
  asyncHandler(async (request, response) => {
    const id = Number(request.params.id);
    const token = String(request.query.token || "");

    if (!Number.isInteger(id) || id <= 0 || token.length < 20) {
      return response
        .status(400)
        .type("html")
        .send(approvalPage("Invalid link", "This review approval link is not valid."));
    }

    const result = await pool.query(
      `SELECT id, approval_token_hash, status
       FROM portfolio_reviews
       WHERE id = $1
       LIMIT 1`,
      [id],
    );

    const review = result.rows[0];

    if (!review || !isMatchingToken(token, review.approval_token_hash)) {
      return response
        .status(403)
        .type("html")
        .send(approvalPage("Cannot approve", "This review approval link did not match."));
    }

    await pool.query(
      `UPDATE portfolio_reviews
       SET status = 'approved', approved_at = COALESCE(approved_at, NOW())
       WHERE id = $1`,
      [id],
    );

    return response
      .type("html")
      .send(approvalPage("Review approved", "The review is now approved and will show on the portfolio page."));
  }),
);

export default router;
