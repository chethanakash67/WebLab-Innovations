import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { initDatabase } from "./db/init.js";
import contactRouter from "./routes/contact.js";
import auditRouter from "./routes/audit.js";
import reviewsRouter from "./routes/reviews.js";
import libraryRouter from "./routes/library.js";
import subscribeRouter from "./routes/subscribe.js";
import prebuiltAssetsRouter from "./routes/prebuiltAssets.js";
import productClaimsRouter from "./routes/productClaims.js";
import labChatRouter from "./routes/labChat.js";
import { emailNotificationStatus } from "./services/mailer.js";
import { seedLabContent } from "./services/labContentSeed.js";
import { loadChunkCacheFromDb, reembedIfProviderChanged } from "./services/labRag.js";

const app = express();
const port = Number(process.env.PORT || 10000);
const corsErrorMessage = "Not allowed by CORS";

function normalizeOrigin(origin) {
  if (!origin) {
    return "";
  }

  const trimmedOrigin = origin.trim();

  if (!trimmedOrigin) {
    return "";
  }

  try {
    return new URL(trimmedOrigin).origin;
  } catch {
    return trimmedOrigin.replace(/\/+$/, "");
  }
}

function allowedOrigins() {
  return (process.env.FRONTEND_URL || "http://localhost:3000")
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean);
}

function validateProductionEnv() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const required = [
    "DATABASE_URL",
    "FRONTEND_URL",
    "BACKEND_PUBLIC_URL",
    "REVIEW_SECRET",
    "RESEND_API_KEY",
    "CONTACT_TO",
  ];
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

function logEmailNotificationStatus() {
  const { contact, audit, review } = emailNotificationStatus();

  if (contact.ready) {
    console.log("Resend API contact notifications ready.");
  } else {
    console.warn(
      `Resend API contact notifications disabled: missing ${contact.missing.join(", ")}.`,
    );
  }

  if (audit.ready) {
    console.log("Resend API audit notifications ready.");
  } else {
    console.warn(
      `Resend API audit notifications disabled: missing ${audit.missing.join(", ")}.`,
    );
  }

  if (review.ready) {
    console.log("Resend API review moderation emails ready.");
  } else {
    console.warn(
      `Resend API review moderation emails disabled: missing ${review.missing.join(", ")}.`,
    );
  }
}

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins().includes(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }

      callback(new Error(corsErrorMessage));
    },
  }),
);
app.use(express.json({ limit: "80kb" }));

app.get("/health", (_request, response) => {
  response.json({ success: true, service: "weblab-backend" });
});

app.use("/api/contact", contactRouter);
app.use("/api/audit", auditRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/library", libraryRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/prebuilt-assets", prebuiltAssetsRouter);
app.use("/api/product-claims", productClaimsRouter);
app.use("/api/lab-chat", labChatRouter);

app.use((_request, response) => {
  response.status(404).json({ success: false, message: "Route not found." });
});

app.use((error, _request, response, _next) => {
  const isCorsError = error.message === corsErrorMessage;
  console.error(error);

  response.status(isCorsError ? 403 : 500).json({
    success: false,
    message: isCorsError ? error.message : "Server error.",
  });
});

validateProductionEnv();
logEmailNotificationStatus();

app.listen(port, () => {
  console.log(`WebLab backend listening on port ${port}.`);
});

initDatabase()
  .then(async () => {
    await seedLabContent().catch((error) => console.error("Lab content seed failed:", error));
    await reembedIfProviderChanged().catch((error) => console.error("Lab re-embedding failed:", error));
    await loadChunkCacheFromDb().catch((error) => console.error("Lab chunk cache load failed:", error));
  })
  .catch((error) => {
    console.error("Database startup tasks failed:", error);
  });
