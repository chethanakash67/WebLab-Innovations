"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const roadmapPoints = [
  {
    number: "1",
    title: "Market & Psychology Expertise",
    content:
      "Have studied the market of premium and luxury brands, and can understand the customer psycology, founder's tasks in runing it and most working design pallete.",
    hasButton: false,
  },
  {
    number: "2",
    title: "Proven Reports, Guides & Audits",
    content:
      "Made multiple reports, guides and audits for brands in this market regarding design, user experience, lead capture workflow, nurturing ones, where to use AI efficiently in a business and lot more.",
    hasButton: true,
    buttonText: "Aigleon library",
    buttonHref: "/library",
  },
  {
    number: "3",
    title: "Founders as Tech & Marketing Partners",
    content:
      "Have a wonderful small team, where everyone's having a great experience in this, and we founders itself are tech and marketing guys, so you can trust us in building funnels and engines to your business.",
    hasButton: false,
  },
];

export default function WhyConsider() {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredBtnIndex, setHoveredBtnIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Animate connecting vertical progress line on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 0.5,
            },
          }
        );
      }

      // Animate each roadmap node (circle + card) on scroll
      pointsRef.current.forEach((pointEl) => {
        if (!pointEl) return;

        const circleEl = pointEl.querySelector(".roadmap-circle");
        const numberEl = pointEl.querySelector(".roadmap-number");
        const cardEl = pointEl.querySelector(".roadmap-card");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pointEl,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        });

        if (circleEl && numberEl) {
          tl.to(
            circleEl,
            {
              backgroundColor: "#36b8ff",
              borderColor: "#36b8ff",
              boxShadow: "0 0 25px rgba(54, 184, 255, 0.5)",
              duration: 0.4,
              ease: "power2.out",
            },
            0
          ).to(
            numberEl,
            {
              color: "#000000",
              fontWeight: "700",
              duration: 0.4,
              ease: "power2.out",
            },
            0
          );
        }

        if (cardEl) {
          tl.to(
            cardEl,
            {
              borderColor: "rgba(54, 184, 255, 0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              duration: 0.4,
              ease: "power2.out",
            },
            0
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <section
      ref={sectionRef}
      id="why-consider"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "56px",
        paddingBottom: "56px",
        background: "#030405",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "384px",
          height: "384px",
          backgroundColor: "rgba(54, 184, 255, 0.05)",
          borderRadius: "9999px",
          filter: "blur(120px)",
          pointerEvents: "none",
          transform: "translateY(-50%)",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingLeft: "clamp(20px, 5vw, 64px)",
          paddingRight: "clamp(20px, 5vw, 64px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "36px",
            textAlign: "left",
            maxWidth: "768px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#36b8ff",
                fontFamily: "monospace",
              }}
            >
              [ Strategic Advantage ]
            </span>
            <SectionBadge label="Why Consider Us" number="02" />
          </div>

          <h2
            className="why-consider-title"
            style={{
              fontSize: "clamp(24px, 3.5vw, 42px)",
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Why should you{" "}
            <span style={{ color: "#36b8ff" }}>consider this?</span>
          </h2>
        </div>

        {/* Vertical Roadmap Container */}
        <div
          style={{
            position: "relative",
            paddingLeft: "clamp(8px, 2vw, 24px)",
          }}
        >
          {/* Background guide line (Dark gray) */}
          <div
            style={{
              position: "absolute",
              left: "clamp(35px, 3vw + 20px, 55px)",
              top: "20px",
              bottom: "20px",
              width: "2px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            aria-hidden="true"
          />

          {/* Animated active progress line (Blue) */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              left: "clamp(35px, 3vw + 20px, 55px)",
              top: "20px",
              bottom: "20px",
              width: "2px",
              backgroundColor: "#36b8ff",
              transformOrigin: "top",
              boxShadow: "0 0 10px #36b8ff",
              transform: "scaleY(0)",
            }}
            aria-hidden="true"
          />

          {/* Roadmap Steps */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {roadmapPoints.map((item, index) => (
              <div
                key={item.number}
                ref={(el) => {
                  pointsRef.current[index] = el;
                }}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                {/* Circle Node */}
                <div
                  className="roadmap-circle"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    flexShrink: 0,
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "2px solid rgba(54, 184, 255, 0.4)",
                    backgroundColor: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <span
                    className="roadmap-number"
                    style={{
                      fontSize: "15px",
                      fontFamily: "var(--font-display), sans-serif",
                      fontWeight: 600,
                      color: "#36b8ff",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.number}
                  </span>
                </div>

                {/* Right Rectangular Box / Card */}
                <div
                  className="roadmap-card"
                  style={{
                    flex: 1,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.018)",
                    backdropFilter: "blur(12px)",
                    padding: "22px clamp(24px, 4vw, 36px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "clamp(15px, 1.6vw, 18px)",
                      fontFamily: "var(--font-display), sans-serif",
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: "8px",
                      marginTop: 0,
                      lineHeight: 1.3,
                      wordBreak: "break-word",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: "1.55",
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {item.content}
                  </p>

                  {/* Button for Point 2: Edged, 0 border radius, custom hover styling */}
                  {item.hasButton && item.buttonText && (
                    <div style={{ marginTop: "12px" }}>
                      <Link
                        href={item.buttonHref}
                        onMouseEnter={() => setHoveredBtnIndex(index)}
                        onMouseLeave={() => setHoveredBtnIndex(null)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 18px",
                          border: hoveredBtnIndex === index ? "1px solid #36b8ff" : "1px solid rgba(255, 255, 255, 0.2)",
                          backgroundColor: hoveredBtnIndex === index ? "#36b8ff" : "transparent",
                          color: hoveredBtnIndex === index ? "#000000" : "#ffffff",
                          fontFamily: "monospace",
                          fontSize: "11px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          borderRadius: "0px",
                          textDecoration: "none",
                          fontWeight: hoveredBtnIndex === index ? 700 : 500,
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                      >
                        <span>{item.buttonText}</span>
                        <ArrowUpRight
                          style={{
                            width: "13px",
                            height: "13px",
                            transition: "transform 0.3s ease",
                            transform: hoveredBtnIndex === index ? "translate(2px, -2px)" : "none",
                          }}
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
