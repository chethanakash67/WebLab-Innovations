"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import "@/app/bento.css";

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  {
    id: "orbit",
    type: "video",
    src: "/Videos/Tabun Chai - orbut menu vdeo compr.mp4",
    className: "bento-col-3 bento-row-1",
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
    id: "mobile-scroll",
    type: "video",
    src: "/Videos/Video Project 5 1 compr.mp4",
    className: "bento-col-3 bento-row-2-span",
    why: "Finger-friendly hit zones for bottom navigation.",
    result: "Mobile conversion increased by 40%.",
    alt: "Mobile Project Scroller",
    device: "mobile",
  },
  {
    id: "stats",
    type: "custom",
    className: "bento-col-2 bento-row-1 bento-item-stats",
    why: "Instant social proof.",
    result: "Higher trust and conversion.",
    alt: "Performance Stats",
    device: "mobile",
  },
  {
    id: "font-screenshot",
    type: "image-hotspot",
    src: "/Videos/Screenshot 2026-06-20 224215.png",
    className: "bento-col-5 bento-row-1 bento-click-pop-out",
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

export default function BestWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const fontScreenshotRef = useRef<HTMLDivElement>(null);
  const [activeStatsTab, setActiveStatsTab] = useState<string | null>(null);
  const [isImagePopped, setIsImagePopped] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [loadVideos, setLoadVideos] = useState(false);

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

  const statsTabsData = {
    client: { 
      title: "Who was the client?", 
      desc: [
        "Tabun Chai is a rapidly growing, beloved local cafe known for its authentic, spiced karak chai and warm, eclectic atmosphere.",
        "As their physical foot traffic surged, their outdated digital presence struggled to keep up. They needed a premium digital upgrade that captured the sensory magic of their in-store experience while streamlining the online customer journey for late-night crowds."
      ]
    },
    build: { 
      title: "What did we build?", 
      desc: [
        "We engineered a sleek, highly responsive digital ecosystem centered around a mobile-first philosophy. This included a lightning-fast digital menu, dynamic \"Today's Special\" promotional highlights, and a frictionless ordering interface.",
        "Every UI component was meticulously crafted with warm, caramel aesthetics and micro-animations to reflect their high-end cafe branding and drive customer engagement."
      ]
    },
    results: { 
      title: "What results they got?", 
      desc: [
        "The impact was immediate and profound. The optimized user flow and highly visible \"Get Directions\" CTAs drove a massive 40% increase in local lead capture and daily in-store visits.",
        "Furthermore, the engaging, interactive menu design contributed to a 22% reduction in bounce rates, keeping customers on the page longer and significantly boosting online order volume."
      ]
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-item", {
        y: 60,
        opacity: 0,
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
                    className="bento-media"
                    style={
                      item.device === "desktop"
                        ? { transform: "scale(1.17) translateY(-8%)" }
                        : item.id === "mobile-scroll"
                        ? { objectPosition: "center top", transform: "scale(1.08)" }
                        : {}
                    }
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
                {item.type === "custom" && item.id === "stats" && (
                  <div className="bento-stats-card-extended" onMouseLeave={() => setActiveStatsTab(null)}>
                    <span className="stats-label">Conversion Rate</span>
                    <strong className="stats-metric">+40%</strong>
                    <p className="stats-desc" style={{ marginBottom: "0" }}>increase in lead capture</p>
                    
                    <div className="stats-tabs">
                      <button 
                        className={`stats-tab-btn ${activeStatsTab === 'client' ? 'active' : ''}`}
                        onClick={() => setActiveStatsTab('client')}
                      >
                        Who was the client? <span>→</span>
                      </button>
                      <button 
                        className={`stats-tab-btn ${activeStatsTab === 'build' ? 'active' : ''}`}
                        onClick={() => setActiveStatsTab('build')}
                      >
                        What did we build? <span>→</span>
                      </button>
                      <button 
                        className={`stats-tab-btn ${activeStatsTab === 'results' ? 'active' : ''}`}
                        onClick={() => setActiveStatsTab('results')}
                      >
                        What results they got? <span>→</span>
                      </button>
                    </div>
                    
                    <a href="https://tabun-chai.vercel.app/" target="_blank" rel="noopener noreferrer" className="bento-project-link">
                      View the project ↗
                    </a>

                    <div className={`stats-popup-card ${activeStatsTab ? 'open' : ''}`}>
                      {activeStatsTab && (
                        <>
                          <span className="stats-popup-title">{statsTabsData[activeStatsTab as keyof typeof statsTabsData].title}</span>
                          <div className="stats-popup-desc">
                            {statsTabsData[activeStatsTab as keyof typeof statsTabsData].desc.map((para, i) => (
                              <p key={i} style={{ marginBottom: i === 0 ? '12px' : '0' }}>{para}</p>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-block" style={{ maxWidth: '850px', margin: '140px auto 0 auto' }}>
          <div className="testimonial-card">
            <div className="testimonial-header">
              <h3 className="testimonial-heading">What did <span style={{ color: '#e6a15c', fontSize: '1.15em' }}>they say?</span></h3>
              <div className="testimonial-stars">
                ★★★★<span className="half-star">★</span> <span className="rating-number">4.6</span>
              </div>
            </div>
            <p className="testimonial-quote">
              "We only provided a simple Google Maps link. Their team researched our cafe across multiple sites, gathered all the details, and delivered a superb conversion focused landing page for our cafe in exactly a couple of days. The process was entirely untouched by us, even no extra queries asked and the final design is simply brilliant."
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
