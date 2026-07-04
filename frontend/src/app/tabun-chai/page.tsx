"use client";

import dynamic from "next/dynamic";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";
import SmoothScroll from "@/components/providers/SmoothScroll";

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

export default function TabunChaiPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "140px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <section className="section-padding relative overflow-hidden" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div className="mx-auto max-w-[1500px]">
            <header className="services-page-header mb-16">
              <div>
                <SectionBadge label="Case Study" number="01" />
                <h2>
                  Tabun Chai
                  <br />
                  <span>Speculative Case Study.</span>
                </h2>
              </div>
              <p>
                [ Documented Speculative Case Study ]
                <br />
                A deep dive into how we transformed the digital experience for Tabun Chai.
              </p>
            </header>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
