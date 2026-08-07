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
                className="project-editorial"
              >
                {/* Title at top of project section */}
                <div className="project-top-header project-reveal">
                  <div className="project-title-wrap">
                    <span className="project-num">[{project.number}]</span>
                    <h3 className="project-title-top">{project.title}</h3>
                  </div>
                  <span className="project-type-badge">{project.type}</span>
                </div>

                <div className="project-content-grid">
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
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <span className="project-image-shade" />
                    <span className="project-open">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>

                  <div className="project-desc-col">
                    <div className="project-gradient-panel">
                      <div className="project-desc-wrapper project-reveal">
                        <p className="project-desc-text">{project.description}</p>
                        {project.id === "tabun-chai" && (
                          <Link
                            href="/tabun-chai"
                            className="project-case-study-btn"
                          >
                            View case study
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>

                    {project.clientTestimonial && (
                      <div className="project-testimonial-floating project-reveal">
                        <div className="quote-icon">&quot;</div>
                        <p className="quote-text">&quot;{project.clientTestimonial.quote}&quot;</p>
                        <div className="quote-author">
                          <strong>{project.clientTestimonial.author}</strong>
                          <span>{project.clientTestimonial.role}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
        </div>

        {/* Explore Our Tech Products Callout (Above Sample Audits) */}
        <section style={{ marginTop: "64px", marginBottom: "20px" }}>
          <div
            style={{
              position: "relative",
              backgroundColor: "#0b0d0f",
              border: "1px solid rgba(54, 184, 255, 0.3)",
              borderRadius: "20px",
              padding: "32px clamp(20px, 4vw, 40px)",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            className="md:flex-row md:items-center md:justify-between"
          >
            {/* Background Radial Lighting */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "350px",
                height: "350px",
                background: "radial-gradient(circle at top right, rgba(54, 184, 255, 0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
              <SectionBadge label="Venture Lab" number="03.B" />
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginTop: "12px",
                  marginBottom: "8px",
                  lineHeight: 1.2,
                }}
              >
                Explore our <span style={{ color: "#36b8ff" }}>tech products</span>
              </h3>
              <p
                style={{
                  fontSize: "14.5px",
                  color: "#9ca3aa",
                  maxWidth: "600px",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Apart from our client services, we build and launch proprietary tech products as an in-house venture lab.
              </p>
            </div>

            <Link
              href="/products"
              style={{
                position: "relative",
                zIndex: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                backgroundColor: "#36b8ff",
                color: "#020303",
                fontWeight: 700,
                borderRadius: "12px",
                fontSize: "14px",
                textDecoration: "none",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                alignSelf: "flex-start",
              }}
              className="hover:scale-[1.03] md:self-center"
            >
              Explore Tech Products
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="audit-section" style={{ marginTop: "40px", paddingTop: "36px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
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

          <article className="audit-card relative overflow-hidden rounded-[1.5rem] border border-[#e6a15c]/15 bg-[#11151a]/90 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:rounded-[2rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,161,92,0.12),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_38%)]" />
            <div className="relative flex flex-col gap-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-3.5 sm:space-y-5">
                <div
                  className="inline-flex items-center rounded-full border border-[#e6a15c]/20 bg-white/5 px-3.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#e6a15c] sm:text-xs"
                  style={{
                    letterSpacing: "0.22em",
                    lineHeight: "1",
                    marginTop: "2px",
                    marginBottom: "10px",
                    animation: "auditBadgeGlow 5.5s ease-in-out infinite",
                    boxShadow: "0 0 10px rgba(230, 161, 92, 0.12), inset 0 0 0 1px rgba(230, 161, 92, 0.12)",
                  }}
                >
                  Audit 1
                </div>
                <h3 className="break-words font-semibold text-[#f4ebd9]" style={{ fontFamily: "var(--font-display)" }}>
                  Brand Visibility and Conversion Audit
                </h3>
                <p className="break-words text-[#f4ebd9]/75">
                  A sample audit snapshot for coffee roasters, showing where visibility is being lost, which local and AI search gaps matter most, and what conversion issues should be fixed first.
                </p>
                <div className="flex flex-wrap gap-2 text-[8.5px] uppercase tracking-[0.12em] text-[#f4ebd9]/60 sm:text-[10px]" style={{ gap: "7px", lineHeight: "1.35", marginTop: "12px" }}>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 whitespace-normal">AI search visibility</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 whitespace-normal">Local SEO</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 whitespace-normal">UX + conversion</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 whitespace-normal">Technical SEO</span>
                </div>
              </div>

              <div className="audit-card-buttons lg:mt-0 lg:w-auto lg:justify-end">
                <a
                  href="/case%20study%20audit.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="audit-card-btn"
                >
                  Open PDF
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>
                <a
                  href="/case%20study%20audit.pdf"
                  download="sample-free-audit-coffee-roasters.pdf"
                  className="audit-card-btn"
                >
                  Download PDF
                  <Download className="h-3.5 w-3.5 shrink-0" />
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
