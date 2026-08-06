"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReactiveGlow } from "@/hooks/useReactiveGlow";
import heroArtwork from "../../../public/art/robot-hands-hero.png";
import dropIqPic from "../../../public/workpics/dropiq-1.png";

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

  useReactiveGlow(heroRef, { restingX: 52, restingY: 46 });

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
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
          delay: 0.15,
        });

        gsap.to(artworkRef.current, {
          yPercent: 8,
          scale: 1.04,
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
    <section ref={heroRef} id="home" className="hero-section">
      <div ref={artworkRef} className="hero-artwork" aria-hidden="true">
        <Image
          src={heroArtwork}
          alt=""
          fill
          priority
          placeholder="blur"
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="hero-vignette" />
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />

      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-reveal hero-kicker">
            <span className="signal-dot" />
            Brand Visibility and Growth Agency
            <span className="text-primary-light">/ 2026</span>
          </div>

          <h1 className="hero-reveal hero-title">
            Your digital
            <br />
            side, <span>is on us</span>
          </h1>

          <p className="hero-reveal hero-intro">
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
        </div>

        <div className="hero-reveal hero-mark-wrap">
          <div className="hero-mark-halo" />
          <AgencyMark className="hero-mark" />
          <span className="hero-mark-label">AigleOn Labs | digital growth systems</span>
          <div 
            className="hero-quote-box"
            ref={quoteRef}
            onMouseEnter={() => setQuoteHovered(true)}
            onMouseLeave={() => setQuoteHovered(false)}
            onMouseMove={handleQuoteMouseMove}
          >
            <div className="hero-quote-content">
              &quot;<span>Audit first</span> model for brands, <br /> with a <span>live demo </span> on the call.&quot;
            </div>

            {/* Magnifier Glass Container (Matches reference logic) */}
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
                backgroundColor: '#020303', // Solid background
                zIndex: 10
              }}
            >
              {/* Scaled Text Inside Magnifier */}
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
                  padding: '16px 32px' // Explicitly match the outer content padding
                }}
              >
                &quot;<span>Audit first</span> model for brands, <br /> with a <span>live demo </span> on the call.&quot;
              </div>
            </div>
          </div>
        </div>

        <aside className="hero-proof hero-reveal" aria-label="Agency highlights">
          <div className="proof-card proof-card-featured">
            <div className="proof-card-top">
              <span>Selected launch</span>
              <span>01/04</span>
            </div>
            <div className="proof-screen">
              <Image
                src={dropIqPic}
                alt="DropIQ product interface"
                fill
                placeholder="blur"
                className="object-cover"
                sizes="240px"
              />
            </div>
            <strong>8+</strong>
            <span>projects delivered</span>
          </div>

          <div className="proof-card proof-card-stat">
            <strong>97%</strong>
            <span>Client satisfaction</span>
            <div className="proof-line" />
            <p>Small senior team. Direct communication for your ease.</p>
          </div>
        </aside>

        <div className="hero-actions hero-reveal">
          <div className="hero-note">
            <span className="hero-note-index">/</span>
            <p>
              Strategy, visual identity,
              <br />
              interface, and engineering.
            </p>
          </div>

          <div className="hero-cta-row">
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

          <div className="hero-availability">
            <span className="signal-dot" />
            Booking select projects now
          </div>
        </div>
      </div>

      <div className="hero-edge-label">Scroll to explore</div>
    </section>
  );
}
