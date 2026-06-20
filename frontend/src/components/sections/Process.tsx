"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Eye, 
  Map, 
  Layers, 
  Palette, 
  Code, 
  FileText, 
  Cpu, 
  Zap 
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/projects";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-reveal", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".roadmap-step-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".roadmap-snake-container",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="process-section">
      <div className="process-grid-background" />
      <div className="process-wrap">
        <header className="process-header">
          <div className="process-reveal">
            <SectionBadge label="Our Process" number="10" />
          </div>
          <p className="process-reveal">
            [ One clear route ]
            <br />
            No mystery. No disappearing act.
          </p>
        </header>

        <div className="process-heading process-reveal">
          <h2>
            From first thought
            <br />
            <span>to live product.</span>
          </h2>
          <p>
            A practical eight-phase system built to keep decisions clear,
            momentum visible, and quality high.
          </p>
        </div>

        <div className="roadmap-snake-container">
          <div className="roadmap-snake-grid">
            {/* Step 1 */}
            <div className="roadmap-step-card" style={{ gridRow: 1, gridColumn: 1 }}>
              <div className="roadmap-icon-wrap">
                <svg className="roadmap-icon-svg" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="roadmap-shine-grad-1" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#36b8ff" stopOpacity="1" />
                      <stop offset="30%" stopColor="#0088ff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#002244" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" className="roadmap-circle-base" fill="#030405" />
                  <g className="roadmap-crystal-dot">
                    <path d="M 4 50 A 46 46 0 0 1 50 4" fill="none" stroke="url(#roadmap-shine-grad-1)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="roadmap-icon-inner">
                  <Eye size={28} strokeWidth={2} />
                </div>
              </div>
              <div className="roadmap-step-label">
                <span className="roadmap-step-number">PHASE 01</span>
                <h3>{processSteps[0].title}</h3>
              </div>
              <div className="roadmap-step-popup">
                <p>{processSteps[0].description}</p>
              </div>
            </div>

            {/* Connector 1-2 — tail moves left → right */}
            <div className="roadmap-connector-wrap" style={{ gridRow: 1, gridColumn: 2, alignSelf: "start" }}>
              <svg className="roadmap-connector-svg" style={{ overflow: "visible", position: "absolute", left: "-4px", width: "calc(100% + 8px)", top: "50%", marginTop: "-2px", height: "4px" }}>
                <line x1="0" y1="2" x2="100%" y2="2" stroke="white" strokeWidth="1.5" strokeOpacity="0.12" />
                <line pathLength="100" x1="0" y1="2" x2="100%" y2="2" stroke="#36b8ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 110">
                  <animate attributeName="stroke-dashoffset" from="20" to="-110" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Step 2 */}
            <div className="roadmap-step-card" style={{ gridRow: 1, gridColumn: 3 }}>
              <div className="roadmap-icon-wrap">
                <svg className="roadmap-icon-svg" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="roadmap-shine-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#36b8ff" stopOpacity="1" />
                      <stop offset="30%" stopColor="#0088ff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#002244" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" className="roadmap-circle-base" fill="#030405" />
                  <g className="roadmap-crystal-dot">
                    <path d="M 4 50 A 46 46 0 0 1 50 4" fill="none" stroke="url(#roadmap-shine-grad-2)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="roadmap-icon-inner">
                  <Map size={28} strokeWidth={2} />
                </div>
              </div>
              <div className="roadmap-step-label">
                <span className="roadmap-step-number">PHASE 02</span>
                <h3>{processSteps[1].title}</h3>
              </div>
              <div className="roadmap-step-popup">
                <p>{processSteps[1].description}</p>
              </div>
            </div>

            {/* Connector 2-3 — tail moves left → right */}
            <div className="roadmap-connector-wrap" style={{ gridRow: 1, gridColumn: 4, alignSelf: "start" }}>
              <svg className="roadmap-connector-svg" style={{ overflow: "visible", position: "absolute", left: "-4px", width: "calc(100% + 8px)", top: "50%", marginTop: "-2px", height: "4px" }}>
                <line x1="0" y1="2" x2="100%" y2="2" stroke="white" strokeWidth="1.5" strokeOpacity="0.12" />
                <line pathLength="100" x1="0" y1="2" x2="100%" y2="2" stroke="#36b8ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 110">
                  <animate attributeName="stroke-dashoffset" from="20" to="-110" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Step 3 */}
            <div className="roadmap-step-card" style={{ gridRow: 1, gridColumn: 5 }}>
              <div className="roadmap-icon-wrap">
                <svg className="roadmap-icon-svg" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="roadmap-shine-grad-3" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#36b8ff" stopOpacity="1" />
                      <stop offset="30%" stopColor="#0088ff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#002244" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" className="roadmap-circle-base" fill="#030405" />
                  <g className="roadmap-crystal-dot">
                    <path d="M 4 50 A 46 46 0 0 1 50 4" fill="none" stroke="url(#roadmap-shine-grad-3)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="roadmap-icon-inner">
                  <Layers size={28} strokeWidth={2} />
                </div>
              </div>
              <div className="roadmap-step-label">
                <span className="roadmap-step-number">PHASE 03</span>
                <h3>{processSteps[2].title}</h3>
              </div>
              <div className="roadmap-step-popup">
                <p>{processSteps[2].description}</p>
              </div>
            </div>

            {/* Connector 3-4 — tail moves left → right */}
            <div className="roadmap-connector-wrap" style={{ gridRow: 1, gridColumn: 6, alignSelf: "start" }}>
              <svg className="roadmap-connector-svg" style={{ overflow: "visible", position: "absolute", left: "-4px", width: "calc(100% + 8px)", top: "50%", marginTop: "-2px", height: "4px" }}>
                <line x1="0" y1="2" x2="100%" y2="2" stroke="white" strokeWidth="1.5" strokeOpacity="0.12" />
                <line pathLength="100" x1="0" y1="2" x2="100%" y2="2" stroke="#36b8ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 110">
                  <animate attributeName="stroke-dashoffset" from="20" to="-110" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Step 4 */}
            <div className="roadmap-step-card" style={{ gridRow: 1, gridColumn: 7 }}>
              <div className="roadmap-icon-wrap">
                <svg className="roadmap-icon-svg" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="roadmap-shine-grad-4" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#36b8ff" stopOpacity="1" />
                      <stop offset="30%" stopColor="#0088ff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#002244" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" className="roadmap-circle-base" fill="#030405" />
                  <g className="roadmap-crystal-dot">
                    <path d="M 4 50 A 46 46 0 0 1 50 4" fill="none" stroke="url(#roadmap-shine-grad-4)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="roadmap-icon-inner">
                  <Palette size={28} strokeWidth={2} />
                </div>
              </div>
              <div className="roadmap-step-label">
                <span className="roadmap-step-number">PHASE 04</span>
                <h3>{processSteps[3].title}</h3>
              </div>
              <div className="roadmap-step-popup">
                <p>{processSteps[3].description}</p>
              </div>
            </div>

            {/* Vertical Connector 4-5 — tail moves top → bottom */}
            <div className="roadmap-vertical-connector" style={{ gridRow: 2, gridColumn: 7, alignSelf: "stretch", position: "relative" }}>
              <svg className="roadmap-vertical-connector-svg" style={{ overflow: "visible", position: "absolute", top: "-4px", height: "calc(100% + 8px)", left: "50%", marginLeft: "-10px", width: "20px" }}>
                <line x1="10" y1="0" x2="10" y2="100%" stroke="white" strokeWidth="1.5" strokeOpacity="0.12" />
                <line pathLength="100" x1="10" y1="0" x2="10" y2="100%" stroke="#36b8ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 110">
                  <animate attributeName="stroke-dashoffset" from="20" to="-110" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Step 5 */}
            <div className="roadmap-step-card" style={{ gridRow: 3, gridColumn: 7 }}>
              <div className="roadmap-icon-wrap">
                <svg className="roadmap-icon-svg" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="roadmap-shine-grad-5" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#36b8ff" stopOpacity="1" />
                      <stop offset="30%" stopColor="#0088ff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#002244" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" className="roadmap-circle-base" fill="#030405" />
                  <g className="roadmap-crystal-dot">
                    <path d="M 4 50 A 46 46 0 0 1 50 4" fill="none" stroke="url(#roadmap-shine-grad-5)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="roadmap-icon-inner">
                  <Code size={28} strokeWidth={2} />
                </div>
              </div>
              <div className="roadmap-step-label">
                <span className="roadmap-step-number">PHASE 05</span>
                <h3>{processSteps[4].title}</h3>
              </div>
              <div className="roadmap-step-popup">
                <p>{processSteps[4].description}</p>
              </div>
            </div>

            {/* Connector 5-6 — tail moves right → left */}
            <div className="roadmap-connector-wrap" style={{ gridRow: 3, gridColumn: 6, alignSelf: "start" }}>
              <svg className="roadmap-connector-svg" style={{ overflow: "visible", position: "absolute", left: "-4px", width: "calc(100% + 8px)", top: "50%", marginTop: "-2px", height: "4px" }}>
                <line x1="0" y1="2" x2="100%" y2="2" stroke="white" strokeWidth="1.5" strokeOpacity="0.12" />
                <line pathLength="100" x1="0" y1="2" x2="100%" y2="2" stroke="#36b8ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 110">
                  <animate attributeName="stroke-dashoffset" from="-110" to="20" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Step 6 */}
            <div className="roadmap-step-card" style={{ gridRow: 3, gridColumn: 5 }}>
              <div className="roadmap-icon-wrap">
                <svg className="roadmap-icon-svg" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="roadmap-shine-grad-6" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#36b8ff" stopOpacity="1" />
                      <stop offset="30%" stopColor="#0088ff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#002244" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" className="roadmap-circle-base" fill="#030405" />
                  <g className="roadmap-crystal-dot">
                    <path d="M 4 50 A 46 46 0 0 1 50 4" fill="none" stroke="url(#roadmap-shine-grad-6)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="roadmap-icon-inner">
                  <FileText size={28} strokeWidth={2} />
                </div>
              </div>
              <div className="roadmap-step-label">
                <span className="roadmap-step-number">PHASE 06</span>
                <h3>{processSteps[5].title}</h3>
              </div>
              <div className="roadmap-step-popup">
                <p>{processSteps[5].description}</p>
              </div>
            </div>

            {/* Connector 6-7 — tail moves right → left */}
            <div className="roadmap-connector-wrap" style={{ gridRow: 3, gridColumn: 4, alignSelf: "start" }}>
              <svg className="roadmap-connector-svg" style={{ overflow: "visible", position: "absolute", left: "-4px", width: "calc(100% + 8px)", top: "50%", marginTop: "-2px", height: "4px" }}>
                <line x1="0" y1="2" x2="100%" y2="2" stroke="white" strokeWidth="1.5" strokeOpacity="0.12" />
                <line pathLength="100" x1="0" y1="2" x2="100%" y2="2" stroke="#36b8ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 110">
                  <animate attributeName="stroke-dashoffset" from="-110" to="20" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Step 7 */}
            <div className="roadmap-step-card" style={{ gridRow: 3, gridColumn: 3 }}>
              <div className="roadmap-icon-wrap">
                <svg className="roadmap-icon-svg" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="roadmap-shine-grad-7" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#36b8ff" stopOpacity="1" />
                      <stop offset="30%" stopColor="#0088ff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#002244" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" className="roadmap-circle-base" fill="#030405" />
                  <g className="roadmap-crystal-dot">
                    <path d="M 4 50 A 46 46 0 0 1 50 4" fill="none" stroke="url(#roadmap-shine-grad-7)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="roadmap-icon-inner">
                  <Cpu size={28} strokeWidth={2} />
                </div>
              </div>
              <div className="roadmap-step-label">
                <span className="roadmap-step-number">PHASE 07</span>
                <h3>{processSteps[6].title}</h3>
              </div>
              <div className="roadmap-step-popup">
                <p>{processSteps[6].description}</p>
              </div>
            </div>

            {/* Connector 7-8 — tail moves right → left */}
            <div className="roadmap-connector-wrap" style={{ gridRow: 3, gridColumn: 2, alignSelf: "start" }}>
              <svg className="roadmap-connector-svg" style={{ overflow: "visible", position: "absolute", left: "-4px", width: "calc(100% + 8px)", top: "50%", marginTop: "-2px", height: "4px" }}>
                <line x1="0" y1="2" x2="100%" y2="2" stroke="white" strokeWidth="1.5" strokeOpacity="0.12" />
                <line pathLength="100" x1="0" y1="2" x2="100%" y2="2" stroke="#36b8ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 110">
                  <animate attributeName="stroke-dashoffset" from="-110" to="20" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Step 8 */}
            <div className="roadmap-step-card" style={{ gridRow: 3, gridColumn: 1 }}>
              <div className="roadmap-icon-wrap">
                <svg className="roadmap-icon-svg" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="roadmap-shine-grad-8" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#36b8ff" stopOpacity="1" />
                      <stop offset="30%" stopColor="#0088ff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#002244" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" className="roadmap-circle-base" fill="#030405" />
                  <g className="roadmap-crystal-dot">
                    <path d="M 4 50 A 46 46 0 0 1 50 4" fill="none" stroke="url(#roadmap-shine-grad-8)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="roadmap-icon-inner">
                  <Zap size={28} strokeWidth={2} />
                </div>
              </div>
              <div className="roadmap-step-label">
                <span className="roadmap-step-number">PHASE 08</span>
                <h3>{processSteps[7].title}</h3>
              </div>
              <div className="roadmap-step-popup">
                <p>{processSteps[7].description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="process-more-cta">
          <Link href="/process" className="button button-muted group">
            Know in detail
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}
