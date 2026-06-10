import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const schemaPath = path.resolve(currentDir, "../../db/schema.sql");

export async function initDatabase() {
  const schema = await fs.readFile(schemaPath, "utf8");
  await pool.query(schema);
}

if (process.argv[1] === currentFile) {
  initDatabase()
    .then(async () => {
      await pool.end();
      console.log("Database schema is ready.");
    })
    .catch(async (error) => {
      console.error("Database initialization failed:", error);
      await pool.end();
      process.exit(1);
    });
}
