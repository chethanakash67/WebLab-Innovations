"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    console.log("BackToTop mounted successfully");
    const toggleVisibility = () => {
      const isPastThreshold = window.scrollY > 300;
      setScrolled(isPastThreshold);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility(); // Check initial scroll state

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <a
      href="#home"
      className={`back-to-top ${scrolled ? "is-visible" : ""}`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </a>
  );
}
