"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  Bot,
  CheckCircle2,
  ChevronRight,
  Globe,
  MapPin,
  MessageCircle,
  Minus,
  Palette,
  PhoneCall,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import SectionBadge from "@/components/ui/SectionBadge";
import { useReactiveGlow } from "@/hooks/useReactiveGlow";
import Link from "next/link";

/* ─── Data Types ─── */

type CustomerSystemData = {
  number: string;
  title: string;
  eyebrow: string;
  question: string;
  description: string;
  target: string;
  outcome: string;
  steps: string[];
  metric: string;
  metricLabel: string;
  signals: string[];
  Icon: LucideIcon;
};

type CustomerFaq = {
  topic: string;
  question: string;
  short: string;
  answer: string;
};

/* ─── Data Arrays (unchanged) ─── */

const customerSystems: CustomerSystemData[] = [
  {
    number: "01",
    title: "Landing Page",
    eyebrow: "Lead Capture",
    question: "How does a professional landing page grow my local business?",
    description:
      "Captures customer details online and drives local traffic through clear calls to action and mobile optimization.",
    target:
      "Restaurants, salons, and retail shops with 10-200 customers per day who need a high-end online presence without hiring a tech team.",
    outcome: "More local enquiries from one conversion-focused destination.",
    steps: ["Ask Questions", "Curate Ideas", "Build Page", "2 Revisions"],
    metric: "10-200",
    metricLabel: "daily customers",
    signals: ["Mobile CTAs", "Local traffic", "Lead capture"],
    Icon: Globe,
  },
  {
    number: "02",
    title: "Maps Ranking",
    eyebrow: "Local SEO",
    question: "How do I get my business to show up on top of Google Maps?",
    description:
      "Optimizes your Google Business Profile so nearby customers can find you in high-intent local searches.",
    target:
      "Gyms, clinics, salons, and local service businesses competing for near-me searches.",
    outcome:
      "Higher local discovery when customers are ready to visit or book.",
    steps: ["Audit Profile", "Curate Keywords", "Optimize", "Handover"],
    metric: "#1",
    metricLabel: "local search goal",
    signals: ["Profile audit", "Keyword map", "Posting routine"],
    Icon: MapPin,
  },
  {
    number: "03",
    title: "Review Engine",
    eyebrow: "Reputation Growth",
    question:
      "How do I get 3x more Google reviews from my current customers?",
    description:
      "Sends automated WhatsApp and SMS follow-ups asking happy customers to review within 2 hours of their visit.",
    target:
      "Retail and service businesses with happy customers but weak public review momentum.",
    outcome: "More visible proof from the customers who already trust you.",
    steps: ["Find Moment", "Templates", "Automate", "Workflow"],
    metric: "3x",
    metricLabel: "review lift",
    signals: ["SMS prompts", "WhatsApp prompts", "Reputation proof"],
    Icon: Star,
  },
  {
    number: "04",
    title: "Loyalty Loops",
    eyebrow: "Retention",
    question:
      "How can automated loyalty messages bring customers back to my store?",
    description:
      "Creates personalized retention campaigns that send targeted offers and updates to existing customers.",
    target:
      "Retail shops and salons with past customers who have not visited in 30-60 days.",
    outcome:
      "Reactivates customers before they forget the brand or switch elsewhere.",
    steps: [
      "Group Customers",
      "Curate Offers",
      "Campaigns",
      "2 Revisions",
      "Workflow",
    ],
    metric: "30-60",
    metricLabel: "day win-back",
    signals: ["Segments", "Offers", "Return visits"],
    Icon: RefreshCw,
  },
  {
    number: "05",
    title: "SEO Engine",
    eyebrow: "Search Rankings",
    question: "How does organic search visibility grow my business?",
    description:
      "Optimizes your online content, code structure, and metadata so your business ranks high on search engine result pages.",
    target:
      "Local and digital brands that want recurring, organic customer visits without paying for advertising.",
    outcome: "More inbound traffic from high-intent Google searchers.",
    steps: ["Audit Site", "Keyword Research", "On-page SEO", "Build Backlinks"],
    metric: "2.4x",
    metricLabel: "organic search traffic",
    signals: ["Keyword ranking", "Organic clicks", "Semantic tagging"],
    Icon: Search,
  },
  {
    number: "06",
    title: "AI & ChatGPT",
    eyebrow: "Answer Engines",
    question: "How do I make ChatGPT and AI engines recommend my brand?",
    description:
      "Optimizes your digital presence, citations, and mentions so LLMs and generative search models recommend you.",
    target:
      "Innovative brands targeting tech-savvy audiences using ChatGPT, Gemini, and Claude for recommendations.",
    outcome: "Inclusion in conversational AI search results and recommendations.",
    steps: ["Audit Citations", "Entity Mapping", "Content Feeds", "GEO Tuning"],
    metric: "Top 3",
    metricLabel: "AI recommendations",
    signals: ["LLM mentions", "Entity strength", "GEO citation score"],
    Icon: Sparkles,
  },
  {
    number: "07",
    title: "Brand Design",
    eyebrow: "Identity",
    question: "Why does a cohesive brand identity matter for customer trust?",
    description:
      "Crafts premium visual assets, logos, fonts, and guidelines that make your brand feel instantly high-end and trustworthy.",
    target:
      "Growing businesses looking to stand out from generic competitors and establish authority.",
    outcome: "Unforgettable brand presence that customers trust at first glance.",
    steps: ["Core Palette", "Typography", "Logo Designs", "Brand Guide"],
    metric: "100%",
    metricLabel: "tailored identity",
    signals: ["Color palette", "Premium logo", "Asset library"],
    Icon: Palette,
  },
  {
    number: "08",
    title: "Social Autopilot",
    eyebrow: "Social Growth",
    question: "Can AI automate my social media DMs and posting?",
    description:
      "Sets up automated responders for Instagram and Facebook DMs, plus schedules AI-generated posts and reels.",
    target:
      "Local businesses looking to build a social presence and capture leads directly from social platforms.",
    outcome: "Active social media feeds and instant automated response to DMs.",
    steps: ["Connect DMs", "Response Flow", "Auto Scheduler", "Monitoring"],
    metric: "100%",
    metricLabel: "DM response rate",
    signals: ["Auto reply", "Post scheduling", "Lead capture DMs"],
    Icon: Share2,
  },
];

const customerFaqs: CustomerFaq[] = [
  {
    topic: "Timeline",
    question: "How long does it take to set up an AI system for my cafe?",
    short: "Most launches fit into a 5-7 day setup window.",
    answer:
      "Most systems are fully functional within 5 to 7 days. We start by analyzing your workflow, designing the AI logic, and testing it with your staff before going live.",
  },
  {
    topic: "Ownership",
    question: "Do I need a developer to run these tools?",
    short: "No technical team is needed after launch.",
    answer:
      "No. We handle the setup, coding, and integration. Once live, the system runs automatically, and updates can be handled through a simple dashboard or our support.",
  },
  {
    topic: "Strategy",
    question:
      "What's the difference between a loyalty program and a review follow-up system?",
    short: "One builds reputation; the other brings customers back.",
    answer:
      "Review follow-up builds public reputation by asking happy customers to post on Google Maps. Loyalty automation keeps customers coming back with personalized offers and reminders.",
  },
  {
    topic: "Pricing",
    question: "How much do these systems cost?",
    short: "Pricing depends on volume and the systems selected.",
    answer:
      "Pricing depends on business size, customer volume, and the systems you need. Most tools are designed to pay back quickly by increasing repeat visits and reducing manual work.",
  },
  {
    topic: "Integration",
    question: "Can it integrate with my existing billing or POS software?",
    short: "Yes, most modern POS and billing tools can connect.",
    answer:
      "Yes. The systems can connect with modern POS and billing tools through simple integrations, so the AI knows when to send the right follow-up at the right time.",
  },
];

/* ─── Orbital Node Angles ─── */

const orbitPositions = [
  // First orbit (now outer) - 4 items (on four sides)
  { angle: 0, orbit: 2 },
  { angle: 90, orbit: 2 },
  { angle: 180, orbit: 2 },
  { angle: 270, orbit: 2 },
  // Second orbit (now inner) - 4 items (on diagonal sides)
  { angle: 45, orbit: 1 },
  { angle: 135, orbit: 1 },
  { angle: 225, orbit: 1 },
  { angle: 315, orbit: 1 },
];

const seededRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const toFixed4 = (num: number) => Number(num.toFixed(4));

const orbitParticles = Array.from({ length: 40 }, (_, id) => ({
  id,
  x: toFixed4(seededRandom(id + 1) * 100),
  y: toFixed4(seededRandom(id + 41) * 100),
  size: toFixed4(seededRandom(id + 81) * 2.5 + 1),
  delay: toFixed4(seededRandom(id + 121) * 8),
  duration: toFixed4(seededRandom(id + 161) * 6 + 8),
  opacity: toFixed4(seededRandom(id + 201) * 0.4 + 0.1),
}));


/* ─── Particle Field Component ─── */

function ParticleField() {
  return (
    <div className="cs-orbit-particles" aria-hidden="true">
      {orbitParticles.map((p) => (
        <span
          key={p.id}
          className="cs-orbit-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Typewriter Text Component ─── */

function TypewriterText({ text }: { text: string }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const textLength = text.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((count) => {
        if (count >= textLength) {
          clearInterval(interval);
          return count;
        }

        return count + 1;
      });
    }, 14);

    return () => {
      clearInterval(interval);
    };
  }, [textLength]);

  const isComplete = visibleCount >= textLength;

  return (
    <span className="cs-brief-typewriter">
      {text.slice(0, visibleCount)}
      {!isComplete && <span className="cs-brief-cursor">▊</span>}
    </span>
  );
}

/* ─── Main Component ─── */

export default function CustomerSystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const activeSystem = customerSystems[activeIndex];

  const sectionRef = useRef<HTMLElement>(null);

  useReactiveGlow(sectionRef);

  const activeIcon = useMemo(() => {
    const Icon = activeSystem.Icon;
    return <Icon size={32} strokeWidth={1.5} />;
  }, [activeSystem]);

  const handleNodeClick = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  useEffect(() => {
    if (!isPopupOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePopup, isPopupOpen]);

  return (
    <section
      id="customer-system"
      ref={sectionRef}
      className="customer-system-section section-padding relative overflow-hidden border-y border-white/[0.08]"
      style={{
        background: `
          radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 40%),
            rgba(54, 184, 255, 0.10), transparent 44%),
          radial-gradient(circle at 80% 20%, rgba(8, 122, 216, 0.06), transparent 32%),
          #020303
        `,
      }}
    >
      <div className="customer-system-wrap">
        {/* Complete Customer System Section (Hidden as requested; all logic, data, and design remain in code) */}
        {false && (
          <>
            <header className="customer-system-header">
              <SectionBadge label="AI Customer Systems" number="04" />
              <div className="customer-system-heading-grid">
                <h2>
                  Complete Customer
                  <br />
                  <span>System</span>
                </h2>
                <p>
                  Everything needed to attract, engage, and retain customers through
                  automated local-growth systems.
                </p>
              </div>
            </header>

            {/* ═══════════════════════════════════════════
                ORBITAL COMMAND CENTER
            ═══════════════════════════════════════════ */}
            <div className="cs-orbit-hub">
              <ParticleField />
              <div className="cs-orbit-grid-pulse" aria-hidden="true" />
              <div className="cs-orbit-ring cs-orbit-ring--1" aria-hidden="true" />
              <div className="cs-orbit-ring cs-orbit-ring--2" aria-hidden="true" />

              {/* Central orb */}
              <div className="cs-orbit-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSystem.number}
                    className="cs-orbit-center-orb"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {activeIcon}
                    <span className="cs-orbit-center-label">
                      {activeSystem.title}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Orbital nodes */}
              {customerSystems.map((system, index) => {
                const pos = orbitPositions[index];
                const isActive = index === activeIndex;
                const Icon = system.Icon;
                const rad = (pos.angle * Math.PI) / 180;
                const orbitRadius = pos.orbit === 1 ? 38 : 46;

                return (
                  <button
                    key={system.number}
                    type="button"
                    className={`cs-orbit-node ${isActive ? "cs-orbit-node--active" : ""}`}
                    onClick={() => handleNodeClick(index)}
                    aria-label={`${system.title} — ${system.eyebrow}`}
                    style={{
                      "--node-x": `${50 + orbitRadius * Math.cos(rad)}%`,
                      "--node-y": `${50 + orbitRadius * Math.sin(rad)}%`,
                    } as React.CSSProperties}
                  >
                    <span className="cs-orbit-node-icon">
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    <span className="cs-orbit-node-title">{system.title}</span>
                    <span className="cs-orbit-node-tooltip">Click me!</span>
                    {isActive && (
                      <span className="cs-orbit-node-ring" aria-hidden="true" />
                    )}
                  </button>
                );
              })}

              {/* Energy beam */}
              <svg
                className="cs-orbit-beam"
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="beam-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#36b8ff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#36b8ff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#36b8ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {(() => {
                  const pos = orbitPositions[activeIndex];
                  const rad = (pos.angle * Math.PI) / 180;
                  const orbitRadius = pos.orbit === 1 ? 38 : 46;
                  const nx = 50 + orbitRadius * Math.cos(rad);
                  const ny = 50 + orbitRadius * Math.sin(rad);
                  return (
                    <motion.line
                      key={activeIndex}
                      x1="50"
                      y1="50"
                      x2={nx}
                      y2={ny}
                      stroke="url(#beam-grad)"
                      strokeWidth="0.4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  );
                })()}
              </svg>

              <AnimatePresence mode="wait">
                {isPopupOpen && (
                  <motion.aside
                    key={`orbit-popup-${activeSystem.number}`}
                    className="cs-orbit-popup"
                    initial={{ y: 24, scale: 0.94, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ y: 16, scale: 0.96, filter: "blur(8px)" }}
                    transition={{ duration: 0.48, ease: [0.25, 0.1, 0.25, 1] }}
                    aria-live="polite"
                  >
                    <span className="cs-orbit-popup-scan" aria-hidden="true" />
                    <button
                      type="button"
                      className="cs-orbit-popup-close"
                      aria-label="Close system details"
                      onClick={closePopup}
                    >
                      <X size={18} strokeWidth={1.8} aria-hidden="true" />
                    </button>

                    <div className="cs-orbit-popup-top">
                      <span className="cs-orbit-popup-icon">{activeIcon}</span>
                      <div>
                        <span className="cs-orbit-popup-meta">
                          [{activeSystem.number}] {activeSystem.eyebrow}
                        </span>
                        <h3>{activeSystem.title}</h3>
                      </div>
                      <div className="cs-orbit-popup-metric">
                        <strong>{activeSystem.metric}</strong>
                        <span>{activeSystem.metricLabel}</span>
                      </div>
                    </div>

                    <div className="cs-orbit-popup-question">
                      <ChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
                      <p>{activeSystem.question}</p>
                    </div>

                    <div className="cs-orbit-popup-grid">
                      <div>
                        <span>Description</span>
                        <p>{activeSystem.description}</p>
                      </div>
                      <div>
                        <span>Best For</span>
                        <p>{activeSystem.target}</p>
                      </div>
                    </div>

                    <div className="cs-orbit-popup-outcome">
                      <span>
                        <Bot size={16} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <p>{activeSystem.outcome}</p>
                    </div>

                    <div className="cs-orbit-popup-tags">
                      {activeSystem.signals.map((signal) => (
                        <span key={signal}>
                          <CheckCircle2 size={12} strokeWidth={2} aria-hidden="true" />
                          {signal}
                        </span>
                      ))}
                    </div>
                  </motion.aside>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════
            BRIEFING DECK (FAQ) — Common Questions (Visible)
        ═══════════════════════════════════════════ */}
        <div className="cs-brief-section" style={{ marginTop: 0 }}>
          <div className="cs-brief-header">
            <div>
              <SectionBadge label="Common Questions" number="04" />
              <span className="cs-brief-header-eyebrow" style={{ display: 'block', marginTop: '14px' }}>
                [ Knowledge Terminal ]
              </span>
              <h3 className="cs-brief-header-title">Common Questions</h3>
            </div>
            <p className="cs-brief-header-intro">
              Quick answers for owners who want automation without adding
              technical complexity.
            </p>
          </div>

          <div className="cs-brief-deck">
            {customerFaqs.slice(0, 2).map((faq, index) => {
              const isActive = index === activeFaqIndex;
              return (
                <article
                  key={faq.question}
                  className={`cs-brief-card ${isActive ? "cs-brief-card--active" : ""}`}
                >
                  {/* HUD corner brackets */}
                  <span className="cs-brief-card-corner cs-brief-card-corner--tl" aria-hidden="true" />
                  <span className="cs-brief-card-corner cs-brief-card-corner--tr" aria-hidden="true" />
                  <span className="cs-brief-card-corner cs-brief-card-corner--bl" aria-hidden="true" />
                  <span className="cs-brief-card-corner cs-brief-card-corner--br" aria-hidden="true" />

                  {/* Scan-line hover decoration */}
                  <span className="cs-brief-card-scan" aria-hidden="true" />

                  <button
                    type="button"
                    className="cs-brief-trigger"
                    aria-expanded={isActive}
                    onClick={() => setActiveFaqIndex(isActive ? null : index)}
                  >
                    <span className="cs-brief-index">
                      <span className="cs-brief-index-ring">
                        <svg viewBox="0 0 36 36" width="36" height="36">
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="rgba(54,184,255,0.15)"
                            strokeWidth="1.5"
                          />
                          {isActive && (
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="#36b8ff"
                              strokeWidth="2"
                              strokeDasharray="100.5"
                              strokeDashoffset="0"
                              strokeLinecap="round"
                              className="cs-brief-index-fill"
                            />
                          )}
                        </svg>
                      </span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="cs-brief-trigger-content">
                      <span className="cs-brief-topic">{faq.topic}</span>
                      <strong className="cs-brief-question">
                        {faq.question}
                      </strong>
                    </div>

                    <span
                      className={`cs-brief-toggle ${isActive ? "cs-brief-toggle--active" : ""}`}
                    >
                      {isActive ? (
                        <Minus size={16} strokeWidth={2} />
                      ) : (
                        <Plus size={16} strokeWidth={2} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="cs-brief-reveal"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.45, ease: "easeInOut" },
                          opacity: { duration: 0.35, delay: 0.1 },
                        }}
                      >
                        <div className="cs-brief-reveal-inner">
                          {/* Holographic grid overlay */}
                          <div
                            className="cs-brief-holo-grid"
                            aria-hidden="true"
                          />

                          {/* Full 2-line answer with typewriter */}
                          <div className="cs-brief-answer">
                            <TypewriterText
                              key={`faq-${index}`}
                              text={faq.answer}
                            />
                          </div>

                          {/* Bottom topic pill */}
                          <div className="cs-brief-answer-footer">
                            <span className="cs-brief-answer-topic">
                              {faq.topic}
                            </span>
                            <span className="cs-brief-answer-pos">
                              {String(index + 1).padStart(2, "0")}/
                              {String(customerFaqs.length).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>

          <div 
            style={{ 
              marginTop: "32px", 
              paddingLeft: "16px", 
              borderLeft: "3px solid rgba(255, 255, 255, 0.15)",
              fontSize: "14px",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.7)"
            }}
          >
            Looking for more commonly asked questions?{" "}
            <Link 
              href="/faq" 
              style={{ 
                color: "#36b8ff", 
                textDecoration: "underline", 
                textUnderlineOffset: "4px"
              }} 
              className="hover:text-[#25a7eb] transition-colors"
            >
              Click here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
