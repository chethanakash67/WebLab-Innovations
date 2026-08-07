"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  LoaderCircle,
} from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const budgetOptions = ["Not sure yet", "< ₹25K", "₹25K - ₹50K", "₹50K - ₹1L", "₹1L+"];
const projectTypes = ["Website", "SaaS product", "AI solution", "Brand + UI"];
const goalOptions = [
  "New website",
  "Improve old website",
  "App or dashboard",
  "Automation or AI",
  "Not sure",
];
const timelineOptions = ["This week", "This month", "In 2-3 months", "Not sure"];

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormStatus = "idle" | "submitting" | "submitted" | "error";

async function postToApi(path: string, payload: unknown) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("The request is taking too long. Please try again.");
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedBudget, setSelectedBudget] = useState("Not sure yet");
  const [selectedType, setSelectedType] = useState("Website");
  const [selectedGoal, setSelectedGoal] = useState("New website");
  const [selectedTimeline, setSelectedTimeline] = useState("Not sure");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const isSubmitting = formStatus === "submitting";
  const submitted = formStatus === "submitted";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 52,
        
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
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (formStatus !== "idle") {
      setFormStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setFormStatus("submitting");
    setStatusMessage("");

    try {
      await postToApi("/api/contact", {
        ...formData,
        projectType: selectedType,
        projectGoal: selectedGoal,
        timeline: selectedTimeline,
        budget: selectedBudget,
      });
      setFormStatus("submitted");
      setStatusMessage("Request sent. You’ll get a confirmation mail, check the spam folder also.");
    } catch (error) {
      setFormStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "We could not send your request.",
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
            [ Simple questions for
            <br />
            your website or app idea ]
          </p>
        </header>

        <div className="contact-heading contact-reveal">
          <h2>
            Tell us your idea
            <br />
            <span>in simple words.</span>
          </h2>
          <AgencyMark className="contact-heading-mark" />
        </div>

        <div className="contact-layout">


          <div className="contact-panel">
            <div className="contact-panel-top">
              <div>
                <span>Project request</span>
                <strong>Quick questions. Easy answers.</strong>
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
                  <small>What should we call you?</small>
                  <input
                    type="text"
                    placeholder="Example: Chethan"
                    required
                    value={formData.name}
                    onChange={(event) =>
                      updateFormData("name", event.target.value)
                    }
                  />
                </label>

                <label className="contact-field">
                  <span>02 / Your email</span>
                  <small>We will reply to this email.</small>
                  <input
                    type="email"
                    placeholder="you@example.com"
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
                <small>Optional, but helpful for a faster reply.</small>
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
                <legend>04 / What do you want to build?</legend>
                <p className="contact-choice-hint">Pick the closest answer.</p>
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

              <fieldset className="contact-choice-group">
                <legend>05 / What help do you need most?</legend>
                <p className="contact-choice-hint">It is okay if you are not sure.</p>
                <div className="contact-choices">
                  {goalOptions.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setSelectedGoal(goal)}
                      className={selectedGoal === goal ? "is-selected" : ""}
                    >
                      {selectedGoal === goal && <Check className="h-3 w-3" />}
                      {goal}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="contact-choice-group">
                <legend>06 / When do you want to start?</legend>
                <p className="contact-choice-hint">Choose a rough time.</p>
                <div className="contact-choices">
                  {timelineOptions.map((timeline) => (
                    <button
                      key={timeline}
                      type="button"
                      onClick={() => setSelectedTimeline(timeline)}
                      className={selectedTimeline === timeline ? "is-selected" : ""}
                    >
                      {selectedTimeline === timeline && <Check className="h-3 w-3" />}
                      {timeline}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="contact-field contact-message">
                <span>07 / Tell us the idea</span>
                <small>Write 2 or 3 lines. Simple words are perfect.</small>
                <textarea
                  placeholder="Example: I need a website for my business. It should show my services and help people contact me."
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(event) =>
                    updateFormData("message", event.target.value)
                  }
                />
              </label>

              <fieldset className="contact-choice-group">
                <legend>08 / Budget or payment plan (optional)</legend>
                <p className="contact-choice-hint">
                  You can choose &quot;Not sure yet&quot;. We can discuss this later.
                </p>
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
                  No code needed. Send the request and we will reply by email.
                </p>
                <button
                  type="submit"
                  className={submitted ? "is-submitted" : ""}
                  disabled={isSubmitting || submitted}
                >
                  {isSubmitting ? (
                    <>
                      Sending
                      <LoaderCircle className="contact-spin h-4 w-4" />
                    </>
                  ) : submitted ? (
                    <>
                      Request sent
                      <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Send request
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
