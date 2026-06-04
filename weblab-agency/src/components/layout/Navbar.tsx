"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";

const navLinks = [
  { label: "Studio", href: "#home", number: "01" },
  { label: "Services", href: "#services", number: "02" },
  { label: "Work", href: "#work", number: "03" },
  { label: "Team", href: "#team", number: "04" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const current = [...navLinks]
        .reverse()
        .find(({ href }) => {
          const section = document.querySelector(href);
          return section && section.getBoundingClientRect().top <= 180;
        });

      setActiveSection(current?.href ?? "#home");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="site-nav"
      >
        <div className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
          <a href="#home" className="nav-brand" aria-label="WebLab home">
            <AgencyMark />
            <span className="nav-brand-copy">
              <strong>WebLab</strong>
              <span>Digital product studio</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={activeSection === link.href ? "is-active" : ""}
              >
                <span>{link.label}</span>
                <sup>{link.number}</sup>
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="nav-availability">
              <span className="signal-dot" />
              Available for Q3
            </div>
            <a href="#contact" className="nav-contact">
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="nav-mobile-toggle"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <span>Menu</span>
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="mobile-nav"
          >
            <div className="mobile-nav-top">
              <a
                href="#home"
                onClick={() => setMobileOpen(false)}
                className="nav-brand"
              >
                <AgencyMark />
                <span className="nav-brand-copy">
                  <strong>WebLab</strong>
                  <span>Digital product studio</span>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mobile-nav-close"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mobile-nav-links" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + index * 0.07 }}
                >
                  <span className="mobile-nav-number">{link.number}</span>
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-5 w-5" />
                </motion.a>
              ))}
            </nav>

            <div className="mobile-nav-bottom">
              <p>
                Have a project in mind?
                <br />
                Let&apos;s make it real.
              </p>
              <a href="#contact" onClick={() => setMobileOpen(false)}>
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
