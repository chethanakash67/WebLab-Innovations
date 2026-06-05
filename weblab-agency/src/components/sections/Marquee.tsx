"use client";

import { technologies } from "@/data/projects";

export default function Marquee() {
  // Triple the items for seamless loop
  const tripled = [...technologies, ...technologies, ...technologies];

  return (
    <section className="marquee-section relative overflow-hidden border-y border-white/[0.08] py-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-l from-background via-background/80 to-transparent" />

      {/* Small label */}
      <div className="marquee-label max-w-7xl mx-auto px-8 mb-6">
        <p className="text-[10px] text-muted-dark tracking-[0.3em] uppercase">
          Join over 10K+ business using WebLab.
        </p>
      </div>

      <div
        className="marquee-track flex gap-5 animate-marquee hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}
      >
        {tripled.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="marquee-pill flex h-20 w-64 flex-shrink-0 cursor-default items-center justify-center gap-2.5 rounded-full border border-white/15 bg-black/30 px-7 text-sm font-semibold tracking-wide text-white/70 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-primary/5 hover:text-white"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light/50" />
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
