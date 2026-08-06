"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

interface System {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  priceNote?: string;
}

const systems: System[] = [
  {
    id: "customer-acquisition",
    number: "01",
    title: "Customer Acquisition System",
    tagline: "We manage the complete flow of acquiring new qualified leads (upcoming customers) through online, excluding high level content creation.",
    description: "A complete system to bring qualified leads to your business through digital channels.",
    features: [
      "Portal website for business",
      "WhatsApp integration",
      "Local SEO",
      "Appointment booking agent (if needed)",
      "Simple CRM creation and integration",
    ],
    priceNote: "Starting from ₹XX,XXX/month",
  },
  {
    id: "customer-retention",
    number: "02",
    title: "Customer Retention System",
    tagline: "We'll manage every customer's profile of your business and make them stick to your brand.",
    description: "A comprehensive system to maximize customer lifetime value and build lasting relationships.",
    features: [
      "Loyalty program designing",
      "Email marketing",
      "WhatsApp automated retention setup",
      "Referral programs",
      "Feedback capture",
      "Regular recommendations",
    ],
    priceNote: "Starting from ₹XX,XXX/month",
  },
  {
    id: "ecom-growth",
    number: "03",
    title: "Ecom Growth System",
    tagline: "We manage the digital side of the complete process of user visiting your site to buying a product.",
    description: "End-to-end ecommerce growth system covering acquisition, conversion, and retention.",
    features: [
      "Store creation and optimization",
      "Product conversion possibility increasing",
      "Shopping experience & checkout friction reducing",
      "Includes Customer Acquisition System",
      "Includes Customer Retention System",
      "Analytics for acquisition & retention systems",
    ],
    priceNote: "Starting from ₹XX,XXX/month",
  },
  {
    id: "system-4",
    number: "04",
    title: "System Four",
    tagline: "Description for system four coming soon.",
    description: "Details for system four will be added.",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
    ],
    priceNote: "Contact for pricing",
  },
  {
    id: "system-5",
    number: "05",
    title: "System Five",
    tagline: "Description for system five coming soon.",
    description: "Details for system five will be added.",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
    ],
    priceNote: "Contact for pricing",
  },
];

export default function WhatWeOffer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSystem, setActiveSystem] = useState<System | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".offer-display-line", {
        yPercent: 100,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".offer-display",
          start: "top 78%",
        },
      });

      gsap.from(".offer-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".offers-grid",
          start: "top 82%",
        },
      });
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
      <section ref={sectionRef} id="what-we-offer" className="section-padding offer-section">
        <div className="mx-auto max-w-[1500px]">
          <div className="section-meta-row">
            <span>[ Full-stack product studio ]</span>
            <SectionBadge label="What We Offer" number="02" />
            <span>[ 5 Complete Systems ]</span>
          </div>

          <div className="offer-display" aria-label="Our complete systems">
            <span className="offer-ghost offer-ghost-top">Systems &</span>
            <div className="overflow-hidden">
              <span className="offer-display-line offer-index">[02]</span>
              <h2 className="offer-display-line">What</h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="offer-display-line offer-display-accent">
                We offer.
              </h2>
            </div>
            <span className="offer-ghost offer-ghost-bottom">Complete</span>
          </div>

          <div className="offers-grid">
            {systems.map((system, index) => (
              <div
                key={system.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
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

          <div className="offers-pricing-cta">
            <button
              className="button button-primary"
              onClick={scrollToCta}
            >
              Contact
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300" />
            </button>
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
              <p className="offer-popup-description">{activeSystem.description}</p>

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