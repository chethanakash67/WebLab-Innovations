"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { testimonials } from "@/data/projects";
import SectionBadge from "@/components/ui/SectionBadge";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % testimonials.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const testimonial = testimonials[current];
  const initials = testimonial.author
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <section ref={sectionRef} className="testimonial-section">
      <div className="testimonial-dots" />
      <div className="testimonial-orbit" />

      <div className="testimonial-wrap">
        <header className="testimonial-header">
          <div>
            <SectionBadge label="Client Proof" number="09" />
            <h2>
              Trusted when
              <br />
              <span>it matters.</span>
            </h2>
          </div>
          <p>
            [ Partners, not passengers ]
            <br />
            Clear thinking. Direct access. Strong delivery.
          </p>
        </header>

        <div className="testimonial-layout">
          <div className="testimonial-people">
            <div className="testimonial-people-label">
              <span>Voices / 03</span>
              <span>Since 2023</span>
            </div>

            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrent(index)}
                className={`testimonial-person ${current === index ? "is-active" : ""}`}
              >
                <span className="testimonial-person-number">0{index + 1}</span>
                <span className="testimonial-person-avatar">
                  {item.author
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </span>
                <span className="testimonial-person-copy">
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            ))}

            <div className="testimonial-rating">
              <strong>5.0</strong>
              <span>★★★★★</span>
              <p>Average client rating</p>
            </div>
          </div>

          <div className="testimonial-stage">
            <div className="testimonial-stage-top">
              <span>Verified collaboration</span>
              <span>0{current + 1} / 0{testimonials.length}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="testimonial-quote"
              >
                <Quote className="testimonial-quote-icon" />
                <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>

                <div className="testimonial-author">
                  <span className="testimonial-author-mark">{initials}</span>
                  <span>
                    <strong>{testimonial.author}</strong>
                    <small>{testimonial.role}</small>
                  </span>
                  <span className="testimonial-verified">
                    <span className="signal-dot" />
                    Verified client
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="testimonial-progress" aria-hidden="true">
              {testimonials.map((item, index) => (
                <span
                  key={item.id}
                  className={current === index ? "is-active" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
