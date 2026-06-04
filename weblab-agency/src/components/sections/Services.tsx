"use client";

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
        opacity: 0,
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
        opacity: 0,
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
          <span>[ Crafted with intent ]</span>
        </div>

        <div className="service-display" aria-label="Digital product services">
          <span className="service-ghost service-ghost-top">MOTION</span>
          <div className="overflow-hidden">
            <span className="service-display-line service-index">[02]</span>
            <h2 className="service-display-line">Digital</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="service-display-line service-display-accent">
              Products
            </h2>
          </div>
          <span className="service-ghost service-ghost-bottom">SYSTEMS</span>
        </div>

        <div className="services-list">
          {services.map((service, index) => (
            <a key={service.id} href="#contact" className="service-row group">
              <span className="service-row-number">0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-row-arrow">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
