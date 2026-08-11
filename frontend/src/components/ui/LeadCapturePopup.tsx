"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  TrendingDown,
  UserX,
  ShoppingCart,
  Clock,
  Edit3,
} from "lucide-react";

interface ProblemOption {
  id: string;
  label: string;
  sub: string;
  icon: React.ElementType;
}

const PROBLEM_OPTIONS: ProblemOption[] = [
  {
    id: "visiting_less",
    label: "Are customers visiting less?",
    sub: "Traffic & visitor engagement drop",
    icon: TrendingDown,
  },
  {
    id: "not_sticking",
    label: "Are current customers not sticking with your brand?",
    sub: "Low retention & customer loyalty",
    icon: UserX,
  },
  {
    id: "ecom_conversion",
    label: "Is your e-commerce store not converting leads?",
    sub: "High bounce rate & lost checkout leads",
    icon: ShoppingCart,
  },
  {
    id: "internal_ops",
    label: "Are internal operations eating up your time?",
    sub: "Manual repetitive workflows & inefficiency",
    icon: Clock,
  },
  {
    id: "others",
    label: "Others",
    sub: "Specify your custom business bottleneck",
    icon: Edit3,
  },
];

export default function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form States
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [otherProblemText, setOtherProblemText] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Check if dismissed or submitted in this session
    const isDismissed = sessionStorage.getItem("aigleon_lead_popup_dismissed");
    const isAlreadySubmitted = sessionStorage.getItem("aigleon_lead_popup_submitted");

    if (!isDismissed && !isAlreadySubmitted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 15000); // 15 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("aigleon_lead_popup_dismissed", "true");
  };

  const handleToggleProblem = (id: string) => {
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (selectedProblems.length === 0) {
      setErrorMessage("Please select at least one problem area or check 'Others'.");
      return;
    }

    if (selectedProblems.includes("others") && !otherProblemText.trim()) {
      setErrorMessage("Please specify your problem in the text field.");
      return;
    }

    setIsSubmitting(true);

    const problemLabelsArray = selectedProblems.map((id) => {
      if (id === "others") return `Others: ${otherProblemText.trim()}`;
      const found = PROBLEM_OPTIONS.find((p) => p.id === id);
      return found ? found.label : id;
    });

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          problems: problemLabelsArray,
          otherProblem: selectedProblems.includes("others") ? otherProblemText.trim() : "",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        sessionStorage.setItem("aigleon_lead_popup_submitted", "true");
      } else {
        setErrorMessage(data.message || "Failed to book audit. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          overflowY: "auto",
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(2, 3, 3, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        />

        {/* Single Page Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "540px",
            maxHeight: "90vh",
            overflowY: "auto",
            backgroundColor: "#0b0d0f",
            border: "1px solid rgba(54, 184, 255, 0.35)",
            borderRadius: "24px",
            padding: "28px",
            boxShadow: "0 0 60px rgba(54, 184, 255, 0.2)",
            color: "#ffffff",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            zIndex: 10,
          }}
        >
          {/* Cyber Accent Orbs */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "200px",
              height: "200px",
              backgroundColor: "rgba(8, 122, 216, 0.2)",
              borderRadius: "50%",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: "-80px",
              width: "200px",
              height: "200px",
              backgroundColor: "rgba(54, 184, 255, 0.15)",
              borderRadius: "50%",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />

          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "rgba(255, 255, 255, 0.7)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              zIndex: 20,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
            }}
          >
            <X size={18} />
          </button>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Header */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(8, 122, 216, 0.15)",
                    border: "1px solid rgba(54, 184, 255, 0.3)",
                    color: "#36b8ff",
                    fontSize: "11px",
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  <Sparkles size={12} />
                  <span>Free Business Audit</span>
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                    color: "#ffffff",
                    fontFamily: "var(--font-display), Syne, sans-serif",
                    margin: 0,
                  }}
                >
                  Get Your Free Digital Growth Audit
                </h3>
                <p style={{ fontSize: "13px", color: "#9ca3aa", marginTop: "4px", marginBottom: 0 }}>
                  Tell us who you are and select the challenges holding your business back.
                </p>
              </div>

              {errorMessage && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#f87171",
                    fontSize: "13px",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* Contact Info Fields (Grid for space optimization) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#d1d5db",
                        marginBottom: "4px",
                      }}
                    >
                      Name <span style={{ color: "#36b8ff" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Vance"
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "12px",
                        padding: "10px 12px",
                        fontSize: "13px",
                        color: "#ffffff",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#d1d5db",
                        marginBottom: "4px",
                      }}
                    >
                      Work Email <span style={{ color: "#36b8ff" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "12px",
                        padding: "10px 12px",
                        fontSize: "13px",
                        color: "#ffffff",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#d1d5db",
                      marginBottom: "4px",
                    }}
                  >
                    <span>Phone Number</span>
                    <span style={{ color: "#6b7280", fontWeight: 400 }}>(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "12px",
                      padding: "10px 12px",
                      fontSize: "13px",
                      color: "#ffffff",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Multi-select Problems Section */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#d1d5db",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>What problems do you have?</span>
                  <span style={{ color: "#36b8ff", fontSize: "11px", fontWeight: 400 }}>
                    Select all that apply
                  </span>
                </label>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {PROBLEM_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isChecked = selectedProblems.includes(opt.id);
                    return (
                      <div key={opt.id}>
                        <button
                          type="button"
                          onClick={() => handleToggleProblem(opt.id)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "10px 12px",
                            borderRadius: "12px",
                            border: isChecked
                              ? "1px solid #36b8ff"
                              : "1px solid rgba(255, 255, 255, 0.1)",
                            backgroundColor: isChecked
                              ? "rgba(54, 184, 255, 0.12)"
                              : "rgba(255, 255, 255, 0.02)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: isChecked ? "0 0 12px rgba(54, 184, 255, 0.15)" : "none",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div
                              style={{
                                padding: "6px",
                                borderRadius: "8px",
                                backgroundColor: isChecked ? "#36b8ff" : "rgba(255, 255, 255, 0.06)",
                                color: isChecked ? "#020303" : "#36b8ff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Icon size={14} />
                            </div>
                            <div>
                              <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#ffffff" }}>
                                {opt.label}
                              </div>
                            </div>
                          </div>

                          {/* Checkbox Pill */}
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "5px",
                              border: isChecked ? "1px solid #36b8ff" : "1px solid rgba(255, 255, 255, 0.3)",
                              backgroundColor: isChecked ? "#36b8ff" : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {isChecked && (
                              <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                                <path
                                  d="M1 5L4.5 8.5L11 1.5"
                                  stroke="#020303"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </button>

                        {/* Others input */}
                        {opt.id === "others" && isChecked && (
                          <div style={{ marginTop: "6px" }}>
                            <input
                              type="text"
                              value={otherProblemText}
                              onChange={(e) => setOtherProblemText(e.target.value)}
                              placeholder="Describe your specific challenge..."
                              style={{
                                width: "100%",
                                backgroundColor: "rgba(255, 255, 255, 0.04)",
                                border: "1px solid rgba(54, 184, 255, 0.4)",
                                borderRadius: "10px",
                                padding: "9px 12px",
                                fontSize: "12.5px",
                                color: "#ffffff",
                                outline: "none",
                                boxSizing: "border-box",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ORIGINAL "BOOK A FREE AUDIT" WHITE BUTTON LAYOUT */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: "14px",
                  backgroundColor: "#ffffff",
                  color: "#020303",
                  fontWeight: 650,
                  fontSize: "14px",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
                  transition: "all 0.2s ease",
                  marginTop: "4px",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 6px 25px rgba(255, 255, 255, 0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(255, 255, 255, 0.2)";
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Booking Audit...</span>
                  </>
                ) : (
                  <>
                    <span>Book a free audit</span>
                    <ArrowUpRight size={18} strokeWidth={2.2} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* SUCCESS CONFIRMATION */
            <div style={{ padding: "24px 0", textAlign: "center", display: "flex", flexDirection: "column", gap: "18px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(54, 184, 255, 0.12)",
                  border: "1px solid rgba(54, 184, 255, 0.35)",
                  color: "#36b8ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  boxShadow: "0 0 35px rgba(54, 184, 255, 0.25)",
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    fontFamily: "var(--font-display), Syne, sans-serif",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Audit Request Booked!
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#d1d5db",
                    marginTop: "8px",
                    marginBottom: 0,
                    lineHeight: "1.6",
                    maxWidth: "380px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Thank you <span style={{ color: "#36b8ff", fontWeight: 600 }}>{name}</span>! Our lead strategist is reviewing your selected challenges and will reach out to <span style={{ color: "#ffffff", fontWeight: 500 }}>{email}</span> with your free audit report.
                </p>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: "#36b8ff",
                    marginTop: "10px",
                    marginBottom: 0,
                    fontWeight: 500,
                  }}
                >
                  You’ll get a confirmation mail, check the spam folder also.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  fontWeight: 500,
                  fontSize: "13px",
                  cursor: "pointer",
                  margin: "0 auto",
                }}
              >
                Return to Website
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
