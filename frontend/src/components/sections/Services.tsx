"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ArrowUpRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

interface System {
  id: string;
  number: string;
  title: string;
  tagline: string;
  story: string;
  features: string[];
}

const systems: System[] = [
  {
    id: "customer-acquisition",
    number: "01",
    title: "Customer Acquisition System",
    tagline:
      "We manage the complete flow of acquiring new qualified leads (upcoming customers) through online, excluding high level content creation.",
    story:
      "Starting a business is easy, but getting customers online is harder than doing it offline, yet the ROI is far higher when you get it right. This system solves that gap efficiently for your business, built custom to your current situation, market, and budget, so you get the right strategy and its implementation for acquiring new clients.",
    features: [
      "Portal website for business",
      "WhatsApp integration",
      "Local SEO",
      "Appointment booking agent (if needed)",
      "Simple CRM creation and integration",
    ],
  },
  {
    id: "customer-retention",
    number: "02",
    title: "Customer Retention System",
    tagline:
      "We'll manage every customer's profile of your business and make them stick to your brand.",
    story:
      "Most businesses spend everything on getting new customers but silently lose the ones they already have. This system turns one-time buyers into loyal repeat customers, so every rupee you've already earned keeps working and compounding for your brand.",
    features: [
      "Loyalty program designing",
      "Email marketing",
      "WhatsApp automated retention setup",
      "Referral programs",
      "Feedback capture",
      "Regular recommendations",
    ],
  },
  {
    id: "ecom-growth",
    number: "03",
    title: "Ecom Growth System",
    tagline:
      "We manage the digital side of the complete process of user visiting your site to buying a product.",
    story:
      "Your product may be great, but if visitors never become buyers your store is just a silent showroom. This system manages the entire digital journey from visit to purchase, so you earn more from every visitor instead of losing them at checkout.",
    features: [
      "Store creation and optimization",
      "Product conversion possibility increasing",
      "Shopping experience & checkout friction reducing",
      "Includes Customer Acquisition System",
      "Includes Customer Retention System",
      "Analytics for acquisition & retention systems",
    ],
  },
  {
    id: "business-automation",
    number: "04",
    title: "Business Automation System",
    tagline:
      "We set up automation for your repetitive tasks so your business runs itself while you focus on growth.",
    story:
      "Scaling a business needs automation to be set up for repetitive tasks. There are many workflows, with and without AI included, and that really saves almost 2x of your time, so you can focus on a new domain to expand. This is exactly what we deliver for you, with our current expertise in technical and market analytics.",
    features: [
      "Appointment booking",
      "Client onboarding setup",
      "CRM integration to inbound & outbound channels (lead capture)",
      "Customer communication bot",
      "Automated KPIs notified to owner from analytics",
      "Other internal workflows that can be automated (specific to business)",
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSystem, setActiveSystem] = useState<System | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-display-line", {
        yPercent: 100,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".service-display",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".offer-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".offers-grid",
          start: "top 85%",
          once: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openSystem = (system: System) => {
    setActiveSystem(system);
    document.body.style.overflow = "hidden";
  };

  const closeSystem = () => {
    setActiveSystem(null);
    document.body.style.overflow = "";
  };

  const scrollToCta = () => {
    closeSystem();
    const ctaSection = document.querySelector(".footer-cta");
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section ref={sectionRef} id="services" className="section-padding service-section">
        <div className="mx-auto max-w-[1500px]">
          <div className="section-meta-row">
            <span>[ Luxury · Premium · Specialty · Artisanal ]</span>
            <SectionBadge label="What We Offer" number="02" />
            <span>[ 4 Complete Systems ]</span>
          </div>

          <div className="service-display" aria-label="Our complete systems">
            <span className="service-ghost service-ghost-top">Systems &</span>
            <div className="overflow-hidden">
              <span className="service-display-line service-index">[02]</span>
              <h2 className="service-display-line">What</h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="service-display-line service-display-accent">
                We offer.
              </h2>
            </div>
            <span className="service-ghost service-ghost-bottom">Complete</span>
          </div>

          <div className="offers-grid">
            {systems.map((system) => (
              <div
                key={system.id}
                className="offer-card group"
                onClick={() => openSystem(system)}
              >
                <span className="offer-card-number">{system.number}</span>
                <div className="offer-card-content">
                  <h3>{system.title}</h3>
                  <p className="offer-card-tagline">{system.tagline}</p>
                </div>
                <div className="offer-card-arrow">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeSystem && (
        <div
          className="offer-popup-overlay"
          onClick={closeSystem}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div className="offer-popup-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="offer-popup-close"
              aria-label="Close system details"
              onClick={closeSystem}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="offer-popup-header">
              <span className="offer-popup-number">{activeSystem.number}</span>
              <h2 id="popup-title">{activeSystem.title}</h2>
              <p className="offer-popup-tagline">{activeSystem.tagline}</p>
            </div>

            <div className="offer-popup-body">
              <p className="offer-popup-story">{activeSystem.story}</p>

              <div className="offer-popup-features">
                <h4>What's Included</h4>
                <ul>
                  {activeSystem.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="offer-popup-price" style={{ marginTop: "16px" }}>
                <span style={{ fontSize: "0.85rem", color: "#36b8ff", fontWeight: 600 }}>* Contact for pricing</span>
              </div>
            </div>

            <div className="offer-popup-actions">
              <button
                className="button button-primary"
                onClick={scrollToCta}
              >
                Contact
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                className="button button-muted"
                onClick={closeSystem}
              >
                Back to Systems
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}