import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { initDatabase } from "./db/init.js";
import contactRouter from "./routes/contact.js";

const app = express();
const port = Number(process.env.PORT || 10000);

function allowedOrigins() {
  return (process.env.FRONTEND_URL || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function validateProductionEnv() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const required = [
    "DATABASE_URL",
    "FRONTEND_URL",
    "OTP_SECRET",
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "MAIL_FROM",
    "CONTACT_TO",
  ];
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins().includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json({ limit: "80kb" }));

app.get("/health", (_request, response) => {
  response.json({ success: true, service: "weblab-backend" });
});

app.use("/api/contact", contactRouter);

app.use((_request, response) => {
  response.status(404).json({ success: false, message: "Route not found." });
});

app.use((error, _request, response, _next) => {
  const isCorsError = error.message === "Not allowed by CORS";
  console.error(error);

  response.status(isCorsError ? 403 : 500).json({
    success: false,
    message: isCorsError ? error.message : "Server error.",
  });
});

validateProductionEnv();
initDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`WebLab backend listening on port ${port}.`);
    });
  })
  .catch((error) => {
    console.error("Unable to start backend:", error);
    process.exit(1);
  });
