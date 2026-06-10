"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/projects";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const phaseOutputs = [
  ["Goals aligned", "Audience mapped", "Scope clarified"],
  ["Product roadmap", "User journeys", "Technical plan"],
  ["Visual direction", "Interface system", "Clickable prototype"],
  ["Production build", "CMS & integrations", "Quality assurance"],
  ["Production launch", "Performance checks", "Ongoing support"],
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

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepDirection, setStepDirection] = useState(1);
  const step = processSteps[activeStep];

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
    <section ref={sectionRef} className="process-section">
      <div className="process-grid-background" />
      <div className="process-wrap">
        <header className="process-header">
          <div className="process-reveal">
            <SectionBadge label="Our Process" number="10" />
          </div>
          <p className="process-reveal">
            [ One clear route ]
            <br />
            No mystery. No disappearing act.
          </p>
        </header>

        <div className="process-heading process-reveal">
          <h2>
            From first thought
            <br />
            <span>to live product.</span>
          </h2>
          <p>
            A practical five-phase system built to keep decisions clear,
            momentum visible, and quality high.
          </p>
        </div>

        <div className="process-console">
          <div className="process-stage">
            <div className="process-stage-top">
              <span>Active phase</span>
              <span>{step.number} / 05</span>
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
                    WebLab delivery system
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
              {processSteps.map((phase, index) => (
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

            {processSteps.map((phase, index) => (
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
                  <span>{phase.description}</span>
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
  );
}
