"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const pills = [
  { label: "CREATIVE", x: 28, y: 28 },
  { label: "DYNAMIC", x: 66, y: 25 },
  { label: "QUALITY", x: 44, y: 55 },
  { label: "FAST DELIVERY", x: 72, y: 60 },
  { label: "SCALABLE", x: 30, y: 72 },
  { label: "CONVERSION FOCUSED", x: 58, y: 80 },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      const pillEls = sectionRef.current?.querySelectorAll(".float-pill");
      if (pillEls) {
        gsap.set(pillEls, { scale: 0, opacity: 0 });
        gsap.to(pillEls, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      gsap.from(".why-orb-scene", {
        scale: 0.82,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-orb-scene",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="why-section relative section-padding overflow-hidden"
    >
      {/* Dotted world map background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="why-section-inner relative z-10 max-w-7xl mx-auto">
        <div className="why-meta text-center mb-12">
          <SectionBadge label="Why Us" number="06" />
        </div>

        {/* Large heading */}
        <div className="text-center mb-4">
          <h2 className="why-title font-display font-bold text-5xl md:text-7xl lg:text-9xl tracking-tight leading-[0.9]">
            Small Team.
            <br />
            Serious Range.
          </h2>
        </div>

        <p className="text-center text-muted-dark uppercase tracking-[0.4em] text-xs mb-20 font-medium">
          What You&apos;ll Get
        </p>

        {/* Pill layout area */}
        <div className="why-visual-area">
          <div className="why-orb-scene" aria-hidden="true">
            <div className="why-orbit why-orbit-outer" />
            <div className="why-orbit why-orbit-inner" />
            <div className="why-sphere">
              <div className="why-sphere-grid" />
              <div className="why-sphere-label">WHY WEBLAB</div>
            </div>
            <div className="why-person">
              <span className="why-person-head" />
              <span className="why-person-body" />
              <span className="why-person-arm" />
              <span className="why-person-leg why-person-leg-left" />
              <span className="why-person-leg why-person-leg-right" />
            </div>
            <div className="why-person-reflection" />
            <div className="why-ground-line" />
          </div>

          {/* Floating pills — oval shaped like the reference */}
          {pills.map((pill, index) => (
            <motion.div
              key={pill.label}
              className="float-pill absolute"
              style={{
                left: `${pill.x}%`,
                top: `${pill.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                y: [0, -12, 0],
                rotate: [0, index % 2 === 0 ? 2 : -2, 0],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
              whileHover={{ scale: 1.15 }}
            >
              <div className="px-8 py-4 rounded-[50px] border border-white/10 bg-card/40 backdrop-blur-sm text-white text-sm font-medium tracking-[0.15em] uppercase whitespace-nowrap cursor-default hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(66,119,175,0.15)] transition-all duration-500"
                style={{
                  borderRadius: "50%/100%",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
              >
                {pill.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
