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

  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "140px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <section className="section-padding" style={{ position: "relative" }}>
          <div className="mx-auto max-w-[1500px]">
            <header className="services-page-header">
              <div>
                <SectionBadge label="Information" number="05" />
                <h2>
                  Common Questions
                  <br />
                  <span>&amp; Answers.</span>
                </h2>
              </div>
              <p>
                [ FAQ ]
                <br />
                Detailed answers and technical clarifications for business owners looking to optimize their customer systems and operations.
              </p>
            </header>

            <div className="faq-page-list">
              {faqList.map((faq, index) => {
                const isActive = index === activeFaqIndex;
                return (
                  <article
                    key={faq.id}
                    className={`faq-page-item ${isActive ? "is-active" : ""}`}
                  >
                    <button
                      type="button"
                      className="faq-page-trigger"
                      aria-expanded={isActive}
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="faq-page-trigger-content">
                        <span className="faq-page-topic">{faq.topic}</span>
                        <strong className="faq-page-question">{faq.question}</strong>
                      </div>
                      <span className="faq-page-toggle">
                        {isActive ? (
                          <Minus size={18} strokeWidth={2} />
                        ) : (
                          <Plus size={18} strokeWidth={2} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          className="faq-page-reveal"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                          <div className="faq-page-short-answer">
                            <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
                            {faq.short}
                          </div>
                          <p className="faq-page-full-answer">{faq.answer}</p>
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
