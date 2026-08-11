import { Router } from "express";
import { pool } from "../db/pool.js";

const router = Router();

// Save product claim to CRM database
router.post("/", async (req, res) => {
  const { name, email, phone, product_name, product_slug, price } = req.body || {};

  if (!name || !email || !phone || !product_name) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields (name, email, phone, product_name).",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO product_claims (name, email, phone, product_name, product_slug, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        product_name.trim(),
        product_slug || null,
        price || null,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Product claim request stored in CRM successfully.",
      claimId: result.rows[0]?.id,
    });
  } catch (err) {
    console.error("Error storing product claim:", err);
    return res.status(500).json({
      success: false,
      message: "Database error while storing product claim.",
    });
  }
});

// Fetch product claims list for CRM admin dashboard
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, phone, product_name, product_slug, price, status, created_at
       FROM product_claims
       ORDER BY created_at DESC`
    );
    return res.json({ success: true, items: result.rows });
  } catch (err) {
    console.error("Error fetching product claims:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router;
