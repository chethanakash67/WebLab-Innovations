import crypto from "node:crypto";
import express from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { sendContactNotification, sendOtpEmail } from "../services/mailer.js";

const router = express.Router();
const maxOtpAttempts = 5;

const emailSchema = z.string().trim().email().transform((value) => value.toLowerCase());

const requestOtpSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: emailSchema,
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: emailSchema,
  phone: z.string().trim().max(40).optional().default(""),
  projectType: z.string().trim().min(2).max(80),
  budget: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(4000),
  otp: z.string().trim().regex(/^\d{6}$/),
});

function asyncHandler(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

function validationMessage(result) {
  return result.error.issues[0]?.message || "Invalid request.";
}

function otpSecret() {
  return process.env.OTP_SECRET || process.env.SMTP_PASS || "local-development-otp-secret";
}

function hashOtp(email, otp) {
  return crypto.createHmac("sha256", otpSecret()).update(`${email}:${otp}`).digest("hex");
}

function createOtp() {
  return String(crypto.randomInt(100000, 1000000));
}

router.post(
  "/request-otp",
  asyncHandler(async (request, response) => {
    const parsed = requestOtpSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({ success: false, message: validationMessage(parsed) });
    }

    const ttlMinutes = Number(process.env.OTP_TTL_MINUTES || 10);
    const otp = createOtp();
    const otpHash = hashOtp(parsed.data.email, otp);

    await pool.query(
      `INSERT INTO contact_otps (email, otp_hash, expires_at)
       VALUES ($1, $2, NOW() + ($3::TEXT || ' minutes')::INTERVAL)`,
      [parsed.data.email, otpHash, ttlMinutes],
    );

    await sendOtpEmail({
      to: parsed.data.email,
      name: parsed.data.name,
      otp,
      ttlMinutes,
    });

    return response.json({ success: true, message: "OTP sent." });
  }),
);

router.post(
  "/",
  asyncHandler(async (request, response) => {
    const parsed = contactSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({ success: false, message: validationMessage(parsed) });
    }

    const inquiry = parsed.data;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const otpResult = await client.query(
        `SELECT id, otp_hash, attempts, expires_at
         FROM contact_otps
         WHERE email = $1 AND consumed_at IS NULL
         ORDER BY created_at DESC
         LIMIT 1
         FOR UPDATE`,
        [inquiry.email],
      );

      const otpRow = otpResult.rows[0];

      if (!otpRow) {
        await client.query("ROLLBACK");
        return response.status(400).json({ success: false, message: "Request an OTP first." });
      }

      if (otpRow.attempts >= maxOtpAttempts) {
        await client.query("ROLLBACK");
        return response.status(400).json({ success: false, message: "OTP attempts exceeded." });
      }

      if (new Date(otpRow.expires_at).getTime() < Date.now()) {
        await client.query("ROLLBACK");
        return response.status(400).json({ success: false, message: "OTP expired." });
      }

      if (otpRow.otp_hash !== hashOtp(inquiry.email, inquiry.otp)) {
        await client.query("UPDATE contact_otps SET attempts = attempts + 1 WHERE id = $1", [
          otpRow.id,
        ]);
        await client.query("COMMIT");
        return response.status(400).json({ success: false, message: "Invalid OTP." });
      }

      await client.query("UPDATE contact_otps SET consumed_at = NOW() WHERE id = $1", [
        otpRow.id,
      ]);

      const insertResult = await client.query(
        `INSERT INTO contact_inquiries
          (name, email, phone, project_type, budget, message)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, created_at`,
        [
          inquiry.name,
          inquiry.email,
          inquiry.phone,
          inquiry.projectType,
          inquiry.budget,
          inquiry.message,
        ],
      );

      await client.query("COMMIT");

      let notificationSent = false;

      try {
        notificationSent = await sendContactNotification(inquiry);
      } catch (error) {
        console.error("Contact notification failed:", error);
      }

      return response.status(201).json({
        success: true,
        message: "Enquiry received.",
        id: insertResult.rows[0].id,
        createdAt: insertResult.rows[0].created_at,
        notificationSent,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }),
);

export default router;
