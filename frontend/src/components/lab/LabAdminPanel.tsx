"use client";

import { useRef, useState } from "react";
import { Lock, RefreshCw, Trash2, Upload, X } from "lucide-react";
import "./LabAdminPanel.css";

interface LabDocument {
  id: number;
  title: string;
  sourceType: "site_content" | "upload";
  uploadedBy: string | null;
  status: string;
  chunkCount: number;
  createdAt: string;
}

const STORAGE_KEY = "labAdminSession";

type Step = "closed" | "email" | "code" | "panel";

function readStoredSession(): { token: string; email: string } | null {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as { token: string; email: string };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export default function LabAdminPanel() {
  const [step, setStep] = useState<Step>("closed");
  const [email, setEmail] = useState(() => readStoredSession()?.email || "");
  const [code, setCode] = useState("");
  const [token, setToken] = useState<string | null>(() => readStoredSession()?.token || null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [documents, setDocuments] = useState<LabDocument[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadDocuments = async (authToken: string) => {
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/lab-chat/admin/documents", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.status === 401) {
        window.localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setStep("email");
        setError("Your session expired — please sign in again.");
        return;
      }

      const data = await response.json();
      setDocuments(Array.isArray(data.documents) ? data.documents : []);
      setStep("panel");
    } catch {
      setError("Could not load documents.");
    } finally {
      setBusy(false);
    }
  };

  const openPanel = () => {
    if (token) {
      loadDocuments(token);
    } else {
      setStep("email");
    }
  };

  const requestCode = async () => {
    setBusy(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/lab-chat/admin/login/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not send code.");
        return;
      }

      setMessage(data.message || "Code sent.");
      setStep("code");
    } catch {
      setError("Could not send code.");
    } finally {
      setBusy(false);
    }
  };

  const verifyCode = async () => {
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/lab-chat/admin/login/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();

      if (!response.ok || !data.token) {
        setError(data.message || "Invalid code.");
        return;
      }

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: data.token, email }));
      setToken(data.token);
      setCode("");
      await loadDocuments(data.token);
    } catch {
      setError("Could not verify code.");
    } finally {
      setBusy(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!token) return;
    setBusy(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/lab-chat/admin/documents", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Upload failed.");
        return;
      }

      await loadDocuments(token);
    } catch {
      setError("Upload failed.");
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const deleteDocument = async (id: number) => {
    if (!token) return;
    setBusy(true);

    try {
      await fetch(`/api/lab-chat/admin/documents/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await loadDocuments(token);
    } finally {
      setBusy(false);
    }
  };

  const reindexSiteContent = async () => {
    if (!token) return;
    setBusy(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/lab-chat/admin/reindex", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setMessage(`Reindexed ${data.seeded ?? 0} document(s), ${data.skipped ?? 0} unchanged.`);
      await loadDocuments(token);
    } catch {
      setError("Reindex failed.");
    } finally {
      setBusy(false);
    }
  };

  if (step === "closed") {
    return (
      <button type="button" className="lab-admin-toggle" onClick={openPanel}>
        <Lock size={12} />
        <span>Admin</span>
      </button>
    );
  }

  return (
    <div className="lab-admin-panel">
      <div className="lab-admin-panel-header">
        <span>Lab Knowledge Base Admin</span>
        <button type="button" onClick={() => setStep("closed")} aria-label="Close admin panel">
          <X size={16} />
        </button>
      </div>

      {error && <p className="lab-admin-error">{error}</p>}
      {message && <p className="lab-admin-message">{message}</p>}

      {step === "email" && (
        <div className="lab-admin-form">
          <label htmlFor="lab-admin-email">Admin email</label>
          <input
            id="lab-admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
          <button type="button" disabled={busy || !email} onClick={requestCode}>
            Send code
          </button>
        </div>
      )}

      {step === "code" && (
        <div className="lab-admin-form">
          <label htmlFor="lab-admin-code">6-digit code</label>
          <input
            id="lab-admin-code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="123456"
          />
          <button type="button" disabled={busy || code.length !== 6} onClick={verifyCode}>
            Verify
          </button>
        </div>
      )}

      {step === "panel" && (
        <div className="lab-admin-body">
          <div className="lab-admin-actions">
            <label className="lab-admin-upload">
              <Upload size={14} />
              <span>Upload .txt / .md / .pdf</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.pdf"
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) uploadFile(file);
                }}
              />
            </label>
            <button type="button" className="lab-admin-reindex" disabled={busy} onClick={reindexSiteContent}>
              <RefreshCw size={14} />
              <span>Reindex site content</span>
            </button>
          </div>

          <ul className="lab-admin-doc-list">
            {documents.map((doc) => (
              <li key={doc.id}>
                <div>
                  <strong>{doc.title}</strong>
                  <span>
                    {doc.sourceType === "site_content" ? "Site content" : "Uploaded"} · {doc.chunkCount} chunks · {doc.status}
                  </span>
                </div>
                <button type="button" onClick={() => deleteDocument(doc.id)} aria-label={`Delete ${doc.title}`}>
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
            {documents.length === 0 && <li className="lab-admin-empty">No documents indexed yet.</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
