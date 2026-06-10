"use client";

import { useEffect, useRef } from "react";

export default function MouseFollowLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lightRef.current) return;
      lightRef.current.style.left = `${e.clientX}px`;
      lightRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={lightRef}
      className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      style={{
        width: "600px",
        height: "600px",
        background:
          "radial-gradient(circle, rgba(66, 119, 175, 0.08) 0%, rgba(92, 164, 245, 0.03) 30%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}
