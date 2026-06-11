"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Phone, X } from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import { founders } from "@/data/projects";

const footerLinks = {
  navigation: [
    { label: "Studio", popupKey: "studio" },
    { label: "Services", popupKey: "services" },
    { label: "Selected work", popupKey: "work" },
    { label: "Team", popupKey: "team" },
    { label: "Contact", popupKey: "contact" },
  ],
  services: [
    { label: "Web Design", popupKey: "web-design" },
    { label: "Web Development", popupKey: "web-development" },
    { label: "SaaS Products", popupKey: "saas-products" },
    { label: "AI Solutions", popupKey: "ai-solutions" },
  ],
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/the-aigleon-labs/posts/?feedView=all",
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
    body: "WebLab designs and builds focused digital products for teams that want sharp strategy, polished UI, and reliable engineering.",
  },
  services: {
    eyebrow: "Services",
    title: "Design, Development, And AI Systems",
    body: "From brand websites to SaaS products and AI automations, every build is planned around performance and conversion.",
  },
  work: {
    eyebrow: "Selected Work",
    title: "Built For Real Business Outcomes",
    body: "Our projects focus on stronger lead capture, cleaner customer journeys, and systems that reduce manual work.",
  },
  team: {
    eyebrow: "Team",
    title: "Meet The Founders",
    body: "WebLab is run by two founders who stay close to strategy, design, engineering, and launch quality.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Talk To WebLab",
    body: "Email chethanakash67@gmail.com or call 8919870959. We usually respond within 24 hours.",
  },
  "web-design": {
    eyebrow: "Capability",
    title: "Web Design",
    body: "High-end landing pages and websites with strong visual hierarchy, mobile responsiveness, and clear conversion paths.",
  },
  "web-development": {
    eyebrow: "Capability",
    title: "Web Development",
    body: "Fast, scalable frontends and full-stack builds using modern frameworks, clean architecture, and production-ready polish.",
  },
  "saas-products": {
    eyebrow: "Capability",
    title: "SaaS Products",
    body: "Dashboards, portals, and product interfaces designed for usability, performance, and long-term growth.",
  },
  "ai-solutions": {
    eyebrow: "Capability",
    title: "AI Solutions",
    body: "Customer support bots, voice agents, workflow automations, and local-growth systems built around practical business use cases.",
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
          <button
            type="button"
            className="footer-cta-button"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Start a project
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>

        <div className="footer-main">
          <div className="footer-wordmark" aria-hidden="true">
            Web<span>Lab</span>
          </div>
          <div className="footer-studio">
            <button
              type="button"
              className="footer-brand footer-brand-button"
              aria-label="Open WebLab studio details"
              onClick={() => setActivePopup("studio")}
            >
              <AgencyMark />
              <span>
                <strong>WebLab</strong>
                <small>Digital product studio</small>
              </span>
            </button>
            <p>
              We design and build focused digital products for ambitious teams
              ready to move.
            </p>

            <div className="footer-contact-list">
              <a href="mailto:chethanakash67@gmail.com">
                <Mail className="h-4 w-4" />
                <span>
                  <small>Email</small>
                  <strong>chethanakash67@gmail.com</strong>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4" />
              </a>
              <a href="tel:+918919870959">
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
          <span>© {new Date().getFullYear()} WebLab Studio</span>
          <span className="footer-availability">
            <span className="signal-dot" />
            Available for select Q3 projects
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
            {external && link.href ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
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
