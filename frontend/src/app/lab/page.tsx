"use client";

import dynamic from "next/dynamic";
import "../globals.css";
import "./lab.css";
import { ArrowUpRight, Bot, Sparkles, Workflow, LineChart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";
import SmoothScroll from "@/components/providers/SmoothScroll";

const RobotHead = dynamic(() => import("@/components/three/RobotHead"), {
  ssr: false,
  loading: () => <div className="lab-robot-loading">Loading the lab…</div>,
});

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

const LabAssistantChatGate = dynamic(() => import("@/components/lab/LabAssistantChatGate"), {
  ssr: false,
});

const LabAuthProvider = dynamic(() => import("@/components/lab/LabAuthProvider"), {
  ssr: false,
});

const LabAdminPanel = dynamic(() => import("@/components/lab/LabAdminPanel"), {
  ssr: false,
});

const WHATSAPP =
  "https://wa.me/918919870959?text=hello,%20I'm%20intterested%20for%20a%20service%20from%20your%20agency,%20please%20explain%20me";

const capabilities = [
  {
    icon: Bot,
    title: "AI Review Funnels",
    description:
      "Automated flows that nudge happy customers to post on Google Maps, lifting your local reputation without any manual chasing.",
  },
  {
    icon: Sparkles,
    title: "Lead Capture Agents",
    description:
      "Conversational agents that qualify visitors in real time, answer questions instantly, and hand warm leads straight to your inbox.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "We wire your POS, billing, and follow-up emails together so repetitive back-office work runs itself in the background.",
  },
  {
    icon: LineChart,
    title: "GEO & AEO Systems",
    description:
      "Entity maps and structured data that make LLMs like ChatGPT, Gemini, and Siri recommend your brand when customers ask.",
  },
];

const experiments = [
  { value: "24/7", label: "Always-on agents handling enquiries" },
  { value: "8+", label: "Automation blueprints ready to deploy" },
  { value: "<1s", label: "Response time for AI lead capture" },
];

export default function LabPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />

      <main className="lab-main">
        {/* ── Intro ─────────────────────────────────────────── */}
        <section className="lab-container lab-intro">
          <SectionBadge label="The Lab" number="11" />
          <div className="lab-intro-grid">
            <h1 className="lab-title">
              Where we build the
              <br />
              <span>AI systems</span> behind the brand.
            </h1>
            <p className="lab-lead">
              The Lab is where AigleOn Labs prototypes the automations, agents, and
              intelligence that quietly power our clients&apos; growth — long after the
              website ships.
            </p>
          </div>
        </section>

        {/* ── Robot centerpiece ─────────────────────────────── */}
        <section className="lab-container lab-section">
          <div className="lab-stage">
            <div className="lab-stage-copy">
              <p className="lab-eyebrow">Meet the assistant</p>
              <h2>It watches. It responds.</h2>
              <p>
                Move your cursor around — the head follows you, the same way our
                agents track every visitor, message, and lead in real time. Every
                system we ship is built to stay attentive so you never have to be.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="lab-btn"
              >
                Build one for your business
                <ArrowUpRight />
              </a>
            </div>

            <div className="lab-stage-visual lab-robot">
              <RobotHead />
            </div>
          </div>

          {/* stat strip */}
          <div className="lab-stats">
            {experiments.map((item) => (
              <div key={item.label} className="lab-stat">
                <p className="lab-stat-value">{item.value}</p>
                <p className="lab-stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Capabilities ──────────────────────────────────── */}
        <section className="lab-container lab-section">
          <div className="lab-caps-head">
            <SectionBadge label="What we experiment with" number="12" />
            <h2>Custom intelligence, wired into your day-to-day.</h2>
          </div>

          <div className="lab-caps-grid">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <div key={title} className="lab-card">
                <span className="lab-card-icon">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ask the Lab ───────────────────────────────────── */}
        <section className="lab-container lab-section">
          <div className="lab-caps-head">
            <SectionBadge label="Ask the assistant" number="13" />
            <h2>Have a question about AigleOn Labs? Ask it here.</h2>
          </div>
          <div style={{ marginTop: "40px", maxWidth: "640px" }}>
            <LabAuthProvider>
              <LabAssistantChatGate />
            </LabAuthProvider>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="lab-container lab-final">
          <div className="lab-final-card">
            <div>
              <h2>Want an AI system working for you?</h2>
              <p>
                Tell us where your time goes today. We&apos;ll map an automation that
                takes it off your plate.
              </p>
            </div>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="lab-btn"
            >
              Start a project
              <ArrowUpRight />
            </a>
          </div>
        </section>

        {/* ── Knowledge base admin (hidden behind toggle) ────── */}
        <section className="lab-container" style={{ paddingBottom: "64px" }}>
          <LabAdminPanel />
        </section>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
