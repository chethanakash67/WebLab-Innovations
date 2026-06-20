"use client";

import dynamic from "next/dynamic";
import "../globals.css";
import { services } from "@/data/projects";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";
import Link from "next/link";
import {
  Search,
  Palette,
  MousePointerClick,
  Code2,
  MessageCircle,
  Zap,
  Brain,
  ArrowUpRight,
} from "lucide-react";

const SmoothScroll = dynamic(
  () => import("@/components/providers/SmoothScroll"),
  { ssr: false }
);

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

const iconMap = {
  Search,
  Palette,
  MousePointerClick,
  Code2,
  MessageCircle,
  Zap,
  Brain,
};

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "140px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <section className="section-padding" style={{ position: "relative" }}>
          <div className="mx-auto max-w-[1500px]">
            <header className="services-page-header">
              <div>
                <SectionBadge label="Capabilities" number="02" />
                <h2>
                  Our Services
                  <br />
                  <span>&amp; Systems.</span>
                </h2>
              </div>
              <p>
                [ What we offer ]
                <br />
                From detailed brand strategy and custom UI designs to high-performance development and custom Agentic AI workflows.
              </p>
            </header>

            <div className="services-page-grid">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Search;
                return (
                  <div key={service.id} className="service-card">
                    <div className="service-card-top">
                      <span className="service-card-number">0{index + 1}</span>
                      <IconComponent className="service-card-icon h-6 w-6" />
                    </div>
                    <h3>
                      {service.title}
                      {service.comingSoon && (
                        <span className="service-badge service-badge-soon" style={{ marginLeft: "8px" }}>Coming Soon</span>
                      )}
                      {service.bonus && (
                        <span className="service-badge service-badge-bonus" style={{ marginLeft: "8px" }}>Bonus</span>
                      )}
                    </h3>
                    <p>{service.description}</p>
                    {service.note && (
                      <p className="service-card-note">{service.note}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "64px", display: "flex", justifyContent: "center" }}>
              <Link href="/pricing" className="button button-muted group">
                Find what do you need (Service Tiers)
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
