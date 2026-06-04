"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AgencyMark from "@/components/ui/AgencyMark";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const modes = ["Bespoke", "The dynamic", "Exposition", "Drilling"];

export default function Playground() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".playground-art", {
        clipPath: "inset(15% 15% 15% 15% round 32px)",
        scale: 0.92,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".playground-mode", {
        x: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".playground-modes",
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="playground-section">
      <div className="playground-topline">
        <SectionBadge label="Playground" number="08" />
        <h2>
          WebLab&apos;s
          <br />
          <span>playground</span>
        </h2>
      </div>

      <div className="playground-art">
        <Image
          src="/art/robot-hands-hero.png"
          alt="Two chrome robotic hands reaching toward the WebLab mark"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="playground-shade" />
        <AgencyMark className="playground-mark" />

        <p className="playground-note">
          / Our work shows
          <br />
          what we do before we say it.
        </p>

        <div className="playground-modes">
          {modes.map((mode, index) => (
            <span
              key={mode}
              className={`playground-mode ${index === 0 ? "active" : ""}`}
            >
              {mode}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
