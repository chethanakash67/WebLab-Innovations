const EMAILJS_SEND_URL =
  process.env.EMAILJS_SEND_URL || "https://api.emailjs.com/api/v1.0/email/send";
const EMAILJS_MIN_SEND_GAP_MS = 1100;

let emailJsQueue = Promise.resolve();
let lastEmailJsSendAt = 0;

function envNumber(name, fallback) {
  const value = Number(process.env[name]);

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function emailJsConfig(templateEnvName) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const templateId = process.env[templateEnvName];

  if (!serviceId || !publicKey || !templateId) {
    return null;
  }

  return {
    serviceId,
    publicKey,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
    templateId,
  };
}

function missingEmailJsEnv(templateEnvName, recipientEnvNames = []) {
  const missing = [];
  const hasRecipient =
    recipientEnvNames.length === 0 ||
    recipientEnvNames.some((name) => Boolean(process.env[name]));

  if (!hasRecipient) {
    missing.push(recipientEnvNames.join(" or "));
  }

  for (const name of ["EMAILJS_SERVICE_ID", "EMAILJS_PUBLIC_KEY", templateEnvName]) {
    if (!process.env[name]) {
      missing.push(name);
    }
  }

  return missing;
}

function notificationStatus(templateEnvName, recipientEnvNames) {
  const missing = missingEmailJsEnv(templateEnvName, recipientEnvNames);

  return {
    ready: missing.length === 0,
    missing,
  };
}

export function contactNotificationStatus() {
  return notificationStatus("EMAILJS_CONTACT_TEMPLATE_ID", ["CONTACT_TO"]);
}

export function reviewModerationEmailStatus() {
  return notificationStatus("EMAILJS_REVIEW_TEMPLATE_ID", ["REVIEW_TO", "CONTACT_TO"]);
}

export function emailNotificationStatus() {
  return {
    contact: contactNotificationStatus(),
    review: reviewModerationEmailStatus(),
  };
}

export function canSendContactNotification() {
  return contactNotificationStatus().ready;
}

export function canSendReviewModerationEmail() {
  return reviewModerationEmailStatus().ready;
}

function enqueueEmailJsSend(task) {
  const queuedTask = emailJsQueue.then(async () => {
    const elapsedSinceLastSend = Date.now() - lastEmailJsSendAt;
    const waitMs = Math.max(0, EMAILJS_MIN_SEND_GAP_MS - elapsedSinceLastSend);

    if (waitMs > 0) {
      await delay(waitMs);
    }

    try {
      return await task();
    } finally {
      lastEmailJsSendAt = Date.now();
    }
  });

  emailJsQueue = queuedTask.catch(() => {});

  return queuedTask;
}

async function emailJsErrorMessage(response) {
  const fallback = response.statusText || "EmailJS request failed.";
  const text = await response.text().catch(() => "");

  if (!text) {
    return fallback;
  }

  try {
    const data = JSON.parse(text);

    return data.message || data.error || data.text || text;
  } catch {
    return text;
  }
}

async function sendEmailJsTemplate(templateEnvName, templateParams) {
  const config = emailJsConfig(templateEnvName);

  if (!config) {
    return false;
  }

  return enqueueEmailJsSend(async () => {
    const timeout = envNumber("MAIL_TIMEOUT_MS", 10000);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const body = {
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        template_params: templateParams,
      };

      if (config.privateKey) {
        body.accessToken = config.privateKey;
      }

      const response = await fetch(EMAILJS_SEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        const message = await emailJsErrorMessage(response);
        throw new Error(`EmailJS send failed (${response.status}): ${message}`);
      }

      return true;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`EmailJS send timed out after ${timeout}ms.`);
      }

      throw error;
    } finally {
      clearTimeout(timer);
    }
  });
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function textToHtml(text) {
  return escapeHtml(text).replace(/\n/g, "<br>");
}

function emailShell({ eyebrow, title, intro, content, footer }) {
  return `
    <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#111827;">
      <div style="max-width:640px;margin:0 auto;padding:32px 18px;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
          <div style="background:#0b1220;padding:28px 30px;">
            <p style="margin:0 0 8px;color:#38bdf8;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
              ${escapeHtml(eyebrow)}
            </p>
            <h2 style="margin:0;color:#ffffff;font-size:26px;line-height:1.25;">
              ${escapeHtml(title)}
            </h2>
          </div>

          <div style="padding:28px 30px;">
            <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.7;">
              ${escapeHtml(intro)}
            </p>
            ${content}
            ${
              footer
                ? `<p style="margin:24px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">${escapeHtml(
                    footer,
                  )}</p>`
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

function detailRows(rows) {
  return `
    <div style="padding:18px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;">
      ${rows
        .map(
          ([label, value], index) => `
            <p style="margin:0 0 ${
              index === rows.length - 1 ? "0" : "14px"
            };font-size:14px;">
              <strong style="display:inline-block;width:120px;color:#6b7280;">${escapeHtml(
                label,
              )}</strong>
              <span style="color:#111827;">${escapeHtml(value)}</span>
            </p>
          `,
        )
        .join("")}
    </div>
  `;
}

function messageBlock(label, message) {
  return `
    <div style="margin-top:24px;">
      <p style="margin:0 0 10px;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">
        ${escapeHtml(label)}
      </p>
      <div style="padding:18px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;color:#111827;font-size:15px;line-height:1.7;white-space:pre-line;">
        ${textToHtml(message)}
      </div>
    </div>
  `;
}

function contactDetails({ inquiry, phone, projectGoal, timeline, budget }) {
  return detailRows([
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", phone],
    ["Project Type", inquiry.projectType],
    ["Help Needed", projectGoal],
    ["Timeline", timeline],
    ["Budget", budget],
  ]);
}

function contactAutoReplyContent({ inquiry, phone, projectGoal, timeline, budget }) {
  const subject = "We received your WebLab project request";
  const text = [
    `Hi ${inquiry.name},`,
    "",
    "Thanks for sharing your project details with WebLab Innovations.",
    "We have received your request, and our team will go through it and contact you soon.",
    "",
    `Project type: ${inquiry.projectType}`,
    `Main help needed: ${projectGoal}`,
    `Timeline: ${timeline}`,
    `Budget/payment: ${budget}`,
    "",
    "We usually reply within 24 hours.",
    "",
    "Regards,",
    "WebLab Innovations",
  ].join("\n");
  const html = emailShell({
    eyebrow: "WebLab Innovations",
    title: "We received your project request",
    intro: `Hi ${inquiry.name}, thanks for sharing your project details. We have received your request, and our team will go through it and contact you soon.`,
    content: `
      ${contactDetails({ inquiry, phone, projectGoal, timeline, budget })}
      ${messageBlock("Your Message", inquiry.message)}
    `,
    footer: "We usually reply within 24 hours. Regards, WebLab Innovations.",
  });

  return { subject, text, html };
}

export async function sendContactNotification(inquiry) {
  if (!canSendContactNotification()) {
    return false;
  }

  const to = process.env.CONTACT_TO;

  if (!to) {
    return false;
  }

  const projectGoal = inquiry.projectGoal || "Not sure";
  const phone = inquiry.phone || "Not provided";
  const timeline = inquiry.timeline || "Not sure";
  const budget = inquiry.budget || "Not sure yet";
  const subject = `New WebLab enquiry from ${inquiry.name}`;
  const bodyText = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${phone}`,
    `Project type: ${inquiry.projectType}`,
    `Main help needed: ${projectGoal}`,
    `Timeline: ${timeline}`,
    `Budget/payment: ${budget}`,
    "",
    inquiry.message,
  ].join("\n");
  const bodyHtml = emailShell({
    eyebrow: "WebLab Innovations Project Request",
    title: `New enquiry from ${inquiry.name}`,
    intro: "A new project request has been submitted. Reply directly to this email to contact the client.",
    content: `
      ${contactDetails({ inquiry, phone, projectGoal, timeline, budget })}
      ${messageBlock("Message", inquiry.message)}
    `,
  });
  const autoReply = contactAutoReplyContent({
    inquiry,
    phone,
    projectGoal,
    timeline,
    budget,
  });

  return sendEmailJsTemplate("EMAILJS_CONTACT_TEMPLATE_ID", {
    to_email: to,
    to_name: "WebLab",
    reply_to: inquiry.email,
    from_name: inquiry.name,
    from_email: inquiry.email,
    name: inquiry.name,
    email: inquiry.email,
    phone,
    project_type: inquiry.projectType,
    projectType: inquiry.projectType,
    project_goal: projectGoal,
    projectGoal,
    timeline,
    budget,
    message: inquiry.message,
    message_html: textToHtml(inquiry.message),
    subject,
    body: bodyText,
    body_text: bodyText,
    body_html: bodyHtml,
    auto_reply_subject: autoReply.subject,
    auto_reply_text: autoReply.text,
    auto_reply_html: autoReply.html,
    submitted_at: new Date().toISOString(),
  });
}

export async function sendReviewModerationEmail({ review, approveUrl }) {
  if (!canSendReviewModerationEmail()) {
    return false;
  }

  const to = process.env.REVIEW_TO || process.env.CONTACT_TO;

  if (!to) {
    return false;
  }

  const role = review.role || "Not provided";
  const rating = String(review.rating);
  const subject = `Review approval needed from ${review.name}`;
  const bodyText = [
    `New portfolio review from ${review.name}`,
    `Email: ${review.email}`,
    `Role/business: ${role}`,
    `Rating: ${rating}/5`,
    "",
    review.quote,
    "",
    `Approve and publish: ${approveUrl}`,
  ].join("\n");

  return sendEmailJsTemplate("EMAILJS_REVIEW_TEMPLATE_ID", {
    to_email: to,
    to_name: "WebLab",
    reply_to: review.email,
    from_name: review.name,
    from_email: review.email,
    name: review.name,
    email: review.email,
    role,
    rating,
    quote: review.quote,
    quote_html: textToHtml(review.quote),
    review_name: review.name,
    review_email: review.email,
    review_role: role,
    review_rating: rating,
    review_quote: review.quote,
    approve_url: approveUrl,
    approval_url: approveUrl,
    subject,
    body: bodyText,
    body_text: bodyText,
    body_html: textToHtml(bodyText),
    submitted_at: new Date().toISOString(),
  });
}
