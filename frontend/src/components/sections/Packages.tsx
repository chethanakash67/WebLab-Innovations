"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Check, RefreshCw, Zap } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

interface PricingPackage {
  id: string;
  name: string;
  type: string;
  tagline: string;
  features: string[];
  priceInr: string;
  priceUsd: string;
  deliveryOrMin: string;
  description: string;
  popular?: boolean;
}

const pricingPackages: PricingPackage[] = [
  {
    id: "starter",
    name: "STARTER",
    type: "One-Time Project",
    tagline: "Visibility Foundation",
    description: "Perfect for local brands needing a high-end conversion engine to capture first-time customers.",
    priceInr: "₹15,000 - ₹19,000",
    priceUsd: "$250 - $300",
    deliveryOrMin: "3 to 4 weeks delivery",
    features: [
      "Free brand visibility audit (AEO gap, speed, GBP status)",
      "Brand story architecture & messaging hierarchy",
      "Conversion-focused landing page design & dev",
      "On-page SEO setup (headings, meta, keywords)",
      "Google Business Profile optimization",
      "WhatsApp Business basic auto-reply config",
      "One revision round included",
    ],
  },
  {
    id: "growth",
    name: "GROWTH",
    type: "Monthly Retainer",
    tagline: "Search and Convert",
    description: "Designed for growing brands wanting consistent, recurring organic visits and search dominance.",
    priceInr: "₹22,000 - ₹27,000 / mo",
    priceUsd: "$400 - $450 / mo",
    deliveryOrMin: "3 months minimum contract",
    popular: true,
    features: [
      "Includes everything in STARTER",
      "AEO content structuring (ChatGPT & Perplexity format)",
      "Schema markup (Product, Local Business, Reviews)",
      "Subscription flow UX audit & journey redesign",
      "Google Shopping feed optimization",
      "Monthly SEO maintenance & content updates",
      "Monthly plain-language progress report",
      "Three revision rounds per month",
    ],
  },
  {
    id: "full-system",
    name: "FULL SYSTEM",
    type: "Monthly Retainer",
    tagline: "Discovery to Lead",
    description: "The ultimate automated pipeline. Hands-free marketing, calling, and lead capturing.",
    priceInr: "₹50,000 - ₹70,000 / mo",
    priceUsd: "$600 - $850 / mo",
    deliveryOrMin: "3 months minimum contract",
    features: [
      "Includes everything in GROWTH",
      "Review generation system & automated request flow",
      "WhatsApp automation (enquiry, order, reorder nudge)",
      "AI Lead Qualification Agent (24/7 CRM capture)",
      "AI Voice Agent receptionist for incoming calls",
      "Unified analytics dashboard (traffic & leads)",
      "Monthly strategy & growth sync calls",
      "Unlimited revisions & support",
    ],
  },
];

const addons = [
  { name: "Additional Landing Pages", priceInr: "₹8,000 per page", priceUsd: "$180 per page" },
  { name: "Extra Revision Rounds", priceInr: "₹3,000 per round", priceUsd: "$70 per round" },
  { name: "Monthly Review Monitoring & Response", priceInr: "₹5,000 per month", priceUsd: "$120 per month" },
  { name: "WhatsApp Nurture Sequence Setup", priceInr: "₹10,000 one-time", priceUsd: "$220 one-time" },
];

export default function Packages() {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectPlan = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <section id="packages" className="pkg-section section-padding">
      {/* Scope Style Block */}
      <style jsx global>{`
        .pkg-section {
          position: relative;
          background: #020609;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }
        .pkg-bg-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80vw;
          height: 60vh;
          background: radial-gradient(circle, rgba(54, 184, 255, 0.08) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(100px);
        }
        .pkg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          perspective: 1500px;
        }
        .pkg-card-container {
          position: relative;
          height: 650px;
          cursor: pointer;
        }
        .pkg-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        .pkg-card-front,
        .pkg-card-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 40px 32px 32px 32px;
          border-radius: 24px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-sizing: border-box;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .pkg-card-front {
          z-index: 2;
          transform: rotateY(0deg);
        }
        .pkg-card-back {
          z-index: 1;
          transform: rotateY(180deg);
          background: rgba(3, 12, 16, 0.98);
          border-color: rgba(54, 184, 255, 0.24);
        }
        .pkg-card-container:hover .pkg-card-front {
          border-color: rgba(54, 184, 255, 0.35);
          box-shadow: 0 12px 40px rgba(54, 184, 255, 0.08);
        }
        .pkg-card-container.is-popular .pkg-card-front {
          border-color: rgba(54, 184, 255, 0.4);
          background: radial-gradient(circle at 100% 0%, rgba(54, 184, 255, 0.08), transparent 45%), rgba(255, 255, 255, 0.03);
          box-shadow: 0 15px 50px rgba(54, 184, 255, 0.08);
        }
        .pkg-card-container.is-popular:hover .pkg-card-front {
          border-color: rgba(54, 184, 255, 0.6);
        }
        .pkg-popular-badge {
          position: absolute;
          top: 18px;
          right: 18px;
          padding: 6px 12px;
          border-radius: 99px;
          background: #36b8ff;
          color: #030c10;
          font-family: monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .pkg-header-block {
          margin-bottom: 20px;
        }
        .pkg-type-label {
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          color: #36b8ff;
          text-transform: uppercase;
        }
        .pkg-title-h3 {
          margin-top: 6px;
          color: #fff;
          font-family: var(--font-display), sans-serif;
          font-size: 30px;
          font-weight: 500;
          letter-spacing: -0.05em;
          line-height: 1.1;
        }
        .pkg-tagline-text {
          display: block;
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 13px;
          font-style: italic;
        }
        .pkg-desc-text {
          color: rgba(255, 255, 255, 0.6);
          font-size: 13.5px;
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .pkg-features-container {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .pkg-features-title {
          display: block;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .pkg-features-ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .pkg-feature-li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.75);
        }
        .pkg-check-svg {
          flex-shrink: 0;
          margin-top: 3px;
          color: #36b8ff;
        }
        .pkg-more-li {
          color: #36b8ff;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.04em;
          padding-left: 24px;
        }
        .pkg-action-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.35);
          font-family: monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.2s ease;
        }
        .pkg-card-container:hover .pkg-action-hint {
          color: #36b8ff;
        }
        .pkg-price-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .pkg-price-col {
          display: flex;
          flex-direction: column;
        }
        .pkg-price-market {
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }
        .pkg-price-amount {
          margin-top: 4px;
          color: #fff;
          font-family: var(--font-display), sans-serif;
          font-size: 20px;
          font-weight: 550;
          letter-spacing: -0.02em;
        }
        .pkg-advance-block {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(54, 184, 255, 0.06);
          border: 1px dashed rgba(54, 184, 255, 0.2);
          margin-bottom: 16px;
        }
        .pkg-advance-label {
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }
        .pkg-advance-value {
          font-family: var(--font-display), sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #36b8ff;
        }
        .pkg-delivery-text {
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.06em;
          color: #36b8ff;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .pkg-all-features {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          margin-bottom: 24px;
        }
        .pkg-scrollbar-div {
          flex: 1;
          overflow-y: auto;
          padding-right: 6px;
        }
        .pkg-scrollbar-div::-webkit-scrollbar {
          width: 3px;
        }
        .pkg-scrollbar-div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 9px;
        }
        .pkg-scrollbar-div::-webkit-scrollbar-thumb {
          background: rgba(54, 184, 255, 0.2);
          border-radius: 9px;
        }
        .pkg-btn-get-started {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px 18px;
          border-radius: 12px;
          background: #36b8ff;
          color: #030c10;
          font-size: 13.5px;
          font-weight: 600;
          transition: background 200ms ease, transform 200ms ease;
          border: none;
          cursor: pointer;
        }
        .pkg-btn-get-started:hover {
          background: #60c9ff;
          transform: translateY(-2px);
        }
        .pkg-addons-container {
          margin-top: 80px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.012);
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        .pkg-addons-container::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(54, 184, 255, 0.24), transparent);
          content: "";
        }
        .pkg-addons-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }
        .pkg-addons-title-text {
          font-family: var(--font-display), sans-serif;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.03em;
        }
        .pkg-addons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .pkg-addon-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.008);
          transition: border-color 200ms ease, background 200ms ease;
        }
        .pkg-addon-item:hover {
          border-color: rgba(54, 184, 255, 0.16);
          background: rgba(54, 184, 255, 0.015);
        }
        .pkg-addon-name {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.85);
          font-size: 13.5px;
        }
        .pkg-addon-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #36b8ff;
          box-shadow: 0 0 8px #36b8ff;
        }
        .pkg-addon-prices {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-family: monospace;
          font-size: 12.5px;
        }
        .pkg-addon-divider {
          color: rgba(255, 255, 255, 0.2);
        }
        .pkg-addon-note {
          margin-top: 24px;
          color: rgba(255, 255, 255, 0.35);
          font-size: 11px;
          line-height: 1.5;
          font-style: italic;
          text-align: center;
        }
        @media (max-width: 1024px) {
          .pkg-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            max-width: 550px;
            margin: 0 auto;
          }
          .pkg-card-container {
            height: 610px;
          }
          .pkg-addons-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .pkg-addons-container {
            padding: 24px;
            margin-top: 48px;
            border-radius: 16px;
          }
          .pkg-addon-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 14px 16px;
          }
          .pkg-addon-prices {
            margin-left: 17px;
          }
        }
      `}</style>

      <div className="pkg-bg-glow" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="max-w-2xl" style={{ marginBottom: "clamp(64px, 10vw, 110px)" }}>
          <SectionBadge label="Service Tiers" number="08" />
          <h2 className="packages-title mt-6 text-white font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]">
            Sized to fit<br />
            <span className="text-[#36b8ff]">your ambitions.</span>
          </h2>
          <p className="mt-6 text-white/50 text-base md:text-lg leading-relaxed">
            Choose a plan that fits your growth stage. Click anywhere on a card to flip and view complete scope and international pricing.
          </p>
          <div className="mt-8">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-[#36b8ff] hover:text-[#60c9ff] transition-colors group">
              <span>View our complete list of Services & Systems</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </header>

        {/* Pricing Cards Grid */}
        <div className="pkg-grid">
          {pricingPackages.map((pkg) => {
            const isFlipped = !!flippedCards[pkg.id];
            return (
              <div
                key={pkg.id}
                className={`pkg-card-container ${pkg.popular ? "is-popular" : ""}`}
              >
                <motion.div
                  className="pkg-card-inner"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  style={{ transformStyle: "preserve-3d", height: "100%", width: "100%" }}
                >
                  {/* FRONT SIDE */}
                  <div className="pkg-card-front" onClick={() => toggleFlip(pkg.id)}>
                    {pkg.popular && (
                      <span className="pkg-popular-badge">
                        Most Popular
                      </span>
                    )}

                    <div className="pkg-header-block">
                      <span className="pkg-type-label">{pkg.type}</span>
                      <h3 className="pkg-title-h3">{pkg.name}</h3>
                      <span className="pkg-tagline-text">“{pkg.tagline}”</span>
                    </div>

                    <p className="pkg-desc-text">{pkg.description}</p>

                    <div className="pkg-features-container">
                      <span className="pkg-features-title">Key Deliverables</span>
                      <ul className="pkg-features-ul">
                        {pkg.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="pkg-feature-li">
                            <Check size={14} className="pkg-check-svg" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {pkg.features.length > 3 && (
                          <li className="pkg-more-li">
                            + {pkg.features.length - 3} more deliverables (click to flip)
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="pkg-action-hint">
                      <span>Click to view pricing & details</span>
                      <RefreshCw size={12} />
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="pkg-card-back">
                    <div className="pkg-header-block" style={{ cursor: "pointer" }} onClick={() => toggleFlip(pkg.id)}>
                      <span className="pkg-type-label">{pkg.type}</span>
                      <h3 className="pkg-title-h3">{pkg.name}</h3>
                    </div>

                    {/* Price Block */}
                    <div className="pkg-price-grid">
                      <div className="pkg-price-col">
                        <small className="pkg-price-market">India</small>
                        <strong className="pkg-price-amount">{pkg.priceInr}</strong>
                      </div>
                      <div className="pkg-price-col">
                        <small className="pkg-price-market">International</small>
                        <strong className="pkg-price-amount">{pkg.priceUsd}</strong>
                      </div>
                    </div>

                    {/* Booking Advance Block */}
                    <div className="pkg-advance-block">
                      <span className="pkg-advance-label">Booking Advance</span>
                      <span className="pkg-advance-value">12% to initiate project</span>
                    </div>

                    <p className="pkg-delivery-text">{pkg.deliveryOrMin}</p>

                    <div className="pkg-all-features">
                      <span className="pkg-features-title">Complete Scope</span>
                      <div className="pkg-scrollbar-div">
                        <ul className="pkg-features-ul">
                          {pkg.features.map((feature, i) => (
                            <li key={i} className="pkg-feature-li">
                              <Check size={12} className="pkg-check-svg" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="pkg-btn-get-started"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlan();
                      }}
                    >
                      <span>Get Started</span>
                      <ArrowUpRight size={14} />
                    </button>

                    <div className="pkg-action-hint" style={{ cursor: "pointer" }} onClick={() => toggleFlip(pkg.id)}>
                      <span>Click to flip back</span>
                      <RefreshCw size={12} />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ADDONS CONTAINER */}
        <div className="pkg-addons-container">
          <div className="pkg-addons-title">
            <Zap size={16} className="text-[#36b8ff]" />
            <span className="pkg-addons-title-text">Available Upgrades & Add-ons</span>
          </div>

          <div className="pkg-addons-grid">
            {addons.map((addon, index) => (
              <div key={index} className="pkg-addon-item">
                <div className="pkg-addon-name">
                  <span className="pkg-addon-bullet" />
                  <strong>{addon.name}</strong>
                </div>
                <div className="pkg-addon-prices">
                  <span>{addon.priceInr}</span>
                  <span className="pkg-addon-divider">/</span>
                  <span>{addon.priceUsd}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pkg-addon-note">
            * Additional AI services will be designed and built according to specific business requirements in both Growth and Full System plans.
          </div>
        </div>
      </div>
    </section>
  );
}
