import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";
import { seedLibraryCatalog, seedPastClients, seedPrebuiltAssets } from "./seed.js";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const schemaPath = path.resolve(currentDir, "../../db/schema.sql");

export async function initDatabase() {
  const schema = await fs.readFile(schemaPath, "utf8");
  await pool.query(schema);

  // Ensure prebuilt_assets table has all required columns
  await pool.query(`
    ALTER TABLE prebuilt_assets ADD COLUMN IF NOT EXISTS price_inr TEXT;
    ALTER TABLE prebuilt_assets ADD COLUMN IF NOT EXISTS price_usd TEXT;
    ALTER TABLE prebuilt_assets ADD COLUMN IF NOT EXISTS original_price_inr TEXT;
    ALTER TABLE prebuilt_assets ADD COLUMN IF NOT EXISTS original_price_usd TEXT;
    ALTER TABLE prebuilt_assets ADD COLUMN IF NOT EXISTS limitations TEXT[] DEFAULT '{}';
    ALTER TABLE prebuilt_assets ADD COLUMN IF NOT EXISTS growth_tier_link TEXT;
    ALTER TABLE prebuilt_assets ADD COLUMN IF NOT EXISTS live_soon BOOLEAN DEFAULT FALSE;
  `);

  await seedLibraryCatalog();
  await seedPastClients();
  await seedPrebuiltAssets();
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
