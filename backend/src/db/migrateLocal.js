import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const schemaPath = path.resolve(currentDir, "../../db/schema.sql");

async function migrate() {
  const schema = await fs.readFile(schemaPath, "utf8");
  const connectionString = process.env.LOCAL_DB_URL || process.env.DATABASE_URL;

  console.log("Migrating database schema to:", connectionString);

  try {
    const pool = new Pool({
      connectionString,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
    });

    await pool.query(schema);
    console.log("✓ All tables created successfully!");

    const res = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log("✓ Existing public tables:", res.rows.map((r) => r.table_name));

    await pool.end();
  } catch (err) {
    console.error("Migration failed:", err.message);
  }
}

migrate();
