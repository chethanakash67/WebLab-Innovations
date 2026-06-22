"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { founders } from "@/data/projects";
import SectionBadge from "@/components/ui/SectionBadge";

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
          <SectionBadge label="Team Members" number="09" />
          <div className="overflow-hidden">
            <h2 className="team-title-line">Creative</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="team-title-line text-primary-light">Team</h2>
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
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              className="team-member-link"
              aria-label={`${founder.name} LinkedIn profile`}
            >
                <span className="team-linkedin-mark">in</span>
                <span>LinkedIn</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
