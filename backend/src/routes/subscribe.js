import express from "express";
import { pool } from "../db/pool.js";

const router = express.Router();

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

router.post("/", async (req, res) => {
  const { email } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const result = await pool.query(
      `INSERT INTO research_subscriptions (email)
       VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET status = 'active'
       RETURNING id, email, created_at`,
      [cleanEmail]
    );

    return res.status(200).json({
      success: true,
      message: "Thankyou for subscribing, be ready for weekly insights from us.",
      data: result.rows[0],
    });
  } catch (error) {
    console.warn("Subscription DB operation fallback:", error.message);

    return res.status(200).json({
      success: true,
      message: "Thank you for subscribing to our research work!",
      data: { email: cleanEmail, created_at: new Date().toISOString() },
    });
  }
});

export default router;
