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
                      <span className="story-stats-value text-right">Sai Videsh &amp; Chethan Akash</span>
                    </li>
                    <li className="story-stats-row">
                      <span className="story-stats-label">Founded</span>
                      <span className="story-stats-value text-right">2026, Bangalore</span>
                    </li>
                    <li className="story-stats-row" style={{ alignItems: "flex-start", flexDirection: "column", gap: "6px" }}>
                      <span className="story-stats-label">Core Specialities</span>
                      <span className="story-stats-value" style={{ textAlign: "left" }}>Conversion-focused UI/UX, Technical SEO, AEO (AI Search Visibility)</span>
                    </li>
                    <li className="story-stats-row" style={{ alignItems: "flex-start", flexDirection: "column", gap: "6px" }}>
                      <span className="story-stats-label">Niche Focus</span>
                      <span className="story-stats-value" style={{ textAlign: "left" }}>Specialty food &amp; artisan brands (coffee roasters, chocolatiers, craft beverage)</span>
                    </li>
                    <li className="story-stats-row">
                      <span className="story-stats-label">Markets Served</span>
                      <span className="story-stats-value text-right">India &amp; Global</span>
                    </li>
                    <li className="story-stats-row" style={{ alignItems: "flex-start", flexDirection: "column", gap: "6px" }}>
                      <span className="story-stats-label">Mission Target</span>
                      <span className="story-stats-value" style={{ textAlign: "left" }}>100+ businesses educated on digital visibility in the first 3 months</span>
                    </li>
                  </ul>
                </div>

                <div className="story-sidebar-card">
                  <h3 className="text-white">Our Philosophy</h3>
                  <p>
                    We believe in showing, not telling. Before we ever pitch a service, we run a free audit and a live demo, right there on the call, of exactly where a brand stands today on Google and on AI search like ChatGPT. We'd rather a founder see the gap with their own eyes than take our word for it, because the moment they see it, they understand why we exist.
                  </p>
                </div>
              </aside>

              <div className="story-timeline">
                {/* Phase 01 */}
                <article className="story-timeline-item">
                  <div className="story-timeline-dot" />
                  <header className="mb-4">
                    <div className="story-timeline-meta">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Phase 01</span>
                    </div>
                    <h3>The Call</h3>
                  </header>
                  <div className="story-timeline-content">
                    <p>
                      A weekend night, half past ten, and a phone call that wasn't planned to mean anything. One of us at IIIT, the other at SRM, both quietly worn out from chasing the same DSA sheets and the same 9-to-5 dream everyone around us seemed to want without ever asking why. We weren't pitching each other an idea. We were just two people admitting we wanted to build with what we actually knew, not what a resume expected from us.
                    </p>
                    <p>
                      By the time we hung up, there was no business plan on the table, no funding lined up, no mentor guiding the next step. There was only a decision. We agreed to stop preparing for a future someone else had already written for us, and to start shaping one ourselves, even without knowing exactly where it would lead.
                    </p>
                  </div>
                </article>

                {/* Phase 02 */}
                <article className="story-timeline-item">
                  <div className="story-timeline-dot" />
                  <header className="mb-4">
                    <div className="story-timeline-meta">
                      <Rocket className="h-3.5 w-3.5" />
                      <span>Phase 02</span>
                    </div>
                    <h3>Building Without Knowing Why</h3>
                  </header>
                  <div className="story-timeline-content">
                    <p>
                      What followed was months of late nights, shipping small apps and bits of software, mostly just to find out if anyone outside our heads would actually use what we made. There was no specific problem we were chasing yet. We were learning by doing, putting things into the world and watching what people picked up and what they walked past.
                    </p>
                    <p>
                      A lot of what we built went nowhere, and looking back, that mattered more than it felt like at the time. Every dead end quietly taught us something about the gap between what feels impressive to build and what someone genuinely needs. Somewhere in those months, the question in our heads changed, from what can we build, to who is actually waiting for this.
                    </p>
                  </div>
                </article>

                {/* Phase 03 */}
                <article className="story-timeline-item">
                  <div className="story-timeline-dot" />
                  <header className="mb-4">
                    <div className="story-timeline-meta">
                      <Target className="h-3.5 w-3.5" />
                      <span>Phase 03</span>
                    </div>
                    <h3>Finding the Gap</h3>
                  </header>
                  <div className="story-timeline-content">
                    <p>
                      Somewhere in all that building, we started looking closer at specialty food and artisan brands, coffee roasters, chocolate makers, small businesses with a real product and a real story behind it. My friend had been drawn to these brands for a while, and the more we looked, the more it made sense to me too. They weren't bad businesses. They were just invisible, in ways nobody had bothered to explain to them.
                    </p>
                    <p>
                      Most of them had a website because someone told them they needed one, not because they understood what it was supposed to do. Nobody had told them why a good-looking page still doesn't get found on Google, or why ChatGPT recommends a competitor instead of them. That gap, between having a product worth buying and being findable at all, is where we decided to plant ourselves.
                    </p>
                  </div>
                </article>

                {/* Phase 04 */}
                <article className="story-timeline-item">
                  <div className="story-timeline-dot" />
                  <header className="mb-4">
                    <div className="story-timeline-meta">
                      <Award className="h-3.5 w-3.5" />
                      <span>Phase 04</span>
                    </div>
                    <h3>The AigleOn Labs</h3>
                  </header>
                  <div className="story-timeline-content">
                    <p>
                      That's how The AigleOn Labs came together. Chethan brought the eye for interfaces that don't just sit there looking nice but actually move someone from curious to convinced. I brought the technical side, SEO, AEO, the stuff that decides whether a brand even shows up when someone's searching or asking an AI for a recommendation.
                    </p>
                    <p>
                      Our mission isn't complicated to say, even if it's harder to deliver. We want to reach over 100 businesses in the next few months, talk to them directly, and show them what's actually happening behind their website. Because vibe coding can make something look fine, but looking fine and converting a visitor into a customer have never been the same thing.
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
