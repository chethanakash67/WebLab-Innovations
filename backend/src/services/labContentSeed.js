import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../db/pool.js";
import { ingestDocument, isLabRagConfigured } from "./labRag.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = path.resolve(__dirname, "../../content/lab-knowledge");

function titleFromFilename(filename) {
  return filename
    .replace(/\.md$/, "")
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function seedLabContent() {
  if (!isLabRagConfigured()) {
    console.warn("Lab content seeding skipped: GEMINI_API_KEY is not configured.");
    return { seeded: 0, skipped: 0 };
  }

  let filenames;

  try {
    filenames = (await fs.readdir(KNOWLEDGE_DIR)).filter((name) => name.endsWith(".md")).sort();
  } catch (error) {
    console.warn(`Lab content seeding skipped: could not read ${KNOWLEDGE_DIR} (${error.message}).`);
    return { seeded: 0, skipped: 0 };
  }

  let seeded = 0;
  let skipped = 0;

  for (const filename of filenames) {
    const filePath = path.join(KNOWLEDGE_DIR, filename);
    const content = await fs.readFile(filePath, "utf8");
    const contentHash = crypto.createHash("sha256").update(content).digest("hex");

    const existing = await pool.query(
      `SELECT content_hash FROM lab_documents WHERE source_type = 'site_content' AND source_key = $1`,
      [filename],
    );

    if (existing.rows[0]?.content_hash === contentHash) {
      skipped += 1;
      continue;
    }

    await ingestDocument({
      title: titleFromFilename(filename),
      sourceType: "site_content",
      sourceKey: filename,
      contentHash,
      content,
      uploadedBy: null,
    });
    seeded += 1;
  }

  console.log(`Lab content seed: ${seeded} document(s) (re)indexed, ${skipped} unchanged.`);
  return { seeded, skipped };
}
