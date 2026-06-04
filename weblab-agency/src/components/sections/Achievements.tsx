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
          opacity: 0,
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
      className="relative section-padding overflow-hidden"
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

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <SectionBadge label="Statistics" number="05" />
          <p className="text-muted text-xs tracking-[0.3em] uppercase">
            We have significant growth through the years
          </p>
        </div>

        {/* Heading */}
        <div className="achievements-heading text-center mb-24">
          <h2 className="font-display font-bold tracking-tight leading-[0.9]" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
            Built For
            <br />
            <span className="gradient-text">Measurable Impact</span>
          </h2>
        </div>

        {/* Stats Grid — staggered layout like the reference */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 lg:gap-x-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              style={{ marginTop: index % 2 === 1 ? "60px" : "0" }}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display font-bold gradient-text block"
                style={{ fontSize: "clamp(56px, 7vw, 100px)" }}
                duration={2 + index * 0.3}
              />
              <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-primary-light mt-4 mb-4" />
              <p className="text-muted text-sm leading-relaxed max-w-[180px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
