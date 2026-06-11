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

function missingEmailJsEnv(templateEnvName, recipientEnvNames) {
  const missing = [];
  const hasRecipient = recipientEnvNames.some((name) => Boolean(process.env[name]));

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
    body_html: textToHtml(bodyText),
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
