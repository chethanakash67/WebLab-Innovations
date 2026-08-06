"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReactiveGlow } from "@/hooks/useReactiveGlow";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [quoteHovered, setQuoteHovered] = useState(false);
  const [quoteMousePos, setQuoteMousePos] = useState({ x: 0, y: 0 });
  const quoteRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);

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
          scale: 1,
          opacity: 0.45,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
          delay: 0.15,
        });

        gsap.to(artworkRef.current, {
          yPercent: 6,
          scale: 1.05,
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
          zIndex: 0,
          opacity: 0.45,
          pointerEvents: "none",
          transform: "scale(1.1)",
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
            objectPosition: "center",
            filter: "contrast(1.15) brightness(0.7)"
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
          background: "radial-gradient(ellipse at center, rgba(2,3,3,0.3) 0%, rgba(2,3,3,0.85) 60%, #020303 100%)",
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
          <span className="hero-highlight">
            end to end engines
          </span>{" "}
          for your digital growth, covering both user-facing experiences and
          internal workflows for{" "}
          <span className="hero-highlight">
            luxury and premium brands
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
              <a href="#work" className="button button-muted">
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

          <div 
            className="hero-availability"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "4px"
            }}
          >
            <span className="signal-dot" />
            Booking select projects now
          </div>
        </div>
      </div>

      <div className="hero-edge-label">Scroll to explore</div>
    </section>
  );
}
