"use client";

import dynamic from "next/dynamic";
import "../globals.css";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = dynamic(
  () => import("@/components/providers/SmoothScroll"),
  { ssr: false }
);

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

const phaseOutputs = [
  ["Current setup audited", "AEO/SEO gaps identified", "Audit report delivered"],
  ["Growth goals aligned", "Custom action roadmap", "Target audience mapped"],
  ["Wireframes finalized", "Key page flows mapped", "Concept direction set"],
  ["Premium visual system", "Conversion design done", "Figma prototype handoff"],
  ["Clean semantic code", "Fast page speeds", "Responsive framework"],
  ["On-page copy optimized", "Metadata configured", "Search Console verified"],
  ["LLM engine indexing check", "Entity map structured", "GEO campaign blueprint"],
  ["AI review flow deployed", "Lead qualification agent", "Custom API integrations"],
];

const elaboratedSteps = [
  {
    number: "01",
    title: "Brand Audit",
    description:
      "We conduct a comprehensive digital audit analyzing your SEO metrics, site performance, page load speeds, and user experience pain points. We map your competitors and evaluate how your brand represents itself online so that we can identify key growth opportunities.",
  },
  {
    number: "02",
    title: "Strategy Building",
    description:
      "We compile audit insights into an actionable strategy roadmap. We define your target customer profiles, conversion pathways, key marketing priorities, and layout plans. This forms a transparent blueprint aligned with your business objectives before any design work begins.",
  },
  {
    number: "03",
    title: "Mockups & Wireframes",
    description:
      "We design user flow schematics and wireframe skeletons to map the structure and layout of key pages. By establishing early concepts and layout wireframes, we confirm navigation choices, functional priorities, and content placement before applying brand styling.",
  },
  {
    number: "04",
    title: "UX & Visual Design",
    description:
      "We transform wireframes into high-fidelity custom visual interfaces using your brand identity. We craft custom assets, select curated typography, and design high-end glassmorphic interactive layers. Every design is built to increase confidence and guide visitors toward clear calls to action.",
  },
  {
    number: "05",
    title: "SEO-First Development",
    description:
      "We develop clean, light semantic code using high-end frameworks. We optimize for Core Web Vitals, achieving near-perfect load times. This code is structured to ensure search engine crawlers and AI indexes can read, parse, and verify your website context easily.",
  },
  {
    number: "06",
    title: "Non-Tech SEO",
    description:
      "We build descriptive meta structures, structured json-ld schema maps, page titles, and search console verify files. We ensure all images have alt titles and that your pages target queries that potential customers actually search, guaranteeing organic visibility from launch.",
  },
  {
    number: "07",
    title: "GEO & AEO",
    description:
      "For long-term growth, we build custom generative engine optimizations (GEO) and answer engine optimizations (AEO). We structure your site data into entity maps so that modern AI models, LLMs, and voice assistants (like ChatGPT, Gemini, and Siri) recommend your brand.",
  },
  {
    number: "08",
    title: "Custom AI Systems",
    description:
      "We configure tailored AI workflows for your cafe or business. This includes automated review-collection funnels that ask happy customers to post on Google Maps, instant AI lead captures, and email follow-ups. We connect these seamlessly with your existing POS or billing systems.",
  },
];

const phaseTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
};

const phaseVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 18 : -18,
    scale: 0.985,
    filter: "blur(8px)",
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -16 : 16,
    scale: 0.99,
    filter: "blur(8px)",
  }),
};

export default function ProcessPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepDirection, setStepDirection] = useState(1);
  const step = elaboratedSteps[activeStep];

  const selectStep = (index: number) => {
    if (index === activeStep) return;

    setStepDirection(index > activeStep ? 1 : -1);
    setActiveStep(index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-reveal", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".process-console", {
        y: 80,
        opacity: 0,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-console",
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "140px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <section ref={sectionRef} className="process-section" style={{ borderBottom: "none" }}>
          <div className="process-grid-background" />
          <div className="process-wrap">
            <header className="process-header">
              <div className="process-reveal">
                <SectionBadge label="Our Process" number="10" />
              </div>
              <p className="process-reveal">
                [ Detailed Workflow ]
                <br />
                A complete breakdown of our design and development milestones.
              </p>
            </header>

            <div className="process-heading process-reveal" style={{ marginBottom: "64px" }}>
              <h2>
                How We Build
                <br />
                <span>Step by Step.</span>
              </h2>
              <p style={{ maxWidth: "400px" }}>
                An in-depth guide detailing how we move projects from initial strategy alignment to custom AI integrations and launching to production.
              </p>
            </div>

            <div className="process-console">
              <div className="process-stage">
                <div className="process-stage-top">
                  <span>Active phase</span>
                  <span>{step.number} / 08</span>
                </div>

                <AnimatePresence mode="wait" custom={stepDirection}>
                  <motion.div
                    key={step.number}
                    custom={stepDirection}
                    variants={phaseVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={phaseTransition}
                    className="process-stage-content"
                  >
                    <span className="process-stage-number">{step.number}</span>
                    <div>
                      <span className="process-stage-label">
                        AigleOn Labs delivery system
                      </span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>

                    <div className="process-outputs">
                      <span>What leaves this phase</span>
                      <ul>
                        {phaseOutputs[activeStep].map((output) => (
                          <li key={output}>
                            <Check className="h-3.5 w-3.5" />
                            {output}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="process-stage-progress">
                  {elaboratedSteps.map((phase, index) => (
                    <button
                      key={phase.number}
                      type="button"
                      onClick={() => selectStep(index)}
                      className={index <= activeStep ? "is-filled" : ""}
                      aria-label={`Show ${phase.title} phase`}
                    />
                  ))}
                </div>
              </div>

              <div className="process-step-list">
                <div className="process-step-list-label">
                  <span>Full workflow</span>
                  <span>Select a phase</span>
                </div>

                {elaboratedSteps.map((phase, index) => (
                  <button
                    key={phase.number}
                    type="button"
                    onClick={() => selectStep(index)}
                    onMouseEnter={() => selectStep(index)}
                    className={`process-step-row ${activeStep === index ? "is-active" : ""}`}
                  >
                    <span className="process-step-number">{phase.number}</span>
                    <span className="process-step-copy">
                      <strong>{phase.title}</strong>
                      <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.45)" }}>
                        Phase {phase.number} execution milestones
                      </span>
                    </span>
                    <span className="process-step-arrow">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
