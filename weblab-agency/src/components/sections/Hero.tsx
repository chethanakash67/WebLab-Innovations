"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      if (artworkRef.current) {
        gsap.fromTo(
          artworkRef.current,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" }
        );

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
          src="/art/robot-hands-hero.png"
          alt=""
          fill
          priority
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
            Digital product agency
            <span className="text-primary-light">/ 2026</span>
          </div>

          <h1 className="hero-reveal hero-title">
            Your digital
            <br />
            team, <span>on demand.</span>
          </h1>

          <p className="hero-reveal hero-intro">
            We design and build sharp websites, SaaS products, and AI-powered
            experiences for teams ready to move.
          </p>
        </div>

        <div className="hero-reveal hero-mark-wrap">
          <div className="hero-mark-halo" />
          <AgencyMark className="hero-mark" />
          <span className="hero-mark-label">WebLab / digital systems</span>
        </div>

        <aside className="hero-proof hero-reveal" aria-label="Agency highlights">
          <div className="proof-card proof-card-featured">
            <div className="proof-card-top">
              <span>Selected launch</span>
              <span>01/04</span>
            </div>
            <div className="proof-screen">
              <Image
                src="/workpics/dropiq-1.png"
                alt="DropIQ product interface"
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
            <strong>50+</strong>
            <span>digital products shipped</span>
          </div>

          <div className="proof-card proof-card-stat">
            <strong>98%</strong>
            <span>Client satisfaction</span>
            <div className="proof-line" />
            <p>Small senior team. Direct communication. No hand-offs.</p>
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
              <a href="#contact" className="button button-primary">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </MagneticButton>
          </div>

          <div className="hero-availability">
            <span className="signal-dot" />
            Booking select projects for Q3
          </div>
        </div>
      </div>

      <div className="hero-edge-label">Scroll to explore</div>
    </section>
  );
}
