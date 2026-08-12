import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../db/pool.js";
import { ingestDocument } from "./labRag.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Single source of truth for everything the assistant knows about the agency. Drop a new
// .md file in here (or in a subfolder) and it is picked up on the next boot or reindex —
// no code change needed. Files starting with "_" are notes/instructions, not knowledge.
export const KNOWLEDGE_DIR = path.resolve(__dirname, "../../data");

function isKnowledgeFile(name) {
  return name.endsWith(".md") && !name.startsWith("_");
}

// Walks subfolders so the knowledge base can be organised into topic directories later.
async function collectMarkdownFiles(dir, relativeBase = "") {
  let entries;

  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    throw new Error(`could not read ${dir} (${error.message})`);
  }

  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const relativePath = relativeBase ? path.join(relativeBase, entry.name) : entry.name;

    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(path.join(dir, entry.name), relativePath)));
    } else if (isKnowledgeFile(entry.name)) {
      files.push(relativePath);
    }
  }

  return files.sort();
}

// Prefer the document's own H1 so titles (which the assistant cites as sources) stay
// meaningful without depending on file naming.
function documentTitle(relativePath, content) {
  const heading = content.match(/^#\s+(.+)$/m);

  if (heading) {
    return heading[1].trim();
  }

  return path
    .basename(relativePath, ".md")
    .replace(/^\d+[-_]/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Drops indexed documents whose source file was deleted, so removing a .md actually
// removes that knowledge from the bot instead of leaving it answering from a stale copy.
async function pruneRemovedDocuments(presentKeys) {
  const result = await pool.query(
    `SELECT id, source_key FROM lab_documents WHERE source_type = 'site_content'`,
  );

  const stale = result.rows.filter((row) => !presentKeys.has(row.source_key));

  for (const row of stale) {
    await pool.query(`DELETE FROM lab_documents WHERE id = $1`, [row.id]);
    console.log(`Lab content seed: removed "${row.source_key}" (file no longer in data/).`);
  }

  return stale.length;
}

export async function seedLabContent() {
  // No key check here: embeddings fall back to the local vectorizer, so the knowledge
  // base can always be indexed even before any provider key is set.
  let relativePaths;

  try {
    relativePaths = await collectMarkdownFiles(KNOWLEDGE_DIR);
  } catch (error) {
    console.warn(`Lab content seeding skipped: ${error.message}.`);
    return { seeded: 0, skipped: 0, removed: 0 };
  }

  let seeded = 0;
  let skipped = 0;

  for (const relativePath of relativePaths) {
    const content = await fs.readFile(path.join(KNOWLEDGE_DIR, relativePath), "utf8");

    if (!content.trim()) {
      console.warn(`Lab content seed: skipping empty file "${relativePath}".`);
      continue;
    }

    const contentHash = crypto.createHash("sha256").update(content).digest("hex");

    const existing = await pool.query(
      `SELECT content_hash FROM lab_documents WHERE source_type = 'site_content' AND source_key = $1`,
      [relativePath],
    );

    if (existing.rows[0]?.content_hash === contentHash) {
      skipped += 1;
      continue;
    }

    await ingestDocument({
      title: documentTitle(relativePath, content),
      sourceType: "site_content",
      sourceKey: relativePath,
      contentHash,
      content,
      uploadedBy: null,
    });
    seeded += 1;
  }

  const removed = await pruneRemovedDocuments(new Set(relativePaths));

  console.log(
    `Lab content seed: ${seeded} document(s) (re)indexed, ${skipped} unchanged, ${removed} removed.`,
  );
  return { seeded, skipped, removed };
}
