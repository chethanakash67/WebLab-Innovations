import crypto from "node:crypto";
import { pool } from "../db/pool.js";

const DEFAULT_ADMIN_EMAILS = "saividesh29@gmail.com,chethanakash67@gmail.com";
const OTP_THROTTLE_MS = 60 * 1000;

const otpRequestThrottle = new Map();

function adminSecret() {
  return process.env.LAB_ADMIN_SECRET || "local-development-lab-admin-secret";
}

function otpTtlMinutes() {
  const value = Number(process.env.LAB_ADMIN_OTP_TTL_MINUTES);
  return Number.isFinite(value) && value > 0 ? value : 10;
}

export function labAdminEmails() {
  return (process.env.LAB_ADMIN_EMAILS || DEFAULT_ADMIN_EMAILS)
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isLabAdminEmail(email) {
  return labAdminEmails().includes(String(email || "").trim().toLowerCase());
}

function hash(value) {
  return crypto.createHmac("sha256", adminSecret()).update(value).digest("hex");
}

function timingSafeEqualStrings(a, b) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && crypto.timingSafeEqual(bufferA, bufferB);
}

export function isOtpRequestThrottled(email) {
  const lastRequestAt = otpRequestThrottle.get(email);
  return Boolean(lastRequestAt && Date.now() - lastRequestAt < OTP_THROTTLE_MS);
}

export async function requestOtp(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const code = String(crypto.randomInt(0, 1000000)).padStart(6, "0");
  const expiresAt = new Date(Date.now() + otpTtlMinutes() * 60 * 1000);

  await pool.query(
    `INSERT INTO lab_admin_otps (email, code_hash, expires_at) VALUES ($1, $2, $3)`,
    [normalizedEmail, hash(code), expiresAt],
  );

  otpRequestThrottle.set(normalizedEmail, Date.now());

  return code;
}

export async function verifyOtp(email, code) {
  const normalizedEmail = email.trim().toLowerCase();

  const result = await pool.query(
    `SELECT id, code_hash, expires_at, consumed_at
     FROM lab_admin_otps
     WHERE email = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [normalizedEmail],
  );

  const otp = result.rows[0];

  if (!otp || otp.consumed_at || new Date(otp.expires_at) < new Date()) {
    return false;
  }

  if (!timingSafeEqualStrings(hash(code), otp.code_hash)) {
    return false;
  }

  await pool.query(`UPDATE lab_admin_otps SET consumed_at = NOW() WHERE id = $1`, [otp.id]);
  return true;
}

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

export function issueSessionToken(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${normalizedEmail}:${expiresAt}`;
  const payloadBase64 = Buffer.from(payload).toString("base64url");
  return `${payloadBase64}.${hash(payloadBase64)}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  const [payloadBase64, signature] = token.split(".");

  if (!timingSafeEqualStrings(hash(payloadBase64), signature)) {
    return null;
  }

  const payload = Buffer.from(payloadBase64, "base64url").toString("utf8");
  const [email, expiresAtRaw] = payload.split(":");
  const expiresAt = Number(expiresAtRaw);

  if (!email || !Number.isFinite(expiresAt) || Date.now() > expiresAt || !isLabAdminEmail(email)) {
    return null;
  }

  return { email };
}

export function requireLabAdmin(request, response, next) {
  const authHeader = request.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const session = verifySessionToken(token);

  if (!session) {
    return response.status(401).json({ success: false, message: "Admin session required." });
  }

  request.labAdminEmail = session.email;
  next();
}
