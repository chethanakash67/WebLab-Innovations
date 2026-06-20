"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, X } from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import { founders } from "@/data/projects";

const footerLinks = {
  navigation: [
    { label: "Work", popupKey: undefined, href: "/work" },
    { label: "Testimonials", popupKey: undefined, href: "/testimonials" },
    { label: "FAQ", popupKey: undefined, href: "/faq" },
    { label: "Contact", popupKey: undefined, href: "/contact" },
  ],
  services: [
    { label: "UI & UX Design", popupKey: "ui-ux-design" as any, href: undefined },
    { label: "SEO-First Development", popupKey: "seo-development" as any, href: undefined },
    { label: "SEO & AEO", popupKey: "seo-aeo" as any, href: undefined },
    { label: "AI & Automation", popupKey: "ai-automation" as any, href: undefined },
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
  const popup = activePopup ? footerPopups[activePopup] : null;

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
            href="https://wa.me/918919870959?text=hello,%20I'm%20intterested%20for%20a%20service%20from%20your%20agency,%20please%20explain%20me"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cta-button"
            style={{ textDecoration: "none" }}
          >
            Start a project
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <div className="footer-main">
          <div className="footer-wordmark" aria-hidden="true">
            AigleOn<span>Labs</span>
          </div>
          <div className="footer-studio">
            <div
              className="footer-response-flag"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "999px",
                padding: "6px 12px",
                fontSize: "10px",
                color: "rgba(255, 255, 255, 0.6)",
                width: "fit-content",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 500
              }}
            >
              <span className="signal-dot" style={{ background: "#36b8ff", boxShadow: "0 0 8px #36b8ff" }} />
              Typical response in 24 hours
            </div>
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
            <p>
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

            <div className="footer-contact-list">
              <a href="mailto:contact@theaigleonlabs.dev" style={{ position: "relative", zIndex: 50 }}>
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
            </div>
          </div>

          <div className="footer-links">
            <FooterColumn
              title="Explore"
              links={footerLinks.navigation}
              onPopup={setActivePopup}
            />
            <FooterColumn
              title="Capabilities"
              links={footerLinks.services}
              onPopup={setActivePopup}
            />
            <FooterColumn title="Connect" links={footerLinks.social} external />
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

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AigleOn Labs Studio</span>
          <span className="footer-availability">
            <span className="signal-dot" />
            Available for projects
          </span>
          <span>India / Working worldwide</span>
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
              link.href.startsWith("/") ? (
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
