"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import SectionBadge from "@/components/ui/SectionBadge";
import "@/app/bento.css";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projects = sectionRef.current?.querySelectorAll(".project-editorial");

      projects?.forEach((project) => {
        gsap.from(project.querySelector(".project-image-card"), {
          y: 80,
          rotate: 2,
          
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: project, start: "top 72%" },
        });

        gsap.from(project.querySelectorAll(".project-reveal"), {
          y: 36,
          
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: project, start: "top 70%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="section-padding work-section">
      <div className="mx-auto max-w-[1500px]">
        <div className="work-heading">
          <div>
            <SectionBadge label="Selected Projects" number="03" />
            <h2>
              Work made to
              <br />
              <span>move people.</span>
            </h2>
          </div>
          <p>
            Strategy, identity, interface, and code working as one connected
            system.
          </p>
        </div>

        <div className="project-stack">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <article
                key={project.id}
                className={`project-editorial ${index % 2 ? "project-editorial-reverse" : ""}`}
              >
                <div className="project-gradient-panel">
                  <span className="project-reveal project-panel-title">
                    {project.title}
                  </span>
                  <p className="project-reveal project-desc-expanded">{project.description}</p>
                </div>
                {project.clientTestimonial && (
                  <div className="project-testimonial-overlap project-reveal">
                    <div className="quote-icon">&quot;</div>
                    <p className="quote-text">&quot;{project.clientTestimonial.quote}&quot;</p>
                    <div className="quote-author">
                      <strong>{project.clientTestimonial.author}</strong>
                      <span>{project.clientTestimonial.role}</span>
                    </div>
                  </div>
                )}

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-image-card group"
                  aria-label={`View ${project.title}`}
                >
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.035]"
                    sizes="(max-width: 768px) 100vw, 65vw"
                  />
                  <span className="project-image-shade" />
                  <span className="project-open">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </a>

                <div className="project-reveal project-caption">
                  <span>{project.type}</span>
                  <h3>
                    {project.title}
                    <sup>[{project.number}]</sup>
                  </h3>
                </div>

                <div className="project-reveal project-meta">
                  <span>Project Type: {project.type}</span>
                  <span>Date: 2026</span>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
