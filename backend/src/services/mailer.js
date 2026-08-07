const RESEND_SEND_URL =
  process.env.RESEND_SEND_URL || "https://api.resend.com/emails";
const RESEND_MIN_SEND_GAP_MS = 500;

let resendQueue = Promise.resolve();
let lastResendSendAt = 0;

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.includes("your_resend_api_key_here")) {
    return null;
  }
  return {
    apiKey,
    fromEmail: process.env.RESEND_FROM_EMAIL || "info@theaigleonlabs.dev",
  };
}

function missingResendEnv(recipientEnvNames = []) {
  const missing = [];
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.includes("your_resend_api_key_here")) {
    missing.push("RESEND_API_KEY");
  }

  const hasRecipient =
    recipientEnvNames.length === 0 ||
    recipientEnvNames.some((name) => Boolean(process.env[name]));

  if (!hasRecipient) {
    missing.push(recipientEnvNames.join(" or "));
  }

  return missing;
}

function notificationStatus(recipientEnvNames) {
  const missing = missingResendEnv(recipientEnvNames);
  return {
    ready: missing.length === 0,
    missing,
  };
}

export function contactNotificationStatus() {
  return notificationStatus(["CONTACT_TO"]);
}

export function auditNotificationStatus() {
  return notificationStatus(["CONTACT_TO"]);
}

export function subscriptionNotificationStatus() {
  return notificationStatus(["CONTACT_TO"]);
}

export function reviewModerationEmailStatus() {
  return notificationStatus(["REVIEW_TO", "CONTACT_TO"]);
}

export function emailNotificationStatus() {
  return {
    contact: contactNotificationStatus(),
    audit: auditNotificationStatus(),
    subscription: subscriptionNotificationStatus(),
    review: reviewModerationEmailStatus(),
  };
}

export function canSendContactNotification() {
  return contactNotificationStatus().ready;
}

export function canSendAuditNotification() {
  return auditNotificationStatus().ready;
}

export function canSendSubscriptionNotification() {
  return subscriptionNotificationStatus().ready;
}

export function canSendReviewModerationEmail() {
  return reviewModerationEmailStatus().ready;
}

function enqueueResendSend(task) {
  const queuedTask = resendQueue.then(async () => {
    const elapsedSinceLastSend = Date.now() - lastResendSendAt;
    const waitMs = Math.max(0, RESEND_MIN_SEND_GAP_MS - elapsedSinceLastSend);

    if (waitMs > 0) {
      await delay(waitMs);
    }

    try {
      return await task();
    } finally {
      lastResendSendAt = Date.now();
    }
  });

  resendQueue = queuedTask.catch(() => {});
  return queuedTask;
}

async function resendErrorMessage(response) {
  const fallback = response.statusText || "Resend API request failed.";
  const text = await response.text().catch(() => "");

  if (!text) return fallback;

  try {
    const data = JSON.parse(text);
    return data.message || data.error || text;
  } catch {
    return text;
  }
}

async function sendResendEmail({ from, to, subject, html, text, replyTo }) {
  const config = getResendConfig();

  if (!config) {
    return false;
  }

  return enqueueResendSend(async () => {
    const timeout = envNumber("MAIL_TIMEOUT_MS", 25000);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const payload = {
        from: from || config.fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text,
      };

      if (replyTo) {
        payload.reply_to = replyTo;
      }

      console.log(`[Resend API] Sending email to "${payload.to.join(", ")}" from "${payload.from}"...`);

      const response = await fetch(RESEND_SEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        const message = await resendErrorMessage(response);
        console.error(`[Resend API Error ${response.status}]:`, message);
        throw new Error(`Resend send failed (${response.status}): ${message}`);
      }

      const responseData = await response.json().catch(() => ({}));
      console.log(`[Resend API Success]: Email sent successfully. ID: ${responseData.id || "ok"}`);
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.error(`[Resend API Error]: Timed out after ${timeout}ms.`);
        throw new Error(`Resend send timed out after ${timeout}ms.`);
      }
      console.error(`[Resend API Exception]:`, error.message || error);
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

// -------------------------------------------------------------
// 1. CONTACT API NOTIFICATIONS (/api/contact)
// -------------------------------------------------------------

function contactAutoReplyContent({ inquiry, phone, projectGoal, timeline, budget }) {
  const subject = `We received your project request: AigleOn Labs`;
  const text = [
    `Hi ${inquiry.name},`,
    "",
    "Thanks for sharing your project details with AigleOn Labs.",
    "We have received your request, and our engineering and strategy team is reviewing your specifications.",
    "",
    "Your specific project details allow our senior architects to map out a custom technical roadmap prior to our initial discussion.",
    "",
    `Client Name: ${inquiry.name}`,
    `Work Email: ${inquiry.email}`,
    `Phone: ${phone}`,
    `Project Type: ${inquiry.projectType}`,
    `Main Help Needed: ${projectGoal}`,
    `Target Timeline: ${timeline}`,
    `Estimated Budget: ${budget}`,
    "",
    "Requirements and Notes:",
    inquiry.message,
    "",
    "We usually reply within 24 hours.",
    "",
    "Regards,",
    "AigleOn Labs Strategy and Engineering Team",
  ].join("\n");

  const html = `
    <div style="margin:0;padding:0;font-family:Arial,sans-serif;color:#ffffff;">
      <div style="max-width:620px;margin:0 auto;padding:24px 16px;">
        <div style="background:#0b0d0f;border:1px solid rgba(54,184,255,0.4);border-radius:0px;overflow:hidden;box-shadow:0 0 40px rgba(54,184,255,0.15);">
          <div style="background:linear-gradient(135deg, #052945 0%, #0b0d0f 100%);padding:28px 32px;border-bottom:1px solid rgba(54,184,255,0.2);">
            <p style="margin:0 0 6px;color:#36b8ff;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
              AigleOn Labs | Project Request Confirmation
            </p>
            <h2 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;">
              We received your project request
            </h2>
          </div>
          <div style="padding:32px;">
            <p style="margin:0 0 18px;color:#e5e7eb;font-size:15px;line-height:1.7;">
              Hi <strong style="color:#ffffff;">${escapeHtml(inquiry.name)}</strong>,
            </p>
            <p style="margin:0 0 24px;color:#9ca3aa;font-size:15px;line-height:1.7;">
              Thank you for sharing your project details with AigleOn Labs. We have received your request, and our engineering and strategy team is reviewing your specifications.
            </p>
            <div style="background:rgba(54,184,255,0.06);border:1px solid rgba(54,184,255,0.25);border-radius:0px;padding:20px;margin-bottom:28px;">
              <p style="margin:0;color:#36b8ff;font-size:14px;line-height:1.6;font-weight:500;">
                <strong>Custom Strategy Prepared:</strong> Your specific project details allow our senior architects to map out a custom technical roadmap prior to our initial discussion.
              </p>
            </div>
            <p style="margin:0 0 12px;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">
              Your Submitted Inquiry Details:
            </p>
            <div style="background:#11151a;border:1px solid #20252b;border-radius:0px;padding:20px;margin-bottom:28px;">
              <table style="width:100%;border-collapse:collapse;font-size:14px;color:#e5e7eb;">
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;width:140px;font-weight:600;">Client Name:</td>
                  <td style="padding:8px 0;color:#ffffff;font-weight:600;">${escapeHtml(inquiry.name)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;">Work Email:</td>
                  <td style="padding:8px 0;color:#36b8ff;font-weight:600;">${escapeHtml(inquiry.email)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;">Phone Number:</td>
                  <td style="padding:8px 0;color:#ffffff;">${escapeHtml(phone)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;">Project Type:</td>
                  <td style="padding:8px 0;color:#ffffff;font-weight:600;">${escapeHtml(inquiry.projectType)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;">Help Needed:</td>
                  <td style="padding:8px 0;color:#ffffff;">${escapeHtml(projectGoal)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;">Target Timeline:</td>
                  <td style="padding:8px 0;color:#ffffff;">${escapeHtml(timeline)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;">Estimated Budget:</td>
                  <td style="padding:8px 0;color:#ffffff;">${escapeHtml(budget)}</td>
                </tr>
              </table>
            </div>
            <p style="margin:0 0 10px;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">
              Submitted Project Message and Requirements:
            </p>
            <div style="background:#11151a;border:1px solid #20252b;border-radius:0px;padding:20px;margin-bottom:28px;color:#e5e7eb;font-size:14px;line-height:1.7;white-space:pre-line;">
              ${textToHtml(inquiry.message)}
            </div>
            <p style="margin:0 0 24px;color:#9ca3aa;font-size:14px;line-height:1.6;">
              Our team will review your specifications and contact you at <strong style="color:#ffffff;">${escapeHtml(inquiry.email)}</strong> within 24 hours with your initial technical proposal and timeline.
            </p>
            <div style="border-top:1px solid #20252b;padding-top:20px;margin-top:28px;color:#626a72;font-size:13px;line-height:1.6;">
              Regards,<br>
              <strong style="color:#ffffff;">AigleOn Labs Strategy and Engineering Team</strong><br>
              <a href="https://theaigleonlabs.dev" style="color:#36b8ff;text-decoration:none;">theaigleonlabs.dev</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return { subject, text, html };
}

export async function sendContactNotification(inquiry) {
  if (!canSendContactNotification()) {
    return false;
  }

  const adminEmail = process.env.CONTACT_TO;
  const clientEmail = inquiry.email;
  if (!clientEmail) return false;

  const projectGoal = inquiry.projectGoal || "Not sure";
  const phone = inquiry.phone || "Not provided";
  const timeline = inquiry.timeline || "Not sure";
  const budget = inquiry.budget || "Not sure yet";

  const autoReply = contactAutoReplyContent({
    inquiry,
    phone,
    projectGoal,
    timeline,
    budget,
  });

  const fromAddress = process.env.RESEND_FROM_EMAIL || "info@theaigleonlabs.dev";

  // 1. Send Primary Email directly to Client
  const clientSent = await sendResendEmail({
    to: clientEmail,
    from: fromAddress,
    subject: autoReply.subject,
    html: autoReply.html,
    text: autoReply.text,
    replyTo: adminEmail || fromAddress,
  });

  // 2. Send Admin Copy in parallel
  if (adminEmail && adminEmail !== clientEmail) {
    sendResendEmail({
      to: adminEmail,
      from: fromAddress,
      subject: `New AigleOn Labs enquiry from ${inquiry.name}`,
      html: autoReply.html,
      text: autoReply.text,
      replyTo: clientEmail,
    }).catch((err) => console.warn("Admin contact email notification warning:", err.message));
  }

  return clientSent;
}

// -------------------------------------------------------------
// 2. AUDIT API NOTIFICATIONS (/api/audit)
// -------------------------------------------------------------

export async function sendAuditNotification(audit) {
  if (!canSendAuditNotification()) {
    return false;
  }

  const adminEmail = process.env.CONTACT_TO;
  const clientEmail = audit.email;
  if (!clientEmail) return false;

  const phone = audit.phone || "Not provided";
  const problemsList = Array.isArray(audit.problems)
    ? audit.problems.join(", ")
    : audit.problems || "General Business Growth Audit";

  const problemsArray = Array.isArray(audit.problems)
    ? audit.problems
    : [problemsList];

  const problemsListHtml = problemsArray
    .map((p) => `<div style="margin-bottom:4px;">- ${escapeHtml(p)}</div>`)
    .join("");

  const subject = "Thanks for your request, it reached us.";

  const bodyText = [
    `Hi ${audit.name},`,
    "",
    "Thanks for your request, it reached us.",
    "Thank you for booking a free digital growth audit with AigleOn Labs. We have received your request, and our strategy team has logged all your specific inputs.",
    "",
    "Your specific details allow our senior growth architects to map out a precise strategy prior to our initial consultation.",
    "",
    `Name: ${audit.name}`,
    `Email: ${audit.email}`,
    `Phone: ${phone}`,
    `Selected Challenges: ${problemsList}`,
    audit.otherProblem ? `Custom Note: ${audit.otherProblem}` : "",
    "",
    "We will contact you within 24 hours.",
    "Regards,",
    "AigleOn Labs Strategy Team",
  ].filter(Boolean).join("\n");

  const bodyHtml = `
    <div style="margin:0;padding:0;font-family:Arial,sans-serif;color:#ffffff;">
      <div style="max-width:620px;margin:0 auto;padding:24px 16px;">
        <div style="background:#0b0d0f;border:1px solid rgba(54,184,255,0.4);border-radius:0px;overflow:hidden;box-shadow:0 0 40px rgba(54,184,255,0.15);">
          <!-- Header Bar -->
          <div style="background:linear-gradient(135deg, #052945 0%, #0b0d0f 100%);padding:28px 32px;border-bottom:1px solid rgba(54,184,255,0.2);">
            <p style="margin:0 0 6px;color:#36b8ff;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
              AigleOn Labs | Free Growth Audit
            </p>
            <h2 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;">
              Thanks for your request, it reached us.
            </h2>
          </div>

          <!-- Main Body Content -->
          <div style="padding:32px;">
            <p style="margin:0 0 18px;color:#e5e7eb;font-size:15px;line-height:1.7;">
              Hi <strong style="color:#ffffff;">${escapeHtml(audit.name)}</strong>,
            </p>
            
            <p style="margin:0 0 24px;color:#9ca3aa;font-size:15px;line-height:1.7;">
              Thank you for booking a free digital growth audit with AigleOn Labs. We have received your request, and our strategy team has logged all your specific inputs.
            </p>

            <!-- Feature Highlight Box -->
            <div style="background:rgba(54,184,255,0.06);border:1px solid rgba(54,184,255,0.25);border-radius:0px;padding:20px;margin-bottom:28px;">
              <p style="margin:0;color:#36b8ff;font-size:14px;line-height:1.6;font-weight:500;">
                <strong>Why your details matter:</strong> Your specific details allow our senior growth architects to map out a precise, custom strategy prior to our initial consultation.
              </p>
            </div>

            <!-- Submitted Information Breakdown -->
            <p style="margin:0 0 12px;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">
              Summary of Your Submitted Audit Request:
            </p>
            
            <div style="background:#11151a;border:1px solid #20252b;border-radius:0px;padding:20px;margin-bottom:28px;">
              <table style="width:100%;border-collapse:collapse;font-size:14px;color:#e5e7eb;">
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;width:140px;font-weight:600;">Name:</td>
                  <td style="padding:8px 0;color:#ffffff;font-weight:600;">${escapeHtml(audit.name)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;">Work Email:</td>
                  <td style="padding:8px 0;color:#36b8ff;font-weight:600;">${escapeHtml(audit.email)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;">Phone Number:</td>
                  <td style="padding:8px 0;color:#ffffff;">${escapeHtml(phone)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;vertical-align:top;">Target Bottlenecks:</td>
                  <td style="padding:8px 0;color:#ffffff;line-height:1.6;">
                    ${problemsListHtml}
                  </td>
                </tr>
                ${
                  audit.otherProblem
                    ? `
                <tr>
                  <td style="padding:8px 0;color:#9ca3aa;font-weight:600;vertical-align:top;">Custom Note:</td>
                  <td style="padding:8px 0;color:#ffffff;font-style:italic;">"${escapeHtml(audit.otherProblem)}"</td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>

            <p style="margin:0 0 24px;color:#9ca3aa;font-size:14px;line-height:1.6;">
              Our lead architects will complete the preliminary review of your business challenges and contact you at <strong style="color:#ffffff;">${escapeHtml(audit.email)}</strong> within 24 hours with your customized audit breakdown.
            </p>

            <!-- Signature Footer -->
            <div style="border-top:1px solid #20252b;padding-top:20px;margin-top:28px;color:#626a72;font-size:13px;line-height:1.6;">
              Regards,<br>
              <strong style="color:#ffffff;">AigleOn Labs Strategy and Engineering Team</strong><br>
              <a href="https://theaigleonlabs.dev" style="color:#36b8ff;text-decoration:none;">theaigleonlabs.dev</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const fromAddress = process.env.RESEND_FROM_EMAIL || "info@theaigleonlabs.dev";

  // 1. Send Primary Auto-Reply Email directly to Client
  const clientSent = await sendResendEmail({
    to: clientEmail,
    from: fromAddress,
    subject: subject,
    html: bodyHtml,
    text: bodyText,
    replyTo: adminEmail || fromAddress,
  });

  // 2. Send Admin Notification Copy in parallel
  if (adminEmail && adminEmail !== clientEmail) {
    sendResendEmail({
      to: adminEmail,
      from: fromAddress,
      subject: `New Free Audit Request from ${audit.name}`,
      html: bodyHtml,
      text: bodyText,
      replyTo: clientEmail,
    }).catch((err) => console.warn("Admin audit email notification warning:", err.message));
  }

  return clientSent;
}

// -------------------------------------------------------------
// 3. SUBSCRIPTION API NOTIFICATIONS (/api/subscribe)
// -------------------------------------------------------------

export async function sendSubscriptionNotification(subscriberEmail) {
  if (!canSendSubscriptionNotification()) {
    return false;
  }

  const adminEmail = process.env.CONTACT_TO;
  const fromAddress = process.env.RESEND_FROM_EMAIL || "info@theaigleonlabs.dev";

  const subject = `Subscription Confirmed: AigleOn Labs Research Insights`;
  const bodyText = [
    "Subscription Confirmed",
    "",
    "Thank you for subscribing to AigleOn Labs Research Insights.",
    "Your email has been registered to receive our technical publications, system architecture breakdowns, and industry reports.",
    "",
    `Registered Email: ${subscriberEmail}`,
    "",
    "Regards,",
    "AigleOn Labs Engineering Team",
  ].join("\n");

  const bodyHtml = `
    <div style="margin:0;padding:0;font-family:Arial,sans-serif;color:#ffffff;">
      <div style="max-width:620px;margin:0 auto;padding:24px 16px;">
        <div style="background:#0b0d0f;border:1px solid rgba(54,184,255,0.4);border-radius:0px;overflow:hidden;box-shadow:0 0 40px rgba(54,184,255,0.15);">
          <div style="background:linear-gradient(135deg, #052945 0%, #0b0d0f 100%);padding:28px 32px;border-bottom:1px solid rgba(54,184,255,0.2);">
            <p style="margin:0 0 6px;color:#36b8ff;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
              AigleOn Labs | Research Insights
            </p>
            <h2 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;">
              Subscription Confirmed
            </h2>
          </div>
          <div style="padding:32px;">
            <p style="margin:0 0 18px;color:#e5e7eb;font-size:15px;line-height:1.7;">
              Thank you for subscribing to <strong style="color:#ffffff;">AigleOn Labs Research Insights</strong>.
            </p>
            <p style="margin:0 0 24px;color:#9ca3aa;font-size:15px;line-height:1.7;">
              Your email address <strong style="color:#36b8ff;">${escapeHtml(subscriberEmail)}</strong> has been registered to receive our upcoming technical publications, engineering architecture breakdowns, and industry research reports.
            </p>
            <div style="background:#11151a;border:1px solid #20252b;border-radius:0px;padding:20px;margin-bottom:28px;">
              <p style="margin:0;color:#e5e7eb;font-size:14px;line-height:1.6;">
                You will receive our research updates directly in your inbox.
              </p>
            </div>
            <div style="border-top:1px solid #20252b;padding-top:20px;margin-top:28px;color:#626a72;font-size:13px;line-height:1.6;">
              Regards,<br>
              <strong style="color:#ffffff;">AigleOn Labs Engineering Team</strong><br>
              <a href="https://theaigleonlabs.dev" style="color:#36b8ff;text-decoration:none;">theaigleonlabs.dev</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 1. Send Auto-Reply to Subscriber
  const subscriberSent = await sendResendEmail({
    to: subscriberEmail,
    from: fromAddress,
    subject: subject,
    html: bodyHtml,
    text: bodyText,
    replyTo: adminEmail || fromAddress,
  });

  // 2. Send Admin Notification in parallel
  if (adminEmail && adminEmail !== subscriberEmail) {
    sendResendEmail({
      to: adminEmail,
      from: fromAddress,
      subject: `New Research Subscriber: ${subscriberEmail}`,
      html: bodyHtml,
      text: bodyText,
      replyTo: subscriberEmail,
    }).catch((err) => console.warn("Admin subscriber notification warning:", err.message));
  }

  return subscriberSent;
}

// -------------------------------------------------------------
// 4. REVIEWS API NOTIFICATIONS (/api/reviews)
// -------------------------------------------------------------

export async function sendReviewNotification({ review, approveUrl }) {
  if (!canSendReviewModerationEmail()) {
    return false;
  }

  const adminEmail = process.env.REVIEW_TO || process.env.CONTACT_TO;
  const clientEmail = review.email;
  const fromAddress = process.env.RESEND_FROM_EMAIL || "info@theaigleonlabs.dev";

  const role = review.role || "Not provided";
  const rating = String(review.rating);

  // Auto-reply to Client
  const clientSubject = `Thank you for reviewing AigleOn Labs`;
  const clientText = [
    `Hi ${review.name},`,
    "",
    "Thank you for submitting your review for AigleOn Labs.",
    "We appreciate your feedback. Our team is reviewing your submission, and it will be published upon verification.",
    "",
    `Submitted Rating: ${rating} / 5`,
    `Submitted Review: "${review.quote}"`,
    "",
    "Regards,",
    "AigleOn Labs Team",
  ].join("\n");

  const clientHtml = `
    <div style="margin:0;padding:0;font-family:Arial,sans-serif;color:#ffffff;">
      <div style="max-width:620px;margin:0 auto;padding:24px 16px;">
        <div style="background:#0b0d0f;border:1px solid rgba(54,184,255,0.4);border-radius:0px;overflow:hidden;box-shadow:0 0 40px rgba(54,184,255,0.15);">
          <div style="background:linear-gradient(135deg, #052945 0%, #0b0d0f 100%);padding:28px 32px;border-bottom:1px solid rgba(54,184,255,0.2);">
            <p style="margin:0 0 6px;color:#36b8ff;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
              AigleOn Labs | Client Feedback
            </p>
            <h2 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;">
              Thank you for your review
            </h2>
          </div>
          <div style="padding:32px;">
            <p style="margin:0 0 18px;color:#e5e7eb;font-size:15px;line-height:1.7;">
              Hi <strong style="color:#ffffff;">${escapeHtml(review.name)}</strong>,
            </p>
            <p style="margin:0 0 24px;color:#9ca3aa;font-size:15px;line-height:1.7;">
              Thank you for submitting your testimonial for AigleOn Labs. We appreciate your feedback. Our moderation team is reviewing your submission, and it will be published upon verification.
            </p>
            <div style="background:#11151a;border:1px solid #20252b;border-radius:0px;padding:20px;margin-bottom:28px;color:#e5e7eb;font-size:14px;line-height:1.6;">
              <p style="margin:0 0 8px;"><strong>Rating:</strong> ${escapeHtml(rating)} / 5</p>
              <p style="margin:0;font-style:italic;">"${escapeHtml(review.quote)}"</p>
            </div>
            <div style="border-top:1px solid #20252b;padding-top:20px;margin-top:28px;color:#626a72;font-size:13px;line-height:1.6;">
              Regards,<br>
              <strong style="color:#ffffff;">AigleOn Labs Team</strong><br>
              <a href="https://theaigleonlabs.dev" style="color:#36b8ff;text-decoration:none;">theaigleonlabs.dev</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 1. Send Auto-Reply to Client
  const clientSent = await sendResendEmail({
    to: clientEmail,
    from: fromAddress,
    subject: clientSubject,
    html: clientHtml,
    text: clientText,
    replyTo: adminEmail || fromAddress,
  });

  // 2. Send Admin Moderation Email in parallel
  if (adminEmail) {
    const adminSubject = `Review approval required from ${review.name}`;
    const adminText = [
      `New portfolio review from ${review.name}`,
      `Email: ${review.email}`,
      `Role: ${role}`,
      `Rating: ${rating}/5`,
      "",
      review.quote,
      "",
      `Approve and publish: ${approveUrl}`,
    ].join("\n");

    const adminHtml = `
      <div style="margin:0;padding:0;font-family:Arial,sans-serif;color:#ffffff;">
        <div style="max-width:600px;margin:0 auto;padding:24px 16px;">
          <div style="background:#0b0d0f;border:1px solid rgba(54,184,255,0.4);border-radius:0px;padding:28px;">
            <h2 style="margin:0 0 16px;color:#ffffff;font-size:22px;">Review Approval Required</h2>
            <p style="margin:0 0 16px;color:#9ca3aa;font-size:14px;">
              A new client review was submitted by <strong style="color:#ffffff;">${escapeHtml(review.name)}</strong> (${escapeHtml(review.email)}).
            </p>
            <div style="background:#11151a;padding:18px;border:1px solid #20252b;border-radius:0px;margin-bottom:20px;color:#e5e7eb;font-size:14px;line-height:1.6;">
              <p style="margin:0 0 8px;"><strong>Role:</strong> ${escapeHtml(role)}</p>
              <p style="margin:0 0 8px;"><strong>Rating:</strong> ${escapeHtml(rating)} / 5</p>
              <p style="margin:0;font-style:italic;">"${escapeHtml(review.quote)}"</p>
            </div>
            <a href="${escapeHtml(approveUrl)}" style="display:inline-block;padding:12px 24px;background:#36b8ff;color:#020303;font-weight:700;border-radius:0px;text-decoration:none;">
              Approve and Publish Review
            </a>
          </div>
        </div>
      </div>
    `;

    sendResendEmail({
      to: adminEmail,
      from: fromAddress,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
      replyTo: clientEmail,
    }).catch((err) => console.warn("Admin review moderation email warning:", err.message));
  }

  return clientSent;
}

// Backward compatibility alias for review moderation
export const sendReviewModerationEmail = sendReviewNotification;
