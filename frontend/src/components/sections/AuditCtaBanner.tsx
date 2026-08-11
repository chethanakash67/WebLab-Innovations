"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AuditCtaBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.from(containerRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openAuditModal = () => {
    const auditPopupEvent = new CustomEvent("open-audit-modal");
    window.dispatchEvent(auditPopupEvent);

    window.open(
      "https://wa.me/917396733009?text=Hi,%20I'm%20not%20sure%20what%20my%20business%20needs%20right%20now.%20I'd%20like%20to%20book%20a%20free%20audit%20to%20get%20maximum%20benefit.",
      "_blank"
    );
  };

  return (
    <section
      style={{
        padding: "64px 16px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#020303",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }}>
        <div
          ref={containerRef}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "24px",
            border: "1px solid rgba(54, 184, 255, 0.3)",
            background: "linear-gradient(180deg, #0b1016 0%, #050709 100%)",
            padding: "40px 24px",
            textAlign: "center",
            maxWidth: "960px",
            margin: "0 auto",
            boxShadow: "0 0 80px rgba(54, 184, 255, 0.12)",
          }}
        >
          {/* Subtle Ambient Radial Blur */}
          <div
            aria-hidden="true"
            style={{
              pointerEvents: "none",
              position: "absolute",
              top: "-96px",
              left: "50%",
              transform: "translateX(-50%)",
              height: "300px",
              width: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle at center, rgba(54, 184, 255, 0.15) 0, transparent 70%)",
              filter: "blur(48px)",
            }}
          />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "780px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: "1.3",
                marginBottom: "20px",
                fontFamily: "var(--font-display), Syne, sans-serif",
              }}
            >
              &ldquo;Not sure what your business needs right now? Book a free audit with us today, and make sure every penny you spend gives you the maximum benefit possible.&rdquo;
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "rgba(255, 255, 255, 0.78)",
                marginBottom: "28px",
                maxWidth: "640px",
                margin: "0 auto 28px auto",
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                lineHeight: "1.6",
              }}
            >
              We analyze your current setup, reveal high-leverage growth gaps, and show you exactly where to focus first before you spend a single rupee.
            </p>

            {/* WHITE BUTTON INITIALLY -> BLUE ON HOVER/CLICK (BLACK TEXT ONLY) */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                onClick={openAuditModal}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "13px 28px",
                  borderRadius: "14px",
                  backgroundColor: isHovered ? "#36b8ff" : "#ffffff",
                  color: "#020303",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.02em",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: isHovered ? "0 0 25px rgba(54, 184, 255, 0.5)" : "0 4px 20px rgba(255, 255, 255, 0.2)",
                  transition: "all 0.25s ease",
                }}
              >
                <span>Book a free audit</span>
                <ArrowUpRight
                  style={{
                    width: "18px",
                    height: "18px",
                    transform: isHovered ? "rotate(45deg)" : "none",
                    transition: "transform 0.25s ease",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
