"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReactiveGlow } from "@/hooks/useReactiveGlow";
import { LibraryCatalogItem } from "@/lib/library";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [quoteHovered, setQuoteHovered] = useState(false);
  const [quoteMousePos, setQuoteMousePos] = useState({ x: 0, y: 0 });
  const [recentAuditItem, setRecentAuditItem] = useState<LibraryCatalogItem | null>(null);

  const quoteRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch latest audit / report from the library database
    fetch("/api/library")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.items) && data.items.length > 0) {
          setRecentAuditItem(data.items[0]);
        }
      })
      .catch((err) => console.error("Error fetching recent library audit:", err));
  }, []);

  const handleQuoteMouseMove = (e: React.MouseEvent) => {
    if (!quoteRef.current) return;
    const rect = quoteRef.current.getBoundingClientRect();
    setQuoteMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useReactiveGlow(heroRef, { restingX: 50, restingY: 50 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-reveal", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      if (artworkRef.current) {
        gsap.to(artworkRef.current, {
          scale: 0.9,
          x: -15,
          y: -15,
          opacity: 0.6,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
          delay: 0.15,
        });

        gsap.to(artworkRef.current, {
          yPercent: 4,
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      id="home" 
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#020303",
        paddingTop: "120px",
        paddingBottom: "60px"
      }}
    >
      {/* Vertical Enlarged Robotic Arm Background Image */}
      <div 
        ref={artworkRef} 
        style={{
          position: "absolute",
          inset: 0,
          top: "-15px",
          bottom: "15px",
          left: "-15px",
          right: "15px",
          zIndex: 0,
          opacity: 0.6,
          pointerEvents: "none",
          transform: "scale(0.95) translate(-15px, -15px)",
          transition: "opacity 0.5s ease"
        }}
      >
        <Image
          src="/robotic arm.jpg"
          alt="Robotic arm background"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "45% 45%",
            filter: "contrast(1.1) brightness(0.82)"
          }}
          sizes="100vw"
        />
      </div>

      {/* Dark Vignette Overlay for Text Readability */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "radial-gradient(ellipse at center, rgba(2,3,3,0.2) 0%, rgba(2,3,3,0.78) 65%, #020303 100%)",
          pointerEvents: "none"
        }} 
      />

      {/* Hero Ambient Glow Rings */}
      <div className="hero-orbit hero-orbit-one" style={{ zIndex: 1 }} />
      <div className="hero-orbit hero-orbit-two" style={{ zIndex: 1 }} />

      {/* Centered Hero Content Container */}
      <div 
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "960px",
          width: "100%",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        {/* Kicker Flag Badge */}
        <div 
          className="hero-reveal hero-kicker"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "20px"
          }}
        >
          <span className="signal-dot" />
          <span>Brand Visibility and Growth Agency</span>
          <span className="text-primary-light">/ 2026</span>
        </div>

        {/* Main Title */}
        <h1 
          className="hero-reveal hero-title"
          style={{
            textAlign: "center",
            margin: "0 auto",
            maxWidth: "880px"
          }}
        >
          Your digital
          <br />
          side, <span>is on us</span>
        </h1>

        {/* Subtitle / Intro Quote */}
        <p 
          className="hero-reveal hero-intro"
          style={{
            textAlign: "center",
            maxWidth: "620px",
            margin: "24px auto",
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            lineHeight: 1.6
          }}
        >
          We build{" "}
          <span 
            className="hero-highlight"
            style={{
              backgroundColor: "rgba(255, 230, 0, 0.8)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "4px",
              fontWeight: 650,
              boxShadow: "0 2px 10px rgba(255, 230, 0, 0.15)"
            }}
          >
            end to end engines
          </span>{" "}
          for your digital growth, covering both user-facing experiences and
          internal workflows for{" "}
          <span 
            className="hero-highlight"
            style={{
              backgroundColor: "rgba(255, 230, 0, 0.8)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "4px",
              fontWeight: 650,
              boxShadow: "0 2px 10px rgba(255, 230, 0, 0.15)"
            }}
          >
            niche craft pioneers
          </span>
          like{" "}
          <span 
            className="hero-highlight"
            style={{
              backgroundColor: "rgba(255, 230, 0, 0.8)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "4px",
              fontWeight: 650,
              boxShadow: "0 2px 10px rgba(255, 230, 0, 0.15)"
            }}
          >
            Speciality and Premium brands
          </span>
          .
        </p>

        {/* Centered Interactive Quote Box */}
        <div 
          className="hero-reveal"
          style={{
            margin: "12px 0 28px 0",
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <div 
            className="hero-quote-box"
            ref={quoteRef}
            onMouseEnter={() => setQuoteHovered(true)}
            onMouseLeave={() => setQuoteHovered(false)}
            onMouseMove={handleQuoteMouseMove}
            style={{ margin: "0 auto" }}
          >
            <div className="hero-quote-content">
              &quot;<span>Audit first</span> model for brands, <br /> with a <span>live demo </span> on the call.&quot;
            </div>

            {/* Magnifier Glass Container */}
            <div 
              style={{
                position: 'absolute',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                overflow: 'hidden',
                pointerEvents: 'none',
                left: quoteMousePos.x,
                top: quoteMousePos.y,
                transform: 'translate(-50%, -50%)',
                opacity: quoteHovered ? 1 : 0,
                border: '1.5px solid rgba(54, 184, 255, 0.4)',
                boxShadow: '0 0 15px rgba(54, 184, 255, 0.2), inset 0 0 10px rgba(54, 184, 255, 0.1)',
                backgroundColor: '#020303',
                zIndex: 10
              }}
            >
              <div 
                className="hero-quote-content"
                style={{
                  position: 'absolute',
                  left: -quoteMousePos.x * 1.6 + 20,
                  top: -quoteMousePos.y * 1.6 + 20,
                  width: quoteRef.current ? quoteRef.current.offsetWidth : 420,
                  transformOrigin: 'top left',
                  transform: 'scale(1.6)',
                  color: '#fff',
                  padding: '16px 32px'
                }}
              >
                &quot;<span>Audit first</span> model for brands, <br /> with a <span>live demo </span> on the call.&quot;
              </div>
            </div>
          </div>
        </div>

        {/* Centered Actions / CTA Buttons */}
        <div 
          className="hero-actions hero-reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            width: "100%",
            maxWidth: "480px"
          }}
        >
          <div 
            className="hero-cta-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              width: "100%"
            }}
          >
            <MagneticButton>
              <a
                href="#best-work"
                className="button button-muted"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("best-work") || document.getElementById("work");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/work";
                  }
                }}
              >
                Explore work
                <ArrowDown className="h-4 w-4" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://wa.me/917396733009?text=Hi,%20I%20need%20you%20to%20do%20an%20full%20audit%20to%20my%20business.%20let's%20talk"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                Book a free audit
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </MagneticButton>
          </div>

          {/* Recent Work (Auto-updated from Reports / Audits Database) */}
          <div 
            style={{
              marginTop: "24px",
              position: "relative",
              zIndex: 50,
              opacity: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "600px",
              width: "100%",
              padding: "16px 24px",
              backgroundColor: "rgba(11, 13, 15, 0.88)",
              border: "1px solid rgba(54, 184, 255, 0.35)",
              borderRadius: "14px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(54, 184, 255, 0.08)",
            }}
          >
            {recentAuditItem ? (
              <>
                {/* Line 1: recent work : name */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span className="signal-dot" style={{ backgroundColor: "#36b8ff", boxShadow: "0 0 10px #36b8ff" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#36b8ff", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Recent Work : {recentAuditItem.title}
                  </span>
                </div>

                {/* Line 2: one liner summary */}
                <p style={{ fontSize: "13px", color: "#e2e8f0", margin: "4px 0 10px 0", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {recentAuditItem.summary}
                </p>

                {/* Line 3: link */}
                <a
                  href={recentAuditItem.filePath || "/library"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "#ffffff",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                    textDecorationColor: "rgba(54, 184, 255, 0.7)",
                    transition: "color 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#36b8ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                >
                  View Audit / Report
                  <ArrowUpRight className="h-4 w-4 text-[#36b8ff]" />
                </a>
              </>
            ) : (
              <span style={{ fontSize: "12px", color: "#9ca3aa" }}>Loading recent work from database...</span>
            )}
          </div>
        </div>
      </div>

      <div className="hero-edge-label">Scroll to explore</div>
    </section>
  );
}
