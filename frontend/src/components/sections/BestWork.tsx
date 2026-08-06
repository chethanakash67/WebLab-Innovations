"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import "@/app/bento.css";

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  {
    id: "orbit",
    type: "video",
    src: "/Videos/Tabun Chai - orbut menu vdeo compr.mp4",
    className: "bento-col-6 bento-row-1",
    why: "Smooth, frictionless navigation.",
    result: "Reduced bounce rate by 22%.",
    alt: "Orbit Menu Interaction",
    device: "desktop",
  },
  {
    id: "faq",
    type: "video",
    src: "/Videos/Tabun Chai - faq animation.mp4",
    className: "bento-col-4 bento-row-1",
    why: "Keeps users engaged while answering objections.",
    result: "Decreased support queries by 35%.",
    alt: "FAQ Animation",
    device: "desktop",
  },
  {
    id: "font-screenshot",
    type: "image-hotspot",
    src: "/Videos/Screenshot 2026-06-20 224215.png",
    className: "bento-col-full bento-row-2 bento-click-pop-out",
    why: "High-contrast, readable font scaling.",
    result: "Increased average time on page.",
    alt: "Typography Hierarchy",
    device: "desktop",
    hotspots: [
      {
        id: "font",
        top: "30%",
        left: "60%",
        title: "Typography",
        description: "Funky font matches the eclectic, warm vibe of the cafe.",
      },
      {
        id: "special",
        top: "70%",
        left: "35%",
        title: "Today’s Special",
        description: "Highlighting daily specials increases curiosity and urgency to try today.",
      },
      {
        id: "cta",
        top: "88%",
        left: "48%",
        title: "Clear CTA",
        description: "The ‘Get Directions’ button is placed, as a trigger to visit the cafe.",
      },
      {
        id: "flag",
        top: "9%",
        left: "95%",
        title: "Status Flag",
        description: "‘Open Now’ flag immediately triggers customer attention.",
      },
    ]
  },
];

const qaItems = [
  {
    id: "client",
    question: "Who was the client?",
    badge: "Client Profile",
    story: "The client was a cafe owner named Tabun Tea (Tabun Chai) located near the Bangalore Tirupati Highway. He approached us needing a modern, highly engaging digital presence to capture highway travelers and local food lovers alike.",
    details: [
      { label: "Client Name", value: "Tabun Tea (Tabun Chai Cafe)" },
      { label: "Location", value: "Near Bangalore Tirupati Highway" },
      { label: "Business Type", value: "Cafe & Tea Lounge" }
    ]
  },
  {
    id: "action",
    question: "What did we do for them?",
    badge: "Execution & Design",
    story: "We designed and engineered a custom, ultra-sleek website in just 4 days. Every detail from brand architecture and warm coffee aesthetics to customer ambiance and mouth-watering visual menus was crafted with precision to keep cafe visitors engaged.",
    details: [
      { label: "Turnaround", value: "Designed & Built in 4 Days" },
      { label: "Scope", value: "Brand Architecture & Custom UI" },
      { label: "Aesthetics", value: "Cafe Ambiance Theme" }
    ]
  },
  {
    id: "result",
    question: "What is the result?",
    badge: "Measured Impact",
    story: "Within just 10 days of launching the new website, Tabun Chai experienced a massive 40% increase in lead conversions. Online menu discovery surged, customer inquiries skyrocketed, and table direction clicks saw a dramatic rise.",
    details: [
      { label: "Lead Boost", value: "+40% Conversion Increase" },
      { label: "Measured Within", value: "10 Days of Launch" },
      { label: "Impact", value: "Higher Table Visits & Orders" }
    ]
  }
];

export default function BestWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const fontScreenshotRef = useRef<HTMLDivElement>(null);
  const [isImagePopped, setIsImagePopped] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [loadVideos, setLoadVideos] = useState(false);
  const [openQuestions, setOpenQuestions] = useState<string[]>(["client"]);

  const toggleQuestion = (id: string) => {
    setOpenQuestions((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideos(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (badgeRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      badgeRef.current.style.left = `${e.clientX - rect.left}px`;
      badgeRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fontScreenshotRef.current && 
        !fontScreenshotRef.current.contains(event.target as Node)
      ) {
        setIsImagePopped(false);
      }
    };

    if (isImagePopped) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isImagePopped]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-item", {
        y: 60,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="best-work" className="section-padding bento-section">
      <div className="mx-auto max-w-[1500px]">
        <div className="process-heading" style={{ marginBottom: "60px" }}>
          <div>
            <SectionBadge label="Featured Project" number="03" />
            <h2>
              Our Best
              <br />
              <span>Work.</span>
            </h2>
          </div>
          <p>
            An inside look at the strategic design decisions that drove real business results for Tabun Chai.
          </p>
        </div>

        <div className="bento-grid">
          {bentoItems.map((item) => (
            <div 
              key={item.id} 
              ref={item.id === 'font-screenshot' ? fontScreenshotRef : null}
              className={`bento-item ${item.className} ${item.id === 'font-screenshot' && isImagePopped ? 'active' : ''}`}
              onClick={item.id === 'font-screenshot' ? () => setIsImagePopped(!isImagePopped) : undefined}
              onMouseMove={item.id === 'font-screenshot' ? handleMouseMove : undefined}
              onMouseEnter={item.id === 'font-screenshot' ? () => setIsImageHovered(true) : undefined}
              onMouseLeave={item.id === 'font-screenshot' ? () => setIsImageHovered(false) : undefined}
              style={item.id === 'font-screenshot' ? { cursor: 'pointer' } : {}}
            >
              <div className={`bento-device-frame bento-device-${item.device}`}>
                {item.type === "video" && loadVideos && (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`bento-media ${
                      item.device === "desktop"
                        ? "bento-media-video-desktop"
                        : item.id === "mobile-scroll"
                        ? "bento-media-video-mobile"
                        : ""
                    }`}
                  />
                )}
                {item.type === "image" && (
                  <Image
                    src={item.src as string}
                    alt={item.alt}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                    className="bento-media"
                    style={item.id === "font-screenshot" ? { objectFit: "contain" } : {}}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {item.type === "image-hotspot" && (
                  <div className="bento-image-wrapper">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="bento-media"
                    />
                    {item.hotspots?.map((hotspot: any) => (
                      <div
                        key={hotspot.id}
                        className="image-hotspot"
                        style={{ top: hotspot.top, left: hotspot.left }}
                      >
                        <div className="hotspot-pulse"></div>
                        <div className="hotspot-dot"></div>
                        <div className={`hotspot-tooltip ${hotspot.id === 'flag' ? 'hotspot-tooltip-left' : ''}`}>
                          <strong>{hotspot.title}</strong>
                          {hotspot.description}
                        </div>
                      </div>
                    ))}
                    {item.id === "font-screenshot" && (
                      <div 
                        ref={badgeRef}
                        className={`click-me-badge ${isImageHovered ? 'visible' : ''} ${isImagePopped ? 'click-me-badge-small' : ''}`}
                      >
                        {isImagePopped ? "This is his custom hero section" : "Click the Img"}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Coffee Brown Translucent QA Card */}
        <div className="coffee-qa-card">
          <div className="coffee-stat-header">
            <div className="coffee-stat-badge">
              <Sparkles className="h-3.5 w-3.5 text-[#e6a15c]" />
              <span>CASE STUDY HIGHLIGHT</span>
            </div>
            
            <div className="coffee-metric-group">
              <span className="coffee-metric-number">40%</span>
              <div className="coffee-metric-text-block">
                <div className="coffee-metric-highlight">
                  INCREASE IN LEAD CONVERSION
                </div>
                <span className="coffee-metric-subtext">
                  Designed in 4 Days • Result Measured Within 10 Days of Launch
                </span>
              </div>
            </div>
          </div>

          {/* Questions Section Title */}
          <div className="coffee-qa-section-title">
            <span>PROJECT BREAKDOWN : CLICK ANY QUESTION TO EXPAND DETAILS</span>
          </div>

          <div className="coffee-qa-list">
            {qaItems.map((qa) => {
              const isOpen = openQuestions.includes(qa.id);
              return (
                <div
                  key={qa.id}
                  className={`coffee-qa-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="coffee-qa-button"
                    onClick={() => toggleQuestion(qa.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="coffee-qa-question-wrap">
                      <span className="coffee-qa-num">{qa.id === 'client' ? '01' : qa.id === 'action' ? '02' : '03'}</span>
                      <span className="coffee-qa-tag">{qa.badge}</span>
                      <h3 className="coffee-qa-title">{qa.question}</h3>
                    </div>
                    <div className="coffee-qa-toggle-icon">
                      <span className="coffee-qa-action-text">{isOpen ? "Hide details" : "Expand details"}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#e6a15c]" : "text-gray-400"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`coffee-qa-answer-container ${
                      isOpen ? "expanded" : ""
                    }`}
                  >
                    <div className="coffee-qa-answer-inner">
                      <p className="coffee-qa-story">{qa.story}</p>
                      <div className="coffee-qa-pills">
                        {qa.details.map((detail, idx) => (
                          <span
                            key={idx}
                            className={`coffee-pill ${
                              detail.label === "Lead Boost" ? "coffee-pill-highlight" : ""
                            }`}
                          >
                            <strong>{detail.label}:</strong> {detail.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Links Section (Live Project & Projected Case Study) */}
        <div className="coffee-live-btn-wrap">
          <div className="coffee-live-text-wrap">
            <span className="coffee-live-text-label">Check this out:</span>
            <a
              href="https://tabun-chai.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="coffee-live-text-url"
            >
              https://tabun-chai.vercel.app/
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <Link
            href="/tabun-chai"
            className="coffee-casestudy-btn"
          >
            <span className="coffee-casestudy-label">Projected Case Study</span>
            <span className="coffee-casestudy-title">
              Read Sample Case Study Breakdown
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Testimonial Block */}
        <div className="testimonial-block" style={{ maxWidth: '1250px', margin: '80px auto 0 auto' }}>
          <div className="testimonial-card">
            <div className="testimonial-header">
              <h3 className="testimonial-heading">What did<br /><span style={{ color: '#e6a15c' }}>they say?</span></h3>
              <div className="testimonial-stars">
                ★★★★<span className="half-star">★</span> <span className="rating-number">4.6</span>
              </div>
            </div>
            <p className="testimonial-quote">
              "We only provided a simple Google Maps link. Their team researched our cafe across multiple sites, gathered all the details, and delivered a superb conversion focused landing page for our cafe in a couple of days. The process was entirely untouched by us and the final design is simply brilliant."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">
                SR
              </div>
              <div className="author-info">
                <h4>S. Ramesh & Team</h4>
                <span>Tabun Chai Cafe</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link href="/work" className="bento-cta-btn">
            Check out our projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
