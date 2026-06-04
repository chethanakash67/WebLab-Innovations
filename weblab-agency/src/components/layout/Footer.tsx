"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";

const footerLinks = {
  navigation: [
    { label: "Studio", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Selected work", href: "#work" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Web Design", href: "#services" },
    { label: "Web Development", href: "#services" },
    { label: "SaaS Products", href: "#services" },
    { label: "AI Solutions", href: "#services" },
  ],
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export default function Footer() {
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
          <a href="#contact" className="footer-cta-button">
            Start a project
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <div className="footer-main">
          <div className="footer-studio">
            <a href="#home" className="footer-brand" aria-label="WebLab home">
              <AgencyMark />
              <span>
                <strong>WebLab</strong>
                <small>Digital product studio</small>
              </span>
            </a>
            <p>
              We design and build focused digital products for ambitious teams
              ready to move.
            </p>

            <div className="footer-contact-list">
              <a href="mailto:hello@weblab.agency">
                <Mail className="h-4 w-4" />
                <span>
                  <small>Email</small>
                  <strong>hello@weblab.agency</strong>
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
            <FooterColumn title="Explore" links={footerLinks.navigation} />
            <FooterColumn title="Capabilities" links={footerLinks.services} />
            <FooterColumn title="Connect" links={footerLinks.social} external />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} WebLab Studio</span>
          <span className="footer-availability">
            <span className="signal-dot" />
            Available for select Q3 projects
          </span>
          <span>India / Working worldwide</span>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          Web<span>Lab</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div className="footer-column">
      <span>{title}</span>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
