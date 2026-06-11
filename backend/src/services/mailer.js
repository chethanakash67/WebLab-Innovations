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
    `Main help needed: ${inquiry.projectGoal || "Not sure"}`,
    `Timeline: ${inquiry.timeline || "Not sure"}`,
    `Budget/payment: ${inquiry.budget || "Not sure yet"}`,
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
      <p><strong>Main help needed:</strong> ${escapeHtml(inquiry.projectGoal || "Not sure")}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(inquiry.timeline || "Not sure")}</p>
      <p><strong>Budget/payment:</strong> ${escapeHtml(inquiry.budget || "Not sure yet")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(inquiry.message).replace(/\n/g, "<br>")}</p>
    `,
  });

  return true;
}

export async function sendReviewModerationEmail({ review, approveUrl }) {
  const to = process.env.REVIEW_TO || process.env.CONTACT_TO;

  if (!to) {
    return false;
  }

  const subject = `Review approval needed from ${review.name}`;
  const text = [
    `New portfolio review from ${review.name}`,
    `Email: ${review.email}`,
    `Role/business: ${review.role || "Not provided"}`,
    `Rating: ${review.rating}/5`,
    "",
    review.quote,
    "",
    `Approve and publish: ${approveUrl}`,
  ].join("\n");

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    replyTo: review.email,
    subject,
    text,
    html: `
      <h2>Review approval needed</h2>
      <p><strong>Name:</strong> ${escapeHtml(review.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(review.email)}</p>
      <p><strong>Role/business:</strong> ${escapeHtml(review.role || "Not provided")}</p>
      <p><strong>Rating:</strong> ${review.rating}/5</p>
      <p><strong>Review:</strong></p>
      <p>${escapeHtml(review.quote).replace(/\n/g, "<br>")}</p>
      <p>
        <a href="${escapeHtml(approveUrl)}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:#0ea5e9;color:#ffffff;text-decoration:none;font-weight:700;">
          Approve and publish review
        </a>
      </p>
    `,
  });

  return true;
}
