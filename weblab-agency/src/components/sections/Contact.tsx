"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const budgetOptions = ["< ₹25K", "₹25K - ₹50K", "₹50K - ₹1L", "₹1L+"];
const projectTypes = ["Website", "SaaS product", "AI solution", "Brand + UI"];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedBudget, setSelectedBudget] = useState("₹50K - ₹1L");
  const [selectedType, setSelectedType] = useState("Website");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
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
                      setFormData({ ...formData, name: event.target.value })
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
                      setFormData({ ...formData, email: event.target.value })
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
                    setFormData({ ...formData, phone: event.target.value })
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
                    setFormData({ ...formData, message: event.target.value })
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

              <div className="contact-submit-row">
                <p>
                  By sending this enquiry, you agree to be contacted about your
                  project.
                </p>
                <button
                  type="submit"
                  className={submitted ? "is-submitted" : ""}
                >
                  {submitted ? (
                    <>
                      Enquiry ready
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
