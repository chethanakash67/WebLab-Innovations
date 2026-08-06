import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const sslMode = process.env.DATABASE_SSL;
const shouldUseSsl =
  sslMode === "true" || (sslMode !== "false" && process.env.NODE_ENV === "production");

function envNumber(name, fallback) {
  const value = Number(process.env[name]);

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
  connectionTimeoutMillis: envNumber("DATABASE_CONNECT_TIMEOUT_MS", 10000),
  query_timeout: envNumber("DATABASE_QUERY_TIMEOUT_MS", 15000),
  statement_timeout: envNumber("DATABASE_STATEMENT_TIMEOUT_MS", 15000),
});
