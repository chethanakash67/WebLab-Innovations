import express from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";

const router = express.Router();

const catalogTypes = [
  "audit",
  "report",
  "benchmark_comparison",
  "guide",
  "case_study",
];

const querySchema = z.object({
  type: z.enum(["all", ...catalogTypes]).default("all"),
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
      type: request.query.type,
      q: request.query.q,
    });

    if (!parsed.success) {
      return response.status(400).json({
        success: false,
        message: parsed.error.issues[0]?.message || "Invalid request.",
      });
    }

    const { type, q } = parsed.data;
    const searchTerm = `%${q}%`;

    const result = await pool.query(
      `SELECT id, title, slug, summary, type, file_path, tags, created_at
       FROM library_catalog
       WHERE published = TRUE
         AND ($1 = 'all' OR type = $1::catalog_type)
         AND (
           $2 = ''
           OR title ILIKE $3
           OR summary ILIKE $3
           OR EXISTS (
             SELECT 1 FROM unnest(tags) AS tag WHERE tag ILIKE $3
           )
         )
       ORDER BY created_at DESC, id DESC
       LIMIT 100`,
      [type, q, searchTerm],
    );

    response.set("Cache-Control", "no-store");
    return response.json({
      success: true,
      items: result.rows.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        summary: row.summary,
        type: row.type,
        filePath: row.file_path,
        tags: row.tags,
        createdAt: row.created_at,
      })),
    });
  }),
);

export default router;
