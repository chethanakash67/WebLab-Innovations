"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/data/projects";
import SectionBadge from "@/components/ui/SectionBadge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      const heading = sectionRef.current?.querySelector(".achievements-heading");
      if (heading) {
        gsap.from(heading, {
          y: 80,
          
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Stats stagger
      const items = sectionRef.current?.querySelectorAll(".stat-item");
      if (items) {
        gsap.set(items, { y: 50, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector(".stats-grid"),
            start: "top 80%",
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
      id="achievements"
      className="achievements-section relative section-padding overflow-hidden"
    >
      {/* Dotted world map background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto">
        <div className="achievements-meta text-center mb-8">
          <SectionBadge label="Statistics" number="05" />
          <p className="text-muted text-xs tracking-[0.3em] uppercase">
            We have significant growth through the years
          </p>
        </div>

        {/* Heading */}
        <div className="achievements-heading text-center mb-10">
          <h2 className="font-display font-bold tracking-tight leading-[1.0]" style={{ fontSize: "clamp(32px, 5.5vw, 72px)" }}>
            Built For{" "}
            <span className="gradient-text">Measurable Impact</span>
          </h2>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="stats-2x2-grid grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-xl md:max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card-item flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8 rounded-2xl bg-white/[0.025] border border-white/10 backdrop-blur-md hover:border-[#36b8ff]/40 transition-all duration-300 shadow-lg"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="stat-counter font-display font-bold gradient-text block"
                style={{ fontSize: "clamp(26px, 5vw, 42px)", lineHeight: 1.1 }}
                duration={2 + index * 0.2}
              />

              <div className="w-8 h-[2px] bg-gradient-to-r from-primary to-primary-light my-3 opacity-60" />

              <p className="text-muted text-xs sm:text-sm font-medium leading-normal tracking-wide m-0">
                <span className="hidden sm:inline">{stat.label}</span>
                <span className="inline sm:hidden">{stat.shortLabel || stat.label}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
