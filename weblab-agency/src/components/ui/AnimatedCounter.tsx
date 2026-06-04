"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  style,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el || hasAnimated) return;

    const counter = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated) return;
        setHasAnimated(true);

        gsap.to(counter, {
          val: value,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            if (el) {
              el.textContent = `${prefix}${Math.round(counter.val)}${suffix}`;
            }
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value, suffix, prefix, duration, hasAnimated]);

  return (
    <span ref={counterRef} className={className} style={style}>
      {prefix}0{suffix}
    </span>
  );
}
