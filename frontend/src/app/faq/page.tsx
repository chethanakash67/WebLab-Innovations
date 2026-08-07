"use client";

import dynamic from "next/dynamic";
import "../globals.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";
import { Plus, Minus, Sparkles } from "lucide-react";

import SmoothScroll from "@/components/providers/SmoothScroll";

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

const faqList = [
  {
    id: "timeline",
    topic: "Timeline",
    question: "How long does it take to set up an AI system for my cafe?",
    short: "Most launches fit into a 5-7 day setup window.",
    answer:
      "Most systems are fully functional within 5 to 7 days. We start by analyzing your business workflow, designing the custom AI logic, and testing it with your staff before going live. This timeline includes connecting API integrations and optimizing prompt templates for your specific use cases so that the system runs flawlessly from day one.",
  },
  {
    id: "ownership",
    topic: "Ownership",
    question: "Do I need a developer to run these tools?",
    short: "No technical team is needed after launch.",
    answer:
      "No. We handle the entire setup, coding, configuration, and integration. Once live, the system runs automatically, and updates or settings can be adjusted through a simple admin dashboard or our direct support channel. You do not need to write a single line of code or manage hosting infrastructure.",
  },
  {
    id: "strategy",
    topic: "Strategy",
    question: "What's the difference between a loyalty program and a review follow-up system?",
    short: "One builds reputation; the other brings customers back.",
    answer:
      "Review follow-up builds public reputation by asking happy customers to post reviews on Google Maps, helping you win new customers who search for local options. Loyalty automation keeps your existing customers coming back with personalized offers, birthday discounts, and reminders, directly boosting your repeat visits and customer lifetime value.",
  },
  {
    id: "pricing",
    topic: "Pricing",
    question: "How much do these systems cost?",
    short: "Pricing depends on volume and the systems selected.",
    answer:
      "Pricing depends on your business size, customer volume, and the specific automation systems you select. Most of our tools are designed to pay for themselves quickly by increasing repeat visits and reducing manual work, providing clear ROI within the first month. We offer both flat project setups and recurring maintenance plans.",
  },
  {
    id: "integration",
    topic: "Integration",
    question: "Can it integrate with my existing billing or POS software?",
    short: "Yes, most modern POS and billing tools can connect.",
    answer:
      "Yes. The systems can connect with modern POS and billing tools through simple webhook integrations or custom API connections, so the AI knows when to send the right follow-up at the right time. We support connections to Shopify, Stripe, Square, Clover, and other major platforms.",
  },
];

export default function FAQPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const themeTitleFont = "var(--font-syne), var(--font-display), sans-serif";

  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "120px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <section className="section-padding" style={{ position: "relative", padding: "40px 16px" }}>
          <div className="mx-auto max-w-[1100px]">
            <header className="services-page-header" style={{ marginBottom: "40px" }}>
              <div>
                <SectionBadge label="Information" number="05" />
                <h2 style={{ fontFamily: themeTitleFont, fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, color: "#ffffff", marginTop: "12px" }}>
                  Common Questions
                  <br />
                  <span style={{ color: "#36b8ff" }}>&amp; Answers.</span>
                </h2>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6", marginTop: "12px" }}>
                Detailed answers and technical clarifications for business owners looking to optimize their customer systems and operations.
              </p>
            </header>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {faqList.map((faq, index) => {
                const isActive = index === activeFaqIndex;
                return (
                  <article
                    key={faq.id}
                    style={{
                      position: "relative",
                      backgroundColor: isActive ? "rgba(7, 12, 24, 0.95)" : "rgba(7, 12, 24, 0.6)",
                      border: isActive ? "1px solid rgba(54, 184, 255, 0.45)" : "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: isActive ? "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(54, 184, 255, 0.15)" : "0 4px 16px rgba(0, 0, 0, 0.3)",
                      transition: "all 0.25s ease"
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => toggleFaq(index)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "20px 20px",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left"
                      }}
                    >
                      <div style={{ paddingRight: "16px", flex: 1 }}>
                        <span style={{
                          display: "inline-block",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#36b8ff",
                          marginBottom: "6px"
                        }}>
                          {faq.topic}
                        </span>
                        <strong style={{
                          display: "block",
                          fontFamily: themeTitleFont,
                          fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
                          fontWeight: 600,
                          color: "#ffffff",
                          lineHeight: 1.35
                        }}>
                          {faq.question}
                        </strong>
                      </div>
                      <span style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "9999px",
                        backgroundColor: isActive ? "#36b8ff" : "rgba(255, 255, 255, 0.08)",
                        color: isActive ? "#000000" : "#36b8ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.2s ease"
                      }}>
                        {isActive ? (
                          <Minus size={18} strokeWidth={2.5} />
                        ) : (
                          <Plus size={18} strokeWidth={2.5} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{ 
                            padding: "0 20px 24px 20px", 
                            borderTop: "1px solid rgba(255, 255, 255, 0.08)", 
                            paddingTop: "16px",
                            backgroundColor: "rgba(3, 6, 13, 0.5)"
                          }}>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: "#36b8ff",
                              marginBottom: "12px"
                            }}>
                              <Sparkles size={15} strokeWidth={2} style={{ flexShrink: 0 }} />
                              <span style={{ lineHeight: 1.4 }}>{faq.short}</span>
                            </div>
                            <p style={{
                              color: "#cbd5e1",
                              fontSize: "0.9rem",
                              lineHeight: 1.65,
                              margin: 0,
                              wordBreak: "break-word",
                              overflowWrap: "break-word"
                            }}>
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
