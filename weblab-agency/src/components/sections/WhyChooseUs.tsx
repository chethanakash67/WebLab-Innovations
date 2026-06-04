"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const pills = [
  { label: "CREATIVE", x: 25, y: 28 },
  { label: "DYNAMIC", x: 62, y: 25 },
  { label: "QUALITY", x: 38, y: 55 },
  { label: "FAST DELIVERY", x: 68, y: 60 },
  { label: "SCALABLE", x: 20, y: 72 },
  { label: "CONVERSION FOCUSED", x: 55, y: 80 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
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

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
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
        <div className="relative w-full max-w-3xl mx-auto" style={{ minHeight: "420px" }}>
          {/* Large faint circle outlines */}
          <div className="absolute inset-[5%] rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[20%] rounded-full border border-white/[0.03]" />
          <div className="absolute inset-[35%] rounded-full border border-white/[0.02]" />

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h3 className="font-display font-bold text-xl md:text-2xl text-white/[0.06] tracking-[0.3em] uppercase">
              WHY WEBLAB
            </h3>
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
