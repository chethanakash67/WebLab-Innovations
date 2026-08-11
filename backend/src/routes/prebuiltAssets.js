import express from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";

const router = express.Router();

const querySchema = z.object({
  category: z.string().trim().max(80).optional().default("all"),
  q: z.string().trim().max(120).optional().default(""),
});

function asyncHandler(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

router.get(
  "/",
  asyncHandler(async (request, response) => {
    const parsed = querySchema.safeParse({
      category: request.query.category,
      q: request.query.q,
    });

    if (!parsed.success) {
      return response.status(400).json({
        success: false,
        message: parsed.error.issues[0]?.message || "Invalid request parameters.",
      });
    }

    const { category, q } = parsed.data;
    const searchTerm = `%${q}%`;

    const result = await pool.query(
      `SELECT id, title, slug, category, tagline, description, price, original_price, badge, features, demo_url, created_at
       FROM prebuilt_assets
       WHERE published = TRUE
         AND ($1 = 'all' OR category ILIKE $1)
         AND (
           $2 = ''
           OR title ILIKE $3
           OR tagline ILIKE $3
           OR description ILIKE $3
           OR EXISTS (
             SELECT 1 FROM unnest(features) AS feature WHERE feature ILIKE $3
           )
         )
       ORDER BY id ASC`,
      [category, q, searchTerm]
    );

    response.set("Cache-Control", "public, max-age=60, s-maxage=300");
    return response.json({
      success: true,
      items: result.rows.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        category: row.category,
        tagline: row.tagline,
        description: row.description,
        price: row.price,
        originalPrice: row.original_price,
        badge: row.badge,
        features: row.features,
        demoUrl: row.demo_url,
        createdAt: row.created_at,
      })),
    });
  })
);

export default router;
