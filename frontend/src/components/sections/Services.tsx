"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/projects";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-display-line", {
        yPercent: 100,
        
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".service-display",
          start: "top 78%",
        },
      });

      gsap.from(".service-row", {
        y: 40,
        
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-padding service-section">
      <div className="mx-auto max-w-[1500px]">
        <div className="section-meta-row">
          <span>[ Full-stack product studio ]</span>
          <SectionBadge label="Services" number="02" />
          <span>[ Fully Crafted with intent ]</span>
        </div>

        <div className="service-display" aria-label="Digital product services">
          <span className="service-ghost service-ghost-top">Services &</span>
          <div className="overflow-hidden">
            <span className="service-display-line service-index">[02]</span>
            <h2 className="service-display-line">What</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="service-display-line service-display-accent">
              We offer.
            </h2>
          </div>
          <span className="service-ghost service-ghost-bottom">Systems</span>
        </div>

        <div className="services-list">
          {services.slice(0, 3).map((service, index) => (
            <a key={service.id} href="#contact" className="service-row group">
              <span className="service-row-number">0{index + 1}</span>
              <h3>
                {service.title}
                {service.comingSoon && (
                  <span className="service-badge service-badge-soon">Coming Soon</span>
                )}
                {service.bonus && (
                  <span className="service-badge service-badge-bonus">Bonus</span>
                )}
              </h3>
              <div>
                <p>{service.description}</p>
                {service.note && (
                  <p className="service-note">{service.note}</p>
                )}
              </div>
              <span className="service-row-arrow">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </a>
          ))}
        </div>

        <div className="services-more-cta" style={{ display: "flex", gap: "24px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/services" className="button button-muted group">
            Explore All Services
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
          <Link href="/pricing" className="button button-muted group">
            Find the Suitable Package.
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>

        <div className="services-additional-note">
          <p>
            <span>* Other AI Systems:</span> According to the brand's requirement or request, we also build Agentic AI systems for company's internal work. This can be anything asked by the brand if very important or they need it at any cost, we'll then do at a custom price.
          </p>
        </div>
      </div>
    </section>
  );
}

