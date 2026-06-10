import pg from "pg";

const { Pool } = pg;

const sslMode = process.env.DATABASE_SSL;
const shouldUseSsl =
  sslMode === "true" || (sslMode !== "false" && process.env.NODE_ENV === "production");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
});
