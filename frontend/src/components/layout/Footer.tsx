"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, X, Copy, Check } from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import { founders } from "@/data/projects";

const footerLinks = {
  navigation: [
    { label: "Work", popupKey: undefined, href: "/work" },
    { label: "Tech Products", popupKey: undefined, href: "/products" },
    { label: "Testimonials", popupKey: undefined, href: "/testimonials" },
    { label: "FAQ", popupKey: undefined, href: "/faq" },
    { label: "Contact", popupKey: undefined, href: "/contact" },
  ],
  details: [
    { label: "Our Story", popupKey: undefined, href: "/story" },
    { label: "T&C", popupKey: undefined, href: "/TERMS%20AND%20CONDITIONS%20AIGLEON%20LABS.pdf" },
  ],
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/the-aigleon-labs/posts/?feedView=all",
      popupKey: undefined,
    },
  ],
} as const;

const footerPopups = {
  start: {
    eyebrow: "Project Request",
    title: "Start With A Clear Build Scope",
    body: "Tell us what you want to launch. We will shape the right website, SaaS, dashboard, or AI system around your business goal.",
  },
  studio: {
    eyebrow: "Studio",
    title: "Premium Digital Product Studio",
    body: "AigleOn Labs designs and builds focused digital products for teams that want sharp strategy, polished UI, and reliable engineering.",
  },
  services: {
    eyebrow: "Services",
    title: "Design, Development, And AI Systems",
    body: "From brand-themed UI design to SEO-first development, answer engine optimisation, and AI-powered business tools — every build is planned around performance and conversion.",
  },
  work: {
    eyebrow: "Selected Work",
    title: "Built For Real Business Outcomes",
    body: "Our projects focus on stronger lead capture, cleaner customer journeys, and systems that reduce manual work.",
  },
  team: {
    eyebrow: "Team",
    title: "Meet The Founders",
    body: "AigleOn Labs is run by two founders who stay close to strategy, design, engineering, and launch quality.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Talk To AigleOn Labs",
    body: "Email contact@theaigleonlabs.dev or call 8919870959. We usually respond within 24 hours.",
  },
  "ui-ux-design": {
    eyebrow: "Capability",
    title: "UI & UX Design",
    body: "Custom visual designs built around your brand theme, refined through conversion-focused UX strategy and real-user testing.",
  },
  "seo-development": {
    eyebrow: "Capability",
    title: "SEO-First Development",
    body: "Clean, semantic code that Google crawlers and AI search engines can easily understand — built from your finalised design.",
  },
  "seo-aeo": {
    eyebrow: "Capability",
    title: "SEO & Answer Engine Optimisation",
    body: "Traditional search engine optimisation paired with answer engine optimisation so your brand surfaces across both Google and AI-powered search.",
  },
  "ai-automation": {
    eyebrow: "Capability",
    title: "AI & Automation Systems",
    body: "FAQ bots, WhatsApp agents, AI review systems, lead capture tools, and Google Business automation — built around your specific business needs.",
  },
};

type FooterPopupKey = keyof typeof footerPopups;

export default function Footer() {
  const [activePopup, setActivePopup] = useState<FooterPopupKey | null>(null);
  const [copied, setCopied] = useState(false);
  const popup = activePopup ? footerPopups[activePopup] : null;

  const [subEmail, setSubEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subMsg, setSubMsg] = useState("");
  const [subStatus, setSubStatus] = useState<"success" | "error" | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@theaigleonlabs.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim()) return;

    setSubLoading(true);
    setSubMsg("");
    setSubStatus(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subEmail }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubStatus("success");
        setSubMsg(data.message || "Subscribed successfully!");
        setSubEmail("");
      } else {
        setSubStatus("error");
        setSubMsg(data.message || "Failed to subscribe. Please try again.");
      }
    } catch {
      setSubStatus("error");
      setSubMsg("Something went wrong. Please try again later.");
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-orbit" />
      <div className="footer-wrap">
        <div className="footer-cta">
          <div>
            <span className="footer-eyebrow">[ Your next move ]</span>
            <h2>
              Ready when
              <br />
              <span>you are.</span>
            </h2>
          </div>
          <a
            href="https://wa.me/917396733009?text=Hi,%20I%20need%20you%20to%20do%20an%20full%20audit%20to%20my%20business.%20let's%20talk"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cta-button"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              minWidth: "180px",
              minHeight: "48px",
              padding: "0 16px",
              borderRadius: "13px",
              background: "#fff",
              color: "#020303",
              fontSize: "17px",
              fontWeight: "650",
              border: "none",
              boxShadow: "none",
              transition: "background 300ms ease, box-shadow 300ms ease, transform 300ms ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#36b8ff";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(54, 184, 255, 0.25)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Book a free audit
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <div className="footer-main">
          <div className="footer-wordmark" aria-hidden="true">
            AigleOn<span>Labs</span>
          </div>

          <div className="footer-studio">
            <div className="footer-response-flag-top">
              <span className="signal-dot" style={{ background: "#36b8ff", boxShadow: "0 0 8px #36b8ff" }} />
              Typical response in 24 hours
            </div>

            <div className="footer-top-row">
              <div className="footer-brand-section">
                <button
                  type="button"
                  className="footer-brand footer-brand-button"
                  aria-label="Open AigleOn Labs studio details"
                  onClick={() => setActivePopup("studio")}
                >
                  <AgencyMark />
                  <span>
                    <strong>AigleOn Labs</strong>
                    <small>Digital product studio</small>
                  </span>
                </button>
              </div>
              <div className="footer-contact-inline">
                <a
                  href="mailto:contact@theaigleonlabs.dev?subject=Project%20Inquiry&body=Hello%20AigleOn%20Labs%20Team,%0A%0AI'm%20interested%20in%20discussing%20a%20project%20with%20you."
                  style={{ position: "relative", zIndex: 50, width: "100%" }}
                >
                  <Mail className="h-4 w-4" />
                  <span>
                    <small>Email</small>
                    <strong>contact@theaigleonlabs.dev</strong>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4" />
                </a>
                <a href="tel:+918919870959" style={{ position: "relative", zIndex: 50 }}>
                  <Phone className="h-4 w-4" />
                  <span>
                    <small>Phone</small>
                    <strong>8919870959</strong>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4" />
                </a>
                <a href="tel:+917396733009" style={{ position: "relative", zIndex: 50 }}>
                  <Phone className="h-4 w-4" />
                  <span>
                    <small>Phone</small>
                    <strong>7396733009</strong>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4" />
                </a>
              </div>
            </div>

            <p className="footer-studio-desc">
              We design and build focused digital products for ambitious teams
              ready to move.
            </p>
            <div style={{ marginTop: "12px", marginBottom: "24px" }}>
              <Link
                href="/contact"
                className="footer-idea-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#36b8ff",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "opacity 0.2s"
                }}
              >
                Tell us your idea
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="footer-links">
              <FooterColumn
                title="Explore"
                links={footerLinks.navigation}
                onPopup={setActivePopup}
              />
              <FooterColumn
                title="Details"
                links={footerLinks.details}
                onPopup={setActivePopup}
              />
              <FooterColumn title="Connect" links={footerLinks.social} external />
            </div>

            <div className="footer-flags-row">
              <span className="footer-flag-item footer-availability">
                <span className="signal-dot" />
                Available for projects
              </span>
              <span className="footer-flag-item">India / Working worldwide</span>
            </div>

            {popup ? (
              <div
                className={`footer-popup-card ${activePopup === "team" ? "is-team" : ""}`}
                role="status"
              >
                <button
                  type="button"
                  className="footer-popup-close"
                  aria-label="Close footer popup"
                  onClick={() => setActivePopup(null)}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <span>{popup.eyebrow}</span>
                <strong>{popup.title}</strong>
                <p>{popup.body}</p>
                {activePopup === "team" ? (
                  <div className="footer-team-popup-list">
                    {founders.map((founder, index) => (
                      <article key={founder.id}>
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        <div>
                          <h4>{founder.name}</h4>
                          <span>{founder.role}</span>
                          <p>
                            {founder.id === "chethan-akash"
                              ? "Focuses on polished interfaces, frontend systems, and AI customer workflows."
                              : "Focuses on product direction, brand clarity, and launch-ready execution."}
                          </p>
                        </div>
                        <div className="footer-team-popup-actions">
                          <a
                            href={founder.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Portfolio
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LinkedIn
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {/* Research Work Subscription Row */}
        <div 
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "24px",
            paddingBottom: "24px",
            marginTop: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.75)", maxWidth: "600px" }}>
            Wanna know more things about businesses, systems and AI? <span style={{ color: "#36b8ff", fontWeight: 600 }}>Join our community.</span>
          </p>

          <form 
            onSubmit={handleSubscribeSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              maxWidth: "460px",
              width: "100%"
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              disabled={subLoading}
              style={{
                flex: 1,
                height: "42px",
                padding: "0 14px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "0.85rem",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#36b8ff"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.15)"}
            />
            <button
              type="submit"
              disabled={subLoading}
              style={{
                height: "42px",
                padding: "0 18px",
                backgroundColor: "#36b8ff",
                color: "#000000",
                fontWeight: 650,
                fontSize: "0.85rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s"
              }}
            >
              {subLoading ? "Subscribing..." : "Subscribe"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
          {subMsg && (
            <span style={{ fontSize: "0.8rem", color: subStatus === "success" ? "#36b8ff" : "#ef4444" }}>
              {subMsg}
            </span>
          )}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AigleOn Labs</span>
        </div>

      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  onPopup,
  external = false,
}: {
  title: string;
  links: readonly { label: string; href?: string; popupKey?: FooterPopupKey }[];
  onPopup?: (key: FooterPopupKey) => void;
  external?: boolean;
}) {
  return (
    <div className="footer-column">
      <span>{title}</span>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              link.href.startsWith("/") && !link.href.endsWith(".pdf") ? (
                <Link href={link.href}>
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (link.popupKey) {
                    onPopup?.(link.popupKey);
                  }
                }}
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
