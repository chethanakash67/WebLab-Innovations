import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";
const connectionString = isProduction
  ? (process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL)
  : (process.env.DATABASE_URL || "postgresql://postgres:POSTGRESQL@localhost:5432/aigleonlabs");

const shouldUseSsl = isProduction && process.env.DATABASE_SSL !== "false";

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export const pool = new Pool({
  connectionString,
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
  connectionTimeoutMillis: envNumber("DATABASE_CONNECT_TIMEOUT_MS", 10000),
  query_timeout: envNumber("DATABASE_QUERY_TIMEOUT_MS", 15000),
  statement_timeout: envNumber("DATABASE_STATEMENT_TIMEOUT_MS", 15000),
});
