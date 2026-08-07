"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const points = [
  {
    num: "01",
    title: "Story & Purpose First",
    text: "This is for businesses whose products have a story behind them. Every product made on purpose, down to the small details.",
    highlightColor: "#36b8ff",
  },
  {
    num: "02",
    title: "Premium & Niche Focus",
    text: "Premium stuff, good quality, real design thinking. Built for a specific kind of person, someone who's into that niche and wants to explore it.",
    highlightColor: "#e6a15c",
  },
  {
    num: "03",
    title: "The Craft & Luxury Brands",
    text: "Think speciality coffee roasters, luxury perfume brands, etc.. like niche craft pioneers, who are only into that specific thing. ",
    highlightColor: "#36b8ff",
  },
];

export default function WhoIsItFor() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".who-reveal",
        { y: 30, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-is-it-for"
      style={{
        position: "relative",
        padding: "80px clamp(20px, 5vw, 64px)",
        backgroundColor: "#020303",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        overflow: "hidden",
      }}
    >
      {/* Background Ambient Radial Lighting */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "1200px",
          height: "450px",
          background: "radial-gradient(ellipse at center, rgba(54, 184, 255, 0.06) 0%, rgba(2, 3, 3, 0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1500px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Center Aligned Header */}
        <div
          className="who-reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <SectionBadge label="Ideal Partner Profile" number="01" />

          <h2
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginTop: "16px",
              marginBottom: "12px",
              lineHeight: 1.15,
              textAlign: "center",
            }}
          >
            Who is it <span style={{ color: "#36b8ff" }}>for??</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
              color: "#9ca3aa",
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            Built specifically for purpose-driven brands with craftsmanship at their core.
          </p>
        </div>

        {/* 3-Line Cards Container - Full Width */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          {points.map((pt) => (
            <div
              key={pt.num}
              className="who-reveal"
              style={{
                position: "relative",
                width: "100%",
                backgroundColor: "#0b0d0f",
                border: "1px solid #20252b",
                borderRadius: "14px",
                padding: "24px 32px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
                opacity: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(54, 184, 255, 0.45)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(54, 184, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#20252b";
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
              }}
            >
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      color: pt.highlightColor,
                      textTransform: "uppercase",
                    }}
                  >
                    LINE {pt.num}: {pt.title}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                    fontFamily: "var(--font-sans), sans-serif",
                    color: "#ffffff",
                    lineHeight: 1.6,
                    fontWeight: 450,
                    margin: 0,
                  }}
                >
                  {pt.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
