"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Search, 
  FileText, 
  Cpu, 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  ChevronRight,
  CreditCard
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export interface ActionStep {
  number: string;
  stepId: number;
  shortTitle: string;
  fullTitle: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: any;
}

export const actionSteps: ActionStep[] = [
  {
    number: "01",
    stepId: 1,
    shortTitle: "1. Complete Brand Audit",
    fullTitle: "Complete Brand Audit",
    tagline: "Analyzing baseline identity, presence, and friction points",
    description:
      "We begin with a complete brand audit to thoroughly analyze your business identity, current digital presence, market positioning, existing workflows, and conversion bottlenecks to establish a clear baseline for growth.",
    highlights: [
      "Comprehensive digital footprint and asset evaluation",
      "Market standing and competitor positioning analysis",
      "Identification of conversion friction and workflow bottlenecks"
    ],
    icon: Search
  },
  {
    number: "02",
    stepId: 2,
    shortTitle: "2. Building a Strategy Doc",
    fullTitle: "Building a Strategy Doc",
    tagline: "Tailored system blueprint based on deep market analysis",
    description:
      "We craft a custom strategy document detailing which digital systems your business needs most at its current stage, specific situation, and market environment based on in depth analysis.",
    highlights: [
      "Stage specific system prioritization",
      "Comprehensive market and situation analysis",
      "Strategic roadmap tailored for maximum return on investment"
    ],
    icon: FileText
  },
  {
    number: "03",
    stepId: 3,
    shortTitle: "3. Implementing the Required Systems",
    fullTitle: "Implementing the Required Systems",
    tagline: "Deploying requested core systems along with strategic recommendations",
    description:
      "We implement the required core systems your business needs, mainly high converting web platforms, customer acquisition engines, automated lead workflows, and robust backend infrastructure. Additionally, we present our strategic analysis recommendations, and if approved by the founder, we implement those alongside the main package.",
    highlights: [
      "Deployment of required web, funnel, and backend infrastructure systems",
      "Proactive analysis backed system recommendations",
      "Seamless integration of founder approved additions"
    ],
    icon: Cpu
  },
  {
    number: "04",
    stepId: 4,
    shortTitle: "4. Parallel Metrics & Full KPI Tracking",
    fullTitle: "Parallel Metrics & Full KPI Tracking",
    tagline: "Parallel build analytics and 30-day active measurement",
    description:
      "After building the first system, while developing subsequent systems in parallel, we continuously analyze real time performance metrics of previous and combined systems. Upon contract completion, all systems are delivered and we actively measure all business KPIs for 30 days.",
    highlights: [
      "Parallel system development and performance optimization",
      "Real time cross system metric analysis",
      "30 days of active post delivery KPI tracking"
    ],
    icon: BarChart3
  },
  {
    number: "05",
    stepId: 5,
    shortTitle: "5. Upgrading to Retainer & Scaling",
    fullTitle: "Upgrading to Retainer & Scaling",
    tagline: "Post-launch evaluation and continuous business upgrades",
    description:
      "Following final payment, we evaluate 1 to 2 weeks of live operational data to recommend a strategic business upgrade step or transition your business seamlessly into an ongoing growth retainer.",
    highlights: [
      "1 to 2 week post launch performance review",
      "Strategic business upgrade recommendations",
      "Smooth transition into ongoing retainer options"
    ],
    icon: TrendingUp
  }
];

export const paymentMilestones = [
  {
    percentage: "20%",
    stage: "Advance Payment",
    timing: "Before Delivery & Project Kickoff",
    description: "20% advance must be paid before initiation to secure team allocation, configure project infrastructure, and begin the brand audit."
  },
  {
    percentage: "50%",
    stage: "Post-Work Payment",
    timing: "After Work Completion",
    description: "50% paid after system development work is completed and verified by your team prior to final deployment."
  },
  {
    percentage: "20%",
    stage: "Results Milestone",
    timing: "After Active Metric Results",
    description: "Remaining 20% paid after performance results and active business KPI measurement during the post launch evaluation window."
  }
];

export default function Process() {
  const [activeStepModal, setActiveStepModal] = useState<ActionStep | null>(null);

  const themeTitleFont = "var(--font-syne), var(--font-display), sans-serif";

  return (
    <section 
      id="process-section" 
      style={{
        position: 'relative',
        paddingTop: '70px',
        paddingBottom: '80px',
        backgroundColor: '#030408',
        color: '#ffffff',
        overflow: 'hidden'
      }}
    >
      {/* Subtle ambient lighting */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '650px',
          height: '300px',
          backgroundColor: 'rgba(0, 136, 255, 0.08)',
          filter: 'blur(130px)',
          pointerEvents: 'none',
          borderRadius: '9999px'
        }} 
      />
      
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 45px auto' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '14px' }}>
            <SectionBadge label="Our Action Plan" number="05" />
          </div>
          
          <h2 style={{
            fontFamily: themeTitleFont,
            fontSize: 'clamp(3rem, 6.5vw, 7rem)',
            fontWeight: 400,
            lineHeight: 0.84,
            letterSpacing: '-0.08em',
            color: '#ffffff',
            marginBottom: '14px'
          }}>
            Our complete
            <br />
            <span style={{ color: '#36b8ff', fontWeight: 400 }}>
              action process.
            </span>
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.5, maxWidth: '600px', margin: '0 auto' }}>
            Click on any step in our 5-phase wave roadmap below to view the detailed breakdown of what happens in each phase.
          </p>
        </div>

        {/* ── DESKTOP WAVE LAYOUT (5 Steps in 2 Rows connected by fluid SVG curve) ── */}
        <div className="hidden lg:block" style={{ position: 'relative', margin: '20px 0', minHeight: '520px' }}>
          
          {/* SVG Wave Ribbon connecting Step 1 -> Step 2 -> Step 3 -> Loop down -> Step 4 -> Step 5 */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
            viewBox="0 0 1000 520"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#36b8ff" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#0088ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#36b8ff" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Continuous SVG Wave Line */}
            <path
              d="M 160 170 
                 C 270 80, 380 65, 500 65 
                 C 620 65, 730 80, 840 170 
                 C 960 280, 920 400, 750 400 
                 C 580 400, 480 340, 350 380 
                 C 250 420, 520 480, 650 460"
              stroke="url(#waveLineGrad)"
              strokeWidth="3.5"
              strokeDasharray="6 5"
              filter="url(#glowEffect)"
              style={{ opacity: 0.8 }}
            />
          </svg>

          {/* ── ROW 1: STEPS 1, 2, 3 ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', position: 'relative', zIndex: 10 }}>
            
            {/* Step 1: Dip Position */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '65px' }}>
              <button
                onClick={() => setActiveStepModal(actionSteps[0])}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#070c18',
                  border: '1px solid rgba(54, 184, 255, 0.35)',
                  borderRadius: '18px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '290px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#36b8ff';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(54, 184, 255, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(54, 184, 255, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.45)';
                }}
              >
                <div style={{
                  fontFamily: themeTitleFont,
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(54, 184, 255, 0.12)',
                  border: '1px solid rgba(54, 184, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#36b8ff',
                  fontWeight: 400,
                  fontSize: '20px',
                  marginBottom: '12px'
                }}>
                  1
                </div>
                <h3 style={{ fontFamily: themeTitleFont, fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px', lineHeight: 1.25 }}>
                  {actionSteps[0].fullTitle}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '10px' }}>
                  {actionSteps[0].tagline}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#36b8ff' }}>
                  <span>Click for details</span>
                  <ChevronRight style={{ width: '14px', height: '14px', marginLeft: '2px' }} />
                </div>
              </button>
            </div>

            {/* Step 2: Crest Position */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '0px' }}>
              <button
                onClick={() => setActiveStepModal(actionSteps[1])}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#070c18',
                  border: '1px solid rgba(54, 184, 255, 0.35)',
                  borderRadius: '18px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '290px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#36b8ff';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(54, 184, 255, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(54, 184, 255, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.45)';
                }}
              >
                <div style={{
                  fontFamily: themeTitleFont,
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(54, 184, 255, 0.12)',
                  border: '1px solid rgba(54, 184, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#36b8ff',
                  fontWeight: 400,
                  fontSize: '20px',
                  marginBottom: '12px'
                }}>
                  2
                </div>
                <h3 style={{ fontFamily: themeTitleFont, fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px', lineHeight: 1.25 }}>
                  {actionSteps[1].fullTitle}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '10px' }}>
                  {actionSteps[1].tagline}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#36b8ff' }}>
                  <span>Click for details</span>
                  <ChevronRight style={{ width: '14px', height: '14px', marginLeft: '2px' }} />
                </div>
              </button>
            </div>

            {/* Step 3: Dip Position (Tail connects down to Row 2) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '65px' }}>
              <button
                onClick={() => setActiveStepModal(actionSteps[2])}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#070c18',
                  border: '1px solid rgba(54, 184, 255, 0.35)',
                  borderRadius: '18px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '290px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#36b8ff';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(54, 184, 255, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(54, 184, 255, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.45)';
                }}
              >
                <div style={{
                  fontFamily: themeTitleFont,
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(54, 184, 255, 0.12)',
                  border: '1px solid rgba(54, 184, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#36b8ff',
                  fontWeight: 400,
                  fontSize: '20px',
                  marginBottom: '12px'
                }}>
                  3
                </div>
                <h3 style={{ fontFamily: themeTitleFont, fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px', lineHeight: 1.25 }}>
                  {actionSteps[2].fullTitle}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '10px' }}>
                  {actionSteps[2].tagline}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#36b8ff' }}>
                  <span>Click for details</span>
                  <ChevronRight style={{ width: '14px', height: '14px', marginLeft: '2px' }} />
                </div>
              </button>
            </div>
          </div>

          {/* ── ROW 2: STEPS 4 & 5 (Tail of 3rd Step connecting to Head of 4th Step) ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', maxWidth: '680px', margin: '65px auto 0 auto', position: 'relative', zIndex: 10 }}>
            
            {/* Step 4: Head connected from Row 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <button
                onClick={() => setActiveStepModal(actionSteps[3])}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#070c18',
                  border: '1px solid rgba(54, 184, 255, 0.35)',
                  borderRadius: '18px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '290px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#36b8ff';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(54, 184, 255, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(54, 184, 255, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.45)';
                }}
              >
                <div style={{
                  fontFamily: themeTitleFont,
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(54, 184, 255, 0.12)',
                  border: '1px solid rgba(54, 184, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#36b8ff',
                  fontWeight: 400,
                  fontSize: '20px',
                  marginBottom: '12px'
                }}>
                  4
                </div>
                <h3 style={{ fontFamily: themeTitleFont, fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px', lineHeight: 1.25 }}>
                  {actionSteps[3].fullTitle}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '10px' }}>
                  {actionSteps[3].tagline}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#36b8ff' }}>
                  <span>Click for details</span>
                  <ChevronRight style={{ width: '14px', height: '14px', marginLeft: '2px' }} />
                </div>
              </button>
            </div>

            {/* Step 5: Final Wave Terminal */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '35px' }}>
              <button
                onClick={() => setActiveStepModal(actionSteps[4])}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#070c18',
                  border: '1px solid rgba(54, 184, 255, 0.35)',
                  borderRadius: '18px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '290px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#36b8ff';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(54, 184, 255, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(54, 184, 255, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.45)';
                }}
              >
                <div style={{
                  fontFamily: themeTitleFont,
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(54, 184, 255, 0.12)',
                  border: '1px solid rgba(54, 184, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#36b8ff',
                  fontWeight: 400,
                  fontSize: '20px',
                  marginBottom: '12px'
                }}>
                  5
                </div>
                <h3 style={{ fontFamily: themeTitleFont, fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px', lineHeight: 1.25 }}>
                  {actionSteps[4].fullTitle}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '10px' }}>
                  {actionSteps[4].tagline}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#36b8ff' }}>
                  <span>Click for details</span>
                  <ChevronRight style={{ width: '14px', height: '14px', marginLeft: '2px' }} />
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* ── MOBILE / TABLET LAYOUT (Balanced Step Cards) ── */}
        <div className="lg:hidden" style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '25px 0 40px 0' }}>
          {actionSteps.map((step) => (
            <button
              key={step.stepId}
              onClick={() => setActiveStepModal(step)}
              style={{
                width: '100%',
                textAlign: 'left',
                backgroundColor: '#070c18',
                border: '1px solid rgba(54, 184, 255, 0.3)',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <div style={{
                  fontFamily: themeTitleFont,
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(54, 184, 255, 0.12)',
                  border: '1px solid rgba(54, 184, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#36b8ff',
                  fontWeight: 800,
                  fontSize: '17px',
                  flexShrink: 0
                }}>
                  {step.stepId}
                </div>
                <div>
                  <h3 style={{ fontFamily: themeTitleFont, fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>
                    {step.fullTitle}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.35 }}>
                    {step.tagline}
                  </p>
                </div>
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#36b8ff',
                flexShrink: 0,
                marginLeft: '10px'
              }}>
                <ChevronRight style={{ width: '16px', height: '16px' }} />
              </div>
            </button>
          ))}
        </div>

        {/* ── PAYMENT MODEL EXPLANATION SECTION ── */}
        <div style={{
          marginTop: '50px',
          backgroundColor: '#070c18',
          border: '1px solid rgba(54, 184, 255, 0.3)',
          borderRadius: '22px',
          padding: '28px 24px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.45)'
        }}>
          <div style={{
            marginBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '18px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#36b8ff',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '6px'
            }}>
              <CreditCard style={{ width: '14px', height: '14px' }} />
              <span>Transparent Milestone Model</span>
            </div>
            <h3 style={{ fontFamily: themeTitleFont, fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 400, letterSpacing: '-0.06em', color: '#ffffff', margin: 0 }}>
              Our Transparent Payment Structure
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {paymentMilestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#03060d',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '20px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontFamily: themeTitleFont, fontSize: '2.5rem', fontWeight: 400, letterSpacing: '-0.06em', color: '#36b8ff' }}>{m.percentage}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', backgroundColor: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      Stage 0{idx + 1}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: themeTitleFont, fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>{m.stage}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#36b8ff', fontWeight: 600, marginBottom: '10px' }}>{m.timing}</p>
                  <p style={{ fontSize: '0.825rem', color: '#cbd5e1', lineHeight: 1.5 }}>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── STEP POPUP MODAL ON CLICK ── */}
      {activeStepModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={() => setActiveStepModal(null)}
        >
          <div
            style={{
              backgroundColor: '#0b101d',
              border: '1px solid rgba(54, 184, 255, 0.4)',
              borderRadius: '22px',
              padding: '26px 22px',
              maxWidth: '540px',
              width: '100%',
              textAlign: 'left',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Close Button */}
            <button
              onClick={() => setActiveStepModal(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div style={{
                fontFamily: themeTitleFont,
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(54, 184, 255, 0.15)',
                border: '1px solid rgba(54, 184, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#36b8ff',
                fontWeight: 400,
                fontSize: '22px',
                flexShrink: 0
              }}>
                {activeStepModal.stepId}
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#36b8ff' }}>
                  Step 0{activeStepModal.stepId} Details
                </span>
                <h3 style={{ fontFamily: themeTitleFont, fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  {activeStepModal.fullTitle}
                </h3>
              </div>
            </div>

            {/* Tagline */}
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#36b8ff',
              marginBottom: '16px',
              backgroundColor: 'rgba(54, 184, 255, 0.1)',
              border: '1px solid rgba(54, 184, 255, 0.25)',
              borderRadius: '12px',
              padding: '10px 14px'
            }}>
              {activeStepModal.tagline}
            </div>

            {/* Description */}
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '20px' }}>
              {activeStepModal.description}
            </p>

            {/* Key Deliverables */}
            <div>
              <h4 style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', marginBottom: '10px' }}>
                Key Action Focus
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeStepModal.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                    <CheckCircle2 style={{ width: '16px', height: '16px', color: '#36b8ff', marginTop: '2px', flexShrink: 0 }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
