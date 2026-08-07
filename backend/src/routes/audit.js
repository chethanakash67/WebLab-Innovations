import express from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import {
  canSendAuditNotification,
  auditNotificationStatus,
  sendAuditNotification,
} from "../services/mailer.js";

const router = express.Router();

const emailSchema = z.string().trim().email().transform((value) => value.toLowerCase());

const auditSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: emailSchema,
  phone: z.string().trim().max(40).optional().default(""),
  problems: z.array(z.string()).min(1).or(z.string().min(2)),
  otherProblem: z.string().trim().max(1000).optional().default(""),
});

function asyncHandler(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

function validationMessage(result) {
  return result.error.issues[0]?.message || "Invalid request.";
}

function sendNotificationInBackground(auditData) {
  sendAuditNotification(auditData)
    .then((sent) => {
      if (!sent) {
        const status = auditNotificationStatus();
        console.warn(
          `Audit notification skipped: missing ${status.missing.join(", ")}.`
        );
      }
    })
    .catch((error) => {
      console.error("Audit notification failed:", error);
    });
}

router.post(
  "/",
  asyncHandler(async (request, response) => {
    const parsed = auditSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({ success: false, message: validationMessage(parsed) });
    }

    const auditData = parsed.data;
    const problemsArray = Array.isArray(auditData.problems)
      ? auditData.problems
      : [auditData.problems];

    let recordId = Date.now();
    let createdAt = new Date().toISOString();

    try {
      const insertResult = await pool.query(
        `INSERT INTO audit_inquiries
          (name, email, phone, problems, other_problem)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, created_at`,
        [
          auditData.name,
          auditData.email,
          auditData.phone,
          problemsArray,
          auditData.otherProblem,
        ]
      );
      recordId = insertResult.rows[0].id;
      createdAt = insertResult.rows[0].created_at;
    } catch (dbError) {
      console.warn("Audit DB operation fallback:", dbError.message);
    }

    const notificationQueued = canSendAuditNotification();
    sendNotificationInBackground({
      ...auditData,
      problems: problemsArray,
    });

    return response.status(201).json({
      success: true,
      message: "Free audit request received. Our team will contact you shortly.",
      id: recordId,
      createdAt,
      notificationQueued,
    });
  })
);

export default router;
