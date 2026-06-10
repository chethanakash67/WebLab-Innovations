import nodemailer from "nodemailer";

let transporter;

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required for email delivery.`);
  }

  return value;
}

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const port = Number(process.env.SMTP_PORT || 587);

  transporter = nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
  });

  return transporter;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendOtpEmail({ to, name, otp, ttlMinutes }) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  await getTransporter().sendMail({
    from,
    to,
    subject: "Your WebLab enquiry OTP",
    text: `Hi ${name}, your WebLab enquiry OTP is ${otp}. It expires in ${ttlMinutes} minutes.`,
    html: `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Your WebLab enquiry OTP is <strong>${otp}</strong>.</p>
      <p>This code expires in ${ttlMinutes} minutes.</p>
    `,
  });
}

export async function sendContactNotification(inquiry) {
  const to = process.env.CONTACT_TO;

  if (!to) {
    return false;
  }

  const subject = `New WebLab enquiry from ${inquiry.name}`;
  const text = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Project type: ${inquiry.projectType}`,
    `Budget: ${inquiry.budget}`,
    "",
    inquiry.message,
  ].join("\n");

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    replyTo: inquiry.email,
    subject,
    text,
    html: `
      <h2>New WebLab enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone || "Not provided")}</p>
      <p><strong>Project type:</strong> ${escapeHtml(inquiry.projectType)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(inquiry.budget)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(inquiry.message).replace(/\n/g, "<br>")}</p>
    `,
  });

  return true;
}
