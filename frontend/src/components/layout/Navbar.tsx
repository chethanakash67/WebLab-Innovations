"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import RegionSelector from "@/components/ui/RegionSelector";

const navLinks = [
  { label: "Studio", href: "#home", number: "01", isPage: false },
  { label: "Services", href: "#services", number: "02", isPage: false },
  { label: "Assets", href: "/prebuilt-assets", number: "03", isPage: true },
  { label: "Work", href: "/work", number: "04", isPage: true },
  { label: "Lab", href: "/lab", number: "05", isPage: true },
  { label: "Team", href: "#team", number: "06", isPage: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const getHref = (link: typeof navLinks[number]) => {
    if (link.isPage) return link.href;
    return isHome ? link.href : `/${link.href}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const current = [...navLinks]
        .filter((link) => !link.isPage)
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
        initial={{ opacity: 0.3, filter: "blur(3px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="site-nav"
      >
        <div className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
          <Link href={isHome ? "#home" : "/"} className="nav-brand" aria-label="AigleOn Labs home">
            <AgencyMark />
            <span className="nav-brand-copy">
              <strong>The AigleOn Labs</strong>
              <span>Brand Visibility and Growth Agency</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getHref(link)}
                className={isHome && activeSection === link.href ? "is-active" : ""}
              >
                <span>{link.label}</span>
                <sup>{link.number}</sup>
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="nav-availability">
              <span className="signal-dot" />
              Available for Enquiry
            </div>
            <a
              href="https://wa.me/917396733009?text=Hi,%20I%20need%20you%20to%20do%20an%20full%20audit%20to%20my%20business.%20let's%20talk"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-contact"
            >
              Book a free audit
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="nav-mobile-toggle"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className="nav-burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="mobile-nav"
          >
            <div className="mobile-nav-top">
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
                <Link
                  key={link.href}
                  href={getHref(link)}
                  onClick={() => setMobileOpen(false)}
                  className=""
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
                >
                  <motion.span
                    initial={{ y: 36, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + index * 0.07 }}
                    style={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <span className="mobile-nav-number">{link.number}</span>
                    <span>{link.label}</span>
                  </motion.span>
                  <motion.span
                    initial={{ y: 36, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + index * 0.07 }}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
