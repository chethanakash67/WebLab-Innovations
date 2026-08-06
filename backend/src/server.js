import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { initDatabase } from "./db/init.js";
import contactRouter from "./routes/contact.js";
import reviewsRouter from "./routes/reviews.js";
import libraryRouter from "./routes/library.js";
import { emailNotificationStatus } from "./services/mailer.js";

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
    "EMAILJS_SERVICE_ID",
    "EMAILJS_PUBLIC_KEY",
    "EMAILJS_PRIVATE_KEY",
    "EMAILJS_CONTACT_TEMPLATE_ID",
    "EMAILJS_REVIEW_TEMPLATE_ID",
    "CONTACT_TO",
  ];
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

function logEmailNotificationStatus() {
  const { contact, review } = emailNotificationStatus();

  if (contact.ready) {
    console.log("EmailJS contact notifications ready.");
  } else {
    console.warn(
      `EmailJS contact notifications disabled: missing ${contact.missing.join(", ")}.`,
    );
  }

  if (review.ready) {
    console.log("EmailJS review moderation emails ready.");
  } else {
    console.warn(
      `EmailJS review moderation emails disabled: missing ${review.missing.join(", ")}.`,
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
  response.json({ success: true, service: "aigleonlabs-backend" });
});

app.use("/api/contact", contactRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/library", libraryRouter);

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

const startServer = () => {
  app.listen(port, () => {
    console.log(`AigleOn Labs backend listening on port ${port}.`);
  });
};

if (process.env.NODE_ENV === "production") {
  initDatabase()
    .then(startServer)
    .catch((error) => {
      console.error("Unable to start backend:", error);
      process.exit(1);
    });
} else {
  initDatabase()
    .then(startServer)
    .catch((error) => {
      console.warn("Database initialization failed (running in development mode):", error.message);
      startServer();
    });
}
