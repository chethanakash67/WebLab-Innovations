"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  Clock3,
  LoaderCircle,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const budgetOptions = ["< ₹25K", "₹25K - ₹50K", "₹50K - ₹1L", "₹1L+"];
const projectTypes = ["Website", "SaaS product", "AI solution", "Brand + UI"];
const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:10000"
).replace(/\/$/, "");

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  otp: string;
};

type FormStatus = "idle" | "sending-otp" | "otp-sent" | "submitting" | "submitted" | "error";

async function postToApi(path: string, payload: unknown) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedBudget, setSelectedBudget] = useState("₹50K - ₹1L");
  const [selectedType, setSelectedType] = useState("Website");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [otpRequested, setOtpRequested] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    otp: "",
  });

  const isSendingOtp = formStatus === "sending-otp";
  const isSubmitting = formStatus === "submitting";
  const submitted = formStatus === "submitted";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 52,
        opacity: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".contact-panel", {
        y: 80,
        opacity: 0,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    const nextValue =
      field === "otp" ? value.replace(/\D/g, "").slice(0, 6) : value;

    setFormData((current) => ({
      ...current,
      [field]: nextValue,
      ...(field === "email" ? { otp: "" } : {}),
    }));

    if (field === "email") {
      setOtpRequested(false);
    }

    if (formStatus !== "idle") {
      setFormStatus("idle");
      setStatusMessage("");
    }
  };

  const handleRequestOtp = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormStatus("error");
      setStatusMessage("Add your name and email before requesting OTP.");
      return;
    }

    setFormStatus("sending-otp");
    setStatusMessage("");

    try {
      await postToApi("/api/contact/request-otp", {
        name: formData.name,
        email: formData.email,
      });
      setOtpRequested(true);
      setFormStatus("otp-sent");
      setStatusMessage("OTP sent to your email.");
    } catch (error) {
      setFormStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to send OTP.",
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!otpRequested) {
      setFormStatus("error");
      setStatusMessage("Request an email OTP before sending the enquiry.");
      return;
    }

    if (!formData.otp.trim()) {
      setFormStatus("error");
      setStatusMessage("Enter the OTP sent to your email.");
      return;
    }

    setFormStatus("submitting");
    setStatusMessage("");

    try {
      await postToApi("/api/contact", {
        ...formData,
        projectType: selectedType,
        budget: selectedBudget,
      });
      setFormStatus("submitted");
      setStatusMessage("Enquiry sent. We'll reply within 24 hours.");
    } catch (error) {
      setFormStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to send enquiry.",
      );
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="contact-orbit contact-orbit-one" />
      <div className="contact-orbit contact-orbit-two" />

      <div className="contact-wrap">
        <header className="contact-header">
          <div className="contact-reveal">
            <SectionBadge label="Get In Touch" number="12" />
          </div>
          <p className="contact-reveal">
            [ A focused product team for
            <br />
            ambitious digital ideas ]
          </p>
        </header>

        <div className="contact-heading contact-reveal">
          <h2>
            Have a project
            <br />
            <span>worth building?</span>
          </h2>
          <AgencyMark className="contact-heading-mark" />
        </div>

        <div className="contact-layout">
          <aside className="contact-sidebar">
            <div className="contact-reveal contact-intro">
              <span className="signal-dot" />
              <p>
                Tell us where you want to go. We&apos;ll reply with clear next
                steps, honest scope, and no sales theatre.
              </p>
            </div>

            <a
              href="mailto:hello@weblab.agency"
              className="contact-reveal contact-info-card"
            >
              <span className="contact-info-icon">
                <Mail className="h-4 w-4" />
              </span>
              <span>
                <small>Email us directly</small>
                <strong>hello@weblab.agency</strong>
              </span>
              <ArrowUpRight className="ml-auto h-4 w-4" />
            </a>

            <a
              href="tel:+918919870959"
              className="contact-reveal contact-info-card"
            >
              <span className="contact-info-icon">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <small>Call or WhatsApp</small>
                <strong>8919870959</strong>
              </span>
              <ArrowUpRight className="ml-auto h-4 w-4" />
            </a>

            <div className="contact-reveal contact-info-card">
              <span className="contact-info-icon">
                <Clock3 className="h-4 w-4" />
              </span>
              <span>
                <small>Typical response</small>
                <strong>Within 24 hours</strong>
              </span>
            </div>

            <div className="contact-reveal contact-mini-note">
              <Sparkles className="h-4 w-4 text-primary-light" />
              <p>
                Currently booking a limited number of projects for the next
                quarter.
              </p>
            </div>
          </aside>

          <div className="contact-panel">
            <div className="contact-panel-top">
              <div>
                <span>Project enquiry</span>
                <strong>Tell us the essentials.</strong>
              </div>
              <span className="contact-panel-status">
                <span className="signal-dot" />
                Inbox open
              </span>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-field-grid">
                <label className="contact-field">
                  <span>01 / Your name</span>
                  <input
                    type="text"
                    placeholder="How should we call you?"
                    required
                    value={formData.name}
                    onChange={(event) =>
                      updateFormData("name", event.target.value)
                    }
                  />
                </label>

                <label className="contact-field">
                  <span>02 / Work email</span>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={formData.email}
                    onChange={(event) =>
                      updateFormData("email", event.target.value)
                    }
                  />
                </label>
              </div>

              <label className="contact-field">
                <span>03 / Phone or WhatsApp</span>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={formData.phone}
                  onChange={(event) =>
                    updateFormData("phone", event.target.value)
                  }
                />
              </label>

              <fieldset className="contact-choice-group">
                <legend>04 / What are we building?</legend>
                <div className="contact-choices">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={selectedType === type ? "is-selected" : ""}
                    >
                      {selectedType === type && <Check className="h-3 w-3" />}
                      {type}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="contact-field contact-message">
                <span>05 / Project brief</span>
                <textarea
                  placeholder="The idea, the problem, and what a successful launch looks like..."
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(event) =>
                    updateFormData("message", event.target.value)
                  }
                />
              </label>

              <fieldset className="contact-choice-group">
                <legend>06 / Comfortable investment</legend>
                <div className="contact-choices">
                  {budgetOptions.map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setSelectedBudget(budget)}
                      className={selectedBudget === budget ? "is-selected" : ""}
                    >
                      {selectedBudget === budget && <Check className="h-3 w-3" />}
                      {budget}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="contact-otp-row">
                <label className="contact-field">
                  <span>07 / Email OTP</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    placeholder="6 digit code"
                    required
                    value={formData.otp}
                    onChange={(event) =>
                      updateFormData("otp", event.target.value)
                    }
                  />
                </label>

                <button
                  type="button"
                  className="contact-secondary-button"
                  onClick={handleRequestOtp}
                  disabled={isSendingOtp || isSubmitting}
                >
                  {isSendingOtp ? (
                    <>
                      Sending
                      <LoaderCircle className="contact-spin h-4 w-4" />
                    </>
                  ) : otpRequested ? (
                    "Resend OTP"
                  ) : (
                    "Get OTP"
                  )}
                </button>
              </div>

              {statusMessage && (
                <p
                  className={`contact-form-alert ${
                    formStatus === "error" ? "is-error" : "is-success"
                  }`}
                >
                  {statusMessage}
                </p>
              )}

              <div className="contact-submit-row">
                <p>
                  OTP confirms your inbox before we save this enquiry and reply
                  about your project.
                </p>
                <button
                  type="submit"
                  className={submitted ? "is-submitted" : ""}
                  disabled={isSendingOtp || isSubmitting || submitted}
                >
                  {isSubmitting ? (
                    <>
                      Sending
                      <LoaderCircle className="contact-spin h-4 w-4" />
                    </>
                  ) : submitted ? (
                    <>
                      Enquiry sent
                      <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
