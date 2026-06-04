"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  splitBy?: "words" | "chars" | "lines";
}

export default function RevealText({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = 0.05,
  splitBy = "words",
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".reveal-item");

    gsap.set(elements, { y: 60, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none none",
      },
    });

    tl.to(elements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [delay, stagger]);

  const splitContent = () => {
    if (splitBy === "chars") {
      return children.split("").map((char, i) => (
        <span key={i} className="reveal-item inline-block" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
          {char}
        </span>
      ));
    }
    if (splitBy === "words") {
      return children.split(" ").map((word, i) => (
        <span key={i} className="reveal-item inline-block mr-[0.3em]">
          {word}
        </span>
      ));
    }
    return <span className="reveal-item block">{children}</span>;
  };

  return (
    <Tag ref={containerRef as React.RefObject<HTMLElement & HTMLDivElement>} className={`overflow-hidden ${className}`}>
      {splitContent()}
    </Tag>
  );
}
