import express from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { sendContactNotification } from "../services/mailer.js";

const router = express.Router();

const emailSchema = z.string().trim().email().transform((value) => value.toLowerCase());

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: emailSchema,
  phone: z.string().trim().max(40).optional().default(""),
  projectType: z.string().trim().min(2).max(80),
  projectGoal: z.string().trim().min(2).max(120),
  timeline: z.string().trim().min(2).max(120),
  budget: z
    .string()
    .trim()
    .max(80)
    .optional()
    .default("")
    .transform((value) => value || "Not sure yet"),
  message: z.string().trim().min(10).max(4000),
});

function asyncHandler(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

function validationMessage(result) {
  return result.error.issues[0]?.message || "Invalid request.";
}

router.post(
  "/",
  asyncHandler(async (request, response) => {
    const parsed = contactSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({ success: false, message: validationMessage(parsed) });
    }

    const inquiry = parsed.data;

    const insertResult = await pool.query(
      `INSERT INTO contact_inquiries
        (name, email, phone, project_type, project_goal, timeline, budget, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, created_at`,
      [
        inquiry.name,
        inquiry.email,
        inquiry.phone,
        inquiry.projectType,
        inquiry.projectGoal,
        inquiry.timeline,
        inquiry.budget,
        inquiry.message,
      ],
    );

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
  }),
);

export default router;
