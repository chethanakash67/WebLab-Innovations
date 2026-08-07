"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const toggleVisibility = () => {
      const isPastThreshold = window.scrollY > 300;
      setScrolled(isPastThreshold);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility(); // Check initial scroll state

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isMounted) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`back-to-top ${scrolled ? "is-visible" : ""}`}
      aria-label="Back to top"
      style={{ cursor: "pointer" }}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}
