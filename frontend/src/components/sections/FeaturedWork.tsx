"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Download, ExternalLink } from "lucide-react";
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

      const auditCard = sectionRef.current?.querySelector(".audit-card");
      if (auditCard) {
        gsap.from(auditCard, {
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: auditCard, start: "top 78%" },
        });
      }
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
                  {project.id === "tabun-chai" ? (
                    <div
                      className="project-reveal"
                      style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "12px",
                        width: "100%",
                        marginTop: "22px",
                        textAlign: "right",
                      }}
                    >
                      <Link
                        href="/tabun-chai"
                        style={{
                          display: "inline-flex",
                          minHeight: "48px",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "12px",
                          borderRadius: "999px",
                          padding: "0 22px",
                          fontSize: "12px",
                          fontWeight: 600,
                          border: "1px solid rgba(255, 255, 255, 0.14)",
                          background: "rgba(255, 255, 255, 0.08)",
                          color: "rgba(255, 255, 255, 0.84)",
                          backdropFilter: "blur(14px)",
                          WebkitBackdropFilter: "blur(14px)",
                          transition: "border-color 300ms ease, background 300ms ease, box-shadow 300ms ease, color 300ms ease, transform 300ms ease",
                          textDecoration: "none",
                          alignSelf: "flex-end",
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.borderColor = "#000";
                          event.currentTarget.style.background = "rgba(255, 255, 255, 0.92)";
                          event.currentTarget.style.color = "#000";
                          event.currentTarget.style.boxShadow = "0 0 18px rgba(0, 0, 0, 0.18)";
                          event.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.14)";
                          event.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          event.currentTarget.style.color = "rgba(255, 255, 255, 0.84)";
                          event.currentTarget.style.boxShadow = "none";
                          event.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        View case study
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <p className="project-reveal project-desc-expanded">{project.description}</p>
                    </div>
                  ) : (
                    <p className="project-reveal project-desc-expanded">{project.description}</p>
                  )}
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

        <section className="audit-section" style={{ marginTop: "112px", paddingTop: "64px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between" style={{ marginBottom: "40px" }}>
            <div>
              <SectionBadge label="Free Audit Samples" number="04" />
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[#f4ebd9] md:text-5xl" style={{ fontFamily: "var(--font-display)", marginTop: "20px" }}>
                Sample free audits done for coffee roasters
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#f4ebd9]/70 md:text-base" style={{ lineHeight: "1.8" }}>
              A preview of the visibility and conversion audits we deliver for specialty coffee brands, covering AI search, local search, UX, and technical SEO gaps.
            </p>
          </div>

          <article className="audit-card relative overflow-hidden rounded-[2rem] border border-[#e6a15c]/15 bg-[#11151a]/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-8" style={{ marginTop: "16px", padding: "32px" }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,161,92,0.12),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_38%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-5">
                <div
                  className="inline-flex items-center rounded-full border border-[#e6a15c]/20 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#e6a15c]"
                  style={{
                    letterSpacing: "0.28em",
                    lineHeight: "1",
                    marginTop: "4px",
                    marginBottom: "22px",
                    animation: "auditBadgeGlow 5.5s ease-in-out infinite",
                    boxShadow: "0 0 10px rgba(230, 161, 92, 0.12), inset 0 0 0 1px rgba(230, 161, 92, 0.12)",
                  }}
                >
                  Audit 1
                </div>
                <h3 className="text-2xl font-semibold text-[#f4ebd9] md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                  Brand Visibility and Conversion Audit
                </h3>
                <p className="max-w-2xl text-sm leading-7 text-[#f4ebd9]/75 md:text-base">
                  A sample audit snapshot for coffee roasters, showing where visibility is being lost, which local and AI search gaps matter most, and what conversion issues should be fixed first.
                </p>
                <div className="flex flex-nowrap gap-3 overflow-x-auto text-[10px] uppercase tracking-[0.18em] text-[#f4ebd9]/55" style={{ gap: "10px", lineHeight: "1.35", marginTop: "18px", paddingBottom: "8px", paddingRight: "6px" }}>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-3 py-2" style={{ lineHeight: "1.35", paddingLeft: "14px", paddingRight: "14px" }}>AI search visibility</span>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-3 py-2" style={{ lineHeight: "1.35", paddingLeft: "14px", paddingRight: "14px" }}>Local SEO</span>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-3 py-2" style={{ lineHeight: "1.35", paddingLeft: "14px", paddingRight: "14px" }}>UX + conversion</span>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-3 py-2" style={{ lineHeight: "1.35", paddingLeft: "14px", paddingRight: "14px" }}>Technical SEO</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <a
                  href="/case%20study%20audit.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    minHeight: "48px",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    borderRadius: "999px",
                    padding: "0 22px",
                    fontSize: "12px",
                    fontWeight: 600,
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "rgba(255, 255, 255, 0.84)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    transition: "border-color 300ms ease, background 300ms ease, box-shadow 300ms ease, color 300ms ease, transform 300ms ease",
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  Open PDF
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="/case%20study%20audit.pdf"
                  download="sample-free-audit-coffee-roasters.pdf"
                  style={{
                    display: "inline-flex",
                    minHeight: "48px",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    borderRadius: "999px",
                    padding: "0 22px",
                    fontSize: "12px",
                    fontWeight: 600,
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "rgba(255, 255, 255, 0.84)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    transition: "border-color 300ms ease, background 300ms ease, box-shadow 300ms ease, color 300ms ease, transform 300ms ease",
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  Download PDF
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        </section>

        <style>{`
          @keyframes auditBadgeGlow {
            0%, 100% {
              box-shadow:
                0 0 10px rgba(230, 161, 92, 0.12),
                0 0 22px rgba(230, 161, 92, 0.06);
              transform: translateY(0);
            }
            50% {
              box-shadow:
                0 0 16px rgba(230, 161, 92, 0.28),
                0 0 34px rgba(230, 161, 92, 0.14);
              transform: translateY(-1px);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
