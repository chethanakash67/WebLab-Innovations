"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { founders } from "@/data/projects";
import SectionBadge from "@/components/ui/SectionBadge";

function InstagramIcon({ className = "h-3.5 w-3.5 text-[#36b8ff]" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

export default function Founders() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-title-line", {
        x: -80,
        
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      gsap.from(".team-member-row", {
        y: 48,
        
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-list", start: "top 78%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" className="section-padding team-section">
      <div className="team-watermark">TEAM</div>
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="team-heading">
          <SectionBadge label="Founders" number="09" />
          <div className="overflow-hidden">
            <h2
              className="team-title-line font-display text-white"
              style={{
                fontWeight: 400,
                fontSize: "clamp(2rem, 3.8vw, 4.5rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.07em",
                marginBottom: "4px"
              }}
            >
              A
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="team-title-line font-display text-primary-light"
              style={{
                fontWeight: 400,
                fontSize: "clamp(3.2rem, 7.8vw, 9.2rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.08em"
              }}
            >
              Team of Two
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="team-title-line font-display text-white"
              style={{
                fontWeight: 400,
                fontSize: "clamp(3.2rem, 7.8vw, 9.2rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.08em"
              }}
            >
              Started This.
            </h2>
          </div>
          <p>
            Two disciplines, one standard: make the work clear, memorable, and
            useful.
          </p>
        </div>

        <div className="team-list">
          {founders.map((founder, index) => (
            <article key={founder.id} className="team-member-row group">
              <a
                href={founder.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="team-member-profile"
                aria-label={`View ${founder.name}'s portfolio`}
              >
                <div className="team-member-index">0{index + 1}</div>
                <div className="team-member-image">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="180px"
                  />
                </div>
                <div className="team-member-info">
                  <span>[ Founder / Portfolio ]</span>
                  <h3>{founder.name}</h3>
                  <p>{founder.role}</p>
                  <span className="team-portfolio-hint">
                    View portfolio
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "nowrap" }}>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-member-link"
                  aria-label={`${founder.name} LinkedIn profile`}
                  style={{
                    height: "36px",
                    minHeight: "36px",
                    padding: "0 10px",
                    fontSize: "11px",
                    whiteSpace: "nowrap"
                  }}
                >
                  <span className="team-linkedin-mark">in</span>
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                {founder.instagram ? (
                  <a
                    href={founder.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-member-link"
                    aria-label={`${founder.name} Instagram profile`}
                    style={{
                      height: "36px",
                      minHeight: "36px",
                      padding: "0 10px",
                      fontSize: "11px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <InstagramIcon className="h-3.5 w-3.5 text-[#36b8ff]" />
                    <span>Instagram</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
