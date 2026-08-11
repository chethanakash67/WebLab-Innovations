import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const schemaPath = path.resolve(currentDir, "../../db/schema.sql");

const testUrls = [
  process.env.LOCAL_DATABASE_URL,
  "postgresql://postgres:postgres@localhost:5432/postgres",
  "postgresql://postgres:admin@localhost:5432/postgres",
  "postgresql://postgres:root@localhost:5432/postgres",
  "postgresql://postgres:password@localhost:5432/postgres",
  "postgresql://postgres:123456@localhost:5432/postgres",
  "postgresql://postgres@localhost:5432/postgres",
  "postgresql://postgres:postgres@127.0.0.1:5432/postgres",
].filter(Boolean);

async function runLocalInit() {
  const schema = await fs.readFile(schemaPath, "utf8");
  let connected = false;

  for (const url of testUrls) {
    try {
      console.log("Attempting local PostgreSQL connection with:", url);
      const pool = new Pool({ connectionString: url });
      await pool.query("SELECT 1");
      console.log("✓ Connected successfully to local PostgreSQL at:", url);

      await pool.query(schema);
      console.log("✓ All tables created successfully on local PostgreSQL database!");

      const tablesRes = await pool.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
      );
      console.log(
        "Existing tables in public schema:",
        tablesRes.rows.map((r) => r.table_name)
      );

      // Seed initial data into local PG
      await pool.query(`
        INSERT INTO prebuilt_assets (title, slug, category, tagline, description, price, original_price, badge, features, demo_url)
        VALUES (
          'Blue and white sleek web design and development',
          'blue-white-sleek-web-design',
          'Websites',
          'Ultra-sleek, mobile-first functional web design that psychologically invokes trust and calm.',
          'Originally developed as custom client work, this high-end web architecture can be fully custom-replicated for your business with your brand story, custom typography, color themes, and smooth micro-interactions.',
          '₹3,999/-',
          '₹8,000/-',
          'Web Product',
          ARRAY[
            'Mobile-First & Ultra-Fast Responsive Performance',
            'Sleek Functional Design & Smooth Micro-Interactions',
            'Psychological Color Palette Touching Calmness & Trust',
            'High-Converting Clear CTAs & Proof Establishment',
            'Custom Replicated Layout, Fonts & Design Assets for Your Brand',
            'WhatsApp Direct Lead & Inquiry Capture Ready'
          ],
          'https://narayanaschoolctr.vercel.app/'
        )
        ON CONFLICT (slug) DO NOTHING;
      `);
      console.log("✓ Seed data inserted into local PostgreSQL!");

      await pool.end();
      connected = true;
      break;
    } catch (err) {
      console.log("Could not connect with", url, ":", err.message);
    }
  }

  if (!connected) {
    console.error("❌ Could not connect to any local PostgreSQL instance.");
  }
}

runLocalInit();
