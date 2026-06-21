"use client";

import dynamic from "next/dynamic";
import { Sparkles, Calendar, Award, Target, Rocket } from "lucide-react";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";

import SmoothScroll from "@/components/providers/SmoothScroll";

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

export default function StoryPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "140px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <section className="section-padding relative overflow-hidden" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div className="mx-auto max-w-[1500px]">
            <header className="services-page-header mb-16">
              <div>
                <SectionBadge label="The Narrative" number="08" />
                <h2>
                  Our Story
                  <br />
                  <span>&amp; Foundations.</span>
                </h2>
              </div>
              <p>
                [ The Journey ]
                <br />
                How two founders combined custom interface design and generative engine optimization to build a future-proof brand growth studio.
              </p>
            </header>

            <div className="story-page-layout">
              <aside className="story-page-sidebar">
                <div className="story-sidebar-card">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/10 rounded-full blur-2xl pointer-events-none" />
                  <h3 className="text-white">
                    <Sparkles className="h-5 w-5 text-primary-light" />
                    Quick Stats
                  </h3>
                  <ul className="story-stats-list">
                    <li className="story-stats-row">
                      <span className="story-stats-label">Founders</span>
                      <span className="story-stats-value">Chethan Akash &amp; Sai Videsh</span>
                    </li>
                    <li className="story-stats-row">
                      <span className="story-stats-label">HQ</span>
                      <span className="story-stats-value">India / Global</span>
                    </li>
                    <li className="story-stats-row">
                      <span className="story-stats-label">Core Specialties</span>
                      <span className="story-stats-value">UI/UX, SEO, GEO, AEO</span>
                    </li>
                    <li className="story-stats-row">
                      <span className="story-stats-label">Academic Roots</span>
                      <span className="story-stats-value">IIIT</span>
                    </li>
                  </ul>
                </div>

                <div className="story-sidebar-card">
                  <h3 className="text-white">Our Philosophy</h3>
                  <p>
                    We believe the internet is transitioning from static list-based searches (Google indexing) to dynamic, direct answers powered by LLMs and Agentic workflows. Our mission is to ensure your brand is not just visually stunning, but technically optimal to be recommended by these systems.
                  </p>
                </div>
              </aside>

              <div className="story-timeline">
                {/* Milestone 1 */}
                <article className="story-timeline-item">
                  <div className="story-timeline-dot" />
                  <header className="mb-4">
                    <div className="story-timeline-meta">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Phase 1: The Incubation at IIIT</span>
                    </div>
                    <h3>Where Code Met Design</h3>
                  </header>
                  <div className="story-timeline-content">
                    <p className="text-primary-light font-medium">
                      [Placeholder Details - To be updated with exact story]
                    </p>
                    <p>
                      Our story begins in the classrooms and laboratories of IIIT. Spending countless nights working on advanced software systems, we noticed a persistent disconnect: engineering products were often built with incredible logic but lacked visual clarity, while beautiful websites often lacked semantic technical depth.
                    </p>
                    <p>
                      We began collaborating—Chethan focusing on refining user interfaces and interaction flows, and Sai optimizing search systems, schemas, and performance architectures. Together, we designed digital solutions for academic projects that immediately gained attention for their seamless utility and aesthetics.
                    </p>
                  </div>
                </article>

                {/* Milestone 2 */}
                <article className="story-timeline-item">
                  <div className="story-timeline-dot" />
                  <header className="mb-4">
                    <div className="story-timeline-meta">
                      <Award className="h-3.5 w-3.5" />
                      <span>Phase 2: The Shift to AI &amp; Agentic Search</span>
                    </div>
                    <h3>Identifying the Paradigm Shift</h3>
                  </header>
                  <div className="story-timeline-content">
                    <p className="text-primary-light font-medium">
                      [Placeholder Details - To be updated with exact story]
                    </p>
                    <p>
                      As Large Language Models and AI systems began replacing traditional search processes, we recognized that simply ranking on Google page one was no longer enough. Modern users ask ChatGPT, Claude, and Perplexity for recommendations, which bypass traditional link lists entirely.
                    </p>
                    <p>
                      We realized that local and global brands needed a new kind of visibility partner. They needed an agency that understood Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO), ensuring that search agents recommend their business directly in generated answers.
                    </p>
                  </div>
                </article>

                {/* Milestone 3 */}
                <article className="story-timeline-item">
                  <div className="story-timeline-dot" />
                  <header className="mb-4">
                    <div className="story-timeline-meta">
                      <Rocket className="h-3.5 w-3.5" />
                      <span>Phase 3: The Birth of The AigleOn Labs</span>
                    </div>
                    <h3>Building the Visibility Engine</h3>
                  </header>
                  <div className="story-timeline-content">
                    <p className="text-primary-light font-medium">
                      [Placeholder Details - To be updated with exact story]
                    </p>
                    <p>
                      We founded The AigleOn Labs with a singular core standard: to build digital products that are pixel-perfect, lightning-fast, and search-optimized by default. By merging premium brand UI design with structured semantic markup, schema, and API-first AI agents, we give businesses the visibility they deserve.
                    </p>
                    <p>
                      Today, we continue to serve ambitious SaaS startups and local businesses, helping them transition into the new era of search engines and interactive customer workflows.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
