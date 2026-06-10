"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

type ReactiveGlowOptions = {
  restingX?: number;
  restingY?: number;
};

export function useReactiveGlow<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  { restingX = 52, restingY = 46 }: ReactiveGlowOptions = {}
) {
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      element.style.setProperty("--glow-x", `${restingX}%`);
      element.style.setProperty("--glow-y", `${restingY}%`);
      return;
    }

    let frame = 0;

    const writeGlowPosition = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty("--glow-x", `${x}%`);
        element.style.setProperty("--glow-y", `${y}%`);
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      writeGlowPosition(
        Math.min(88, Math.max(12, x)),
        Math.min(82, Math.max(14, y))
      );
    };

    const handlePointerLeave = () => {
      writeGlowPosition(restingX, restingY);
    };

    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [restingX, restingY, targetRef]);
}
