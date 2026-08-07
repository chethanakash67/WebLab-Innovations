import express from "express";
import { pool } from "../db/pool.js";
import {
  canSendSubscriptionNotification,
  subscriptionNotificationStatus,
  sendSubscriptionNotification,
} from "../services/mailer.js";

const router = express.Router();

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sendSubscriptionEmailInBackground(email) {
  sendSubscriptionNotification(email)
    .then((sent) => {
      if (!sent) {
        const status = subscriptionNotificationStatus();
        console.warn(
          `Subscription email skipped: missing ${status.missing.join(", ")}.`
        );
      }
    })
    .catch((error) => {
      console.error("Subscription email failed:", error);
    });
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
  let rowData = { email: cleanEmail, created_at: new Date().toISOString() };

  try {
    const result = await pool.query(
      `INSERT INTO research_subscriptions (email)
       VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET status = 'active'
       RETURNING id, email, created_at`,
      [cleanEmail]
    );
    rowData = result.rows[0];
  } catch (error) {
    console.warn("Subscription DB operation fallback:", error.message);
  }

  sendSubscriptionEmailInBackground(cleanEmail);

  return res.status(200).json({
    success: true,
    message: "Thank you for subscribing, be ready for weekly insights from us.",
    data: rowData,
  });
});

export default router;
