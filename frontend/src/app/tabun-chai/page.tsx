"use client";

import dynamic from "next/dynamic";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { CheckCircle2, TrendingUp, Search, Smartphone, Users, MapPin, ArrowRight } from "lucide-react";

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

const caseStudySections = [
  {
    id: "01",
    title: "The Hero Section",
    points: [
      {
        title: "Above-the-Fold Clarity",
        implementation: "Core experience (vibe, context, action) fits 100% inside a single glass card before scrolling.",
        conversion: "Reduces bounce rate by answering 'What is this?' instantly within the critical 3-5 second window.",
        loss: "Risk losing 40-60% of mobile traffic to users unwilling to dig through massive full-screen content."
      },
      {
        title: "Fitts's Law & Thumb Zone",
        implementation: "Primary CTAs are exactly 44px high and placed at the bottom of the card in the mobile 'thumb zone'.",
        conversion: "Measurable increase in CTR. Large, reachable targets reduce physical friction for one-handed use.",
        loss: "Small touch targets cause mis-taps, frustration, and task abandonment."
      },
      {
        title: "Loss Aversion & Urgency",
        implementation: "Pulsing 'Live now' badge and 'Today's special' chip.",
        conversion: "Leverages FOMO to trigger immediate footfall and same-day action.",
        loss: "Without urgency, the site becomes a static brochure, losing impulse buyers to 'maybe later'."
      }
    ]
  },
  {
    id: "02",
    title: "Time-Sensitive Offers",
    points: [
      {
        title: "Live Countdown Timers",
        implementation: "Calculates exact end time of the current offer with a live ticking countdown.",
        conversion: "Drives urgent walk-ins. Behavioral economics prove people act faster to prevent a 'lost' deal.",
        loss: "Static text removes psychological pressure, causing users to defer decisions and costing today's revenue."
      },
      {
        title: "Progressive Disclosure",
        implementation: "System checks local time and displays only the single currently active offer.",
        conversion: "Creates zero-friction decision making without needing users to calculate schedules.",
        loss: "Displaying all offers creates cognitive overload. Confusion leads directly to abandonment."
      },
      {
        title: "Social Proof Proximity",
        implementation: "Highly specific data tags ('260+ Happy Customers', 'Avg Prep: 4-6 mins') placed beside the offer.",
        conversion: "Squashes doubts instantly at the point of action, handling objections about quality or wait time.",
        loss: "Burying proof on other pages means users won't hunt for validation, skipping you for known alternatives."
      }
    ]
  },
  {
    id: "03",
    title: "Real Talks (Testimonials)",
    points: [
      {
        title: "Interactive Flip Cards",
        implementation: "Front shows 3 core data points. Interaction reveals the full paragraph and external URL.",
        conversion: "Prevents cognitive overload and boosts engagement time by 20-30% via micro-interactions.",
        loss: "Displaying massive text walls causes visual fatigue and users will scroll past without reading."
      },
      {
        title: "Jakob's Law (Familiarity)",
        implementation: "Reviews perfectly mirror Google Maps UI patterns (Local Guide, 5-star formatting).",
        conversion: "Instant trust processing (< 0.5s) as users subconsciously verify them as real, unedited reviews.",
        loss: "Custom layouts breed skepticism. Users distrust 'polished' website quotes 3x more than standard formats."
      },
      {
        title: "Anchoring Effect",
        implementation: "Section anchored with a hard aggregate data point: '4.8 / 5 based on 48 Google reviews'.",
        conversion: "Establishes a massive trust baseline. Aggregate scale is valued exponentially more than isolated quotes.",
        loss: "Without the total count, users assume the displayed cards are the only good reviews you have."
      },
      {
        title: "Von Restorff Effect",
        implementation: "Transition from text grids to an interactive, overlapping 'Live Moments' photo stack.",
        conversion: "High visual retention. Isolated, interactive elements command up to 40% more fixation time.",
        loss: "A flat photo grid blends in, causing 'banner blindness' and missing the visual proof of atmosphere."
      }
    ]
  },
  {
    id: "04",
    title: "Location & Contact",
    points: [
      {
        title: "Visual Isolation",
        implementation: "Flagship branch is visually isolated with background images, glowing badges, and prominent CTAs.",
        conversion: "Consolidated foot traffic. Naturally funnels undecided users to the primary location.",
        loss: "Uniform lists introduce decision fatigue, overwhelming users and leading to abandonment."
      },
      {
        title: "Mental Models",
        implementation: "Contact utilities strictly housed inside the TrustUtilityFooter at the absolute bottom.",
        conversion: "High task completion. Meets universal web standards so users intuitively find what they need.",
        loss: "Burying contact info mid-page misses users who natively scroll to the footer to make calls."
      },
      {
        title: "Thumb Zone Design",
        implementation: "Primary 'Check Location' h-11 buttons and 32x32 footer SVGs with built-in padding.",
        conversion: "Zero-friction mapping. Large targets allow flawless map opening while walking or driving.",
        loss: "Small text links drastically increase mis-tap rates, frustrating high-intent users."
      },
      {
        title: "Mere-Exposure Effect",
        implementation: "Every branch uses identical button formatting and text ('Check Location').",
        conversion: "Reduced cognitive friction. Repetition breeds familiarity, keeping users in flow.",
        loss: "Varying text burns mental energy as users pause to process if buttons have different functions."
      }
    ]
  }
];

export default function TabunChaiPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main className="w-full flex flex-col items-center overflow-hidden" style={{ paddingTop: "140px", minHeight: "100vh", position: "relative", zIndex: 10, background: "#0a0f19" }}>
        
        {/* HERO SECTION */}
        <section className="section-padding relative overflow-hidden w-full flex justify-center" style={{ paddingBottom: '64px', borderBottom: "1px solid rgba(230, 161, 92, 0.1)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#e6a15c]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="w-full max-w-[1200px] relative z-10 flex flex-col items-center px-4">
            <SectionBadge label="Case Study" number="01" />
            <h1 className="text-5xl md:text-7xl font-bold text-[#f4ebd9] text-center w-full" style={{ fontFamily: "var(--font-display)", marginTop: '24px', marginBottom: '16px' }}>
              Tabun Chai
            </h1>
            <p className="text-xl md:text-3xl text-[#e6a15c] font-light tracking-wide text-center w-full" style={{ marginBottom: '24px', lineHeight: '1.4' }}>
              How we transformed a fragmented digital presence into a seamless, high-converting customer acquisition engine. A Documented Study
            </p>
          </div>
        </section>

        {/* STRATEGIC VALUE BRIEF */}
        <section className="section-padding relative w-full flex justify-center" style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: "1px solid rgba(230, 161, 92, 0.1)" }}>
          <div className="w-full max-w-[1400px] px-4 flex flex-col items-center">
            <div className="w-full text-center flex flex-col items-center" style={{ marginBottom: '64px' }}>
              <h2 className="text-4xl md:text-5xl font-bold text-[#f4ebd9] text-center w-full" style={{ fontFamily: "var(--font-display)", marginBottom: '16px' }}>
                The Strategic Value of a Premium Aesthetic
              </h2>
              <p className="text-gray-400 text-lg text-center w-full max-w-3xl" style={{ lineHeight: '1.6' }}>
                The visual architecture, deep roasted palettes, frosted glass, fluid animations act as a psychological pre-conditioner. It signals hygiene, premium quality, and comfort, justifying pricing and building brand equity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full" style={{ gap: '32px' }}>
              
              {/* Card 1 */}
              <div className="relative h-[380px] w-full">
                <div className="absolute top-0 left-0 w-full min-h-[380px] bg-[#11151a]/80 backdrop-blur-xl rounded-[2rem] border border-[#e6a15c]/10 group hover:-translate-y-4 hover:z-50 z-10 transition-all duration-500 shadow-[0_0_20px_rgba(230,161,92,0.05)] hover:shadow-[0_0_40px_rgba(230,161,92,0.2)] flex flex-col items-center text-center cursor-pointer overflow-hidden" style={{ padding: '32px 24px' }}>
                  {/* Asymmetrical Fluid Coffee Wave */}
                  <div className="absolute top-[45%] -left-20 w-80 h-80 bg-[#b87333]/40 rounded-full blur-[70px] animate-wave-flow pointer-events-none mix-blend-screen" />
                  <div className="absolute -bottom-10 left-[10%] w-96 h-72 bg-[#8b5a2b]/40 rounded-full blur-[70px] animate-wave-flow-reverse pointer-events-none mix-blend-screen" style={{ animationDelay: '-4s' }} />
                  <div className="absolute -bottom-32 -right-16 w-80 h-64 bg-[#cd853f]/20 rounded-full blur-[70px] animate-wave-flow pointer-events-none mix-blend-screen" style={{ animationDelay: '-8s' }} />
                  
                  {/* Centered Visible Content */}
                  <div className="flex flex-col items-center justify-center w-full h-[316px] group-hover:h-[140px] transition-all duration-500 ease-in-out relative z-20">
                    <h3 className="text-[#f4ebd9] text-2xl font-semibold w-full transition-transform duration-500 group-hover:-translate-y-1" style={{ marginBottom: '12px' }}>The "Glassmorphism" Effect</h3>
                    <p className="text-[#e6a15c] text-sm font-medium tracking-wide transition-all duration-500 group-hover:text-[#f4ebd9]" style={{ textShadow: '0 0 10px rgba(230,161,92,0.5)' }}>Frosted aesthetics for a premium, transparent feel.</p>
                  </div>

                  {/* Hidden Content that Opens Up */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out w-full relative z-20">
                    <div className="overflow-hidden flex flex-col">
                      <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75" style={{ gap: '8px' }}>
                        <div className="bg-transparent rounded-xl border border-[#b87333]/50 w-full flex flex-col items-center" style={{ padding: '12px 16px' }}>
                          <strong className="text-[#b87333] text-xs uppercase block text-center tracking-wider" style={{ textShadow: '0 0 10px rgba(184,115,51,0.4)', marginBottom: '4px' }}>Built as</strong>
                          <p className="text-gray-200 text-xs leading-relaxed">Semi-transparent cards with deep blurs instead of flat color blocks.</p>
                        </div>
                        <div className="bg-[#f4ebd9]/10 rounded-xl border border-[#f4ebd9]/20 backdrop-blur-md w-full flex flex-col items-center shadow-[0_0_15px_rgba(244,235,217,0.05)]" style={{ padding: '12px 16px' }}>
                          <strong className="text-[#e6a15c] text-xs uppercase block text-center tracking-wider" style={{ textShadow: '0 0 10px rgba(230,161,92,0.4)', marginBottom: '4px' }}>Users get..</strong>
                          <p className="text-[#f4ebd9] text-xs leading-relaxed">Subconscious signals of transparency and cleanliness. A polished storefront implies a meticulously clean physical kitchen.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative h-[380px] w-full">
                <div className="absolute top-0 left-0 w-full min-h-[380px] bg-[#11151a]/80 backdrop-blur-xl rounded-[2rem] border border-[#e6a15c]/10 group hover:-translate-y-4 hover:z-50 z-10 transition-all duration-500 shadow-[0_0_20px_rgba(230,161,92,0.05)] hover:shadow-[0_0_40px_rgba(230,161,92,0.2)] flex flex-col items-center text-center cursor-pointer overflow-hidden" style={{ padding: '32px 24px' }}>
                  {/* Asymmetrical Fluid Coffee Wave */}
                  <div className="absolute top-[45%] -left-20 w-80 h-80 bg-[#b87333]/40 rounded-full blur-[70px] animate-wave-flow pointer-events-none mix-blend-screen" />
                  <div className="absolute -bottom-10 left-[10%] w-96 h-72 bg-[#8b5a2b]/40 rounded-full blur-[70px] animate-wave-flow-reverse pointer-events-none mix-blend-screen" style={{ animationDelay: '-4s' }} />
                  <div className="absolute -bottom-32 -right-16 w-80 h-64 bg-[#cd853f]/20 rounded-full blur-[70px] animate-wave-flow pointer-events-none mix-blend-screen" style={{ animationDelay: '-8s' }} />
                  
                  {/* Centered Visible Content */}
                  <div className="flex flex-col items-center justify-center w-full h-[316px] group-hover:h-[140px] transition-all duration-500 ease-in-out relative z-20">
                    <h3 className="text-[#f4ebd9] text-2xl font-semibold w-full transition-transform duration-500 group-hover:-translate-y-1" style={{ marginBottom: '12px' }}>Rounded Architecture</h3>
                    <p className="text-[#e6a15c] text-sm font-medium tracking-wide transition-all duration-500 group-hover:text-[#f4ebd9]" style={{ textShadow: '0 0 10px rgba(230,161,92,0.5)' }}>Soft edges engineered for psychological comfort.</p>
                  </div>

                  {/* Hidden Content that Opens Up */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out w-full relative z-20">
                    <div className="overflow-hidden flex flex-col">
                      <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75" style={{ gap: '8px' }}>
                        <div className="bg-transparent rounded-xl border border-[#b87333]/50 w-full flex flex-col items-center" style={{ padding: '12px 16px' }}>
                          <strong className="text-[#b87333] text-xs uppercase block text-center tracking-wider" style={{ textShadow: '0 0 10px rgba(184,115,51,0.4)', marginBottom: '4px' }}>Built as</strong>
                          <p className="text-gray-200 text-xs leading-relaxed">Pill buttons and 32px soft corners with zero sharp, aggressive edges.</p>
                        </div>
                        <div className="bg-[#f4ebd9]/10 rounded-xl border border-[#f4ebd9]/20 backdrop-blur-md w-full flex flex-col items-center shadow-[0_0_15px_rgba(244,235,217,0.05)]" style={{ padding: '12px 16px' }}>
                          <strong className="text-[#e6a15c] text-xs uppercase block text-center tracking-wider" style={{ textShadow: '0 0 10px rgba(230,161,92,0.4)', marginBottom: '4px' }}>Users get..</strong>
                          <p className="text-[#f4ebd9] text-xs leading-relaxed">A sense of approachability and safety, aligning perfectly with a relaxing cafe vibe to keep them on the page longer.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative h-[380px] w-full">
                <div className="absolute top-0 left-0 w-full min-h-[380px] bg-[#11151a]/80 backdrop-blur-xl rounded-[2rem] border border-[#e6a15c]/10 group hover:-translate-y-4 hover:z-50 z-10 transition-all duration-500 shadow-[0_0_20px_rgba(230,161,92,0.05)] hover:shadow-[0_0_40px_rgba(230,161,92,0.2)] flex flex-col items-center text-center cursor-pointer overflow-hidden" style={{ padding: '32px 24px' }}>
                  {/* Asymmetrical Fluid Coffee Wave */}
                  <div className="absolute top-[45%] -left-20 w-80 h-80 bg-[#b87333]/40 rounded-full blur-[70px] animate-wave-flow pointer-events-none mix-blend-screen" />
                  <div className="absolute -bottom-10 left-[10%] w-96 h-72 bg-[#8b5a2b]/40 rounded-full blur-[70px] animate-wave-flow-reverse pointer-events-none mix-blend-screen" style={{ animationDelay: '-4s' }} />
                  <div className="absolute -bottom-32 -right-16 w-80 h-64 bg-[#cd853f]/20 rounded-full blur-[70px] animate-wave-flow pointer-events-none mix-blend-screen" style={{ animationDelay: '-8s' }} />
                  
                  {/* Centered Visible Content */}
                  <div className="flex flex-col items-center justify-center w-full h-[316px] group-hover:h-[140px] transition-all duration-500 ease-in-out relative z-20">
                    <h3 className="text-[#f4ebd9] text-2xl font-semibold w-full transition-transform duration-500 group-hover:-translate-y-1" style={{ marginBottom: '12px' }}>Deep-Roasted Color</h3>
                    <p className="text-[#e6a15c] text-sm font-medium tracking-wide transition-all duration-500 group-hover:text-[#f4ebd9]" style={{ textShadow: '0 0 10px rgba(230,161,92,0.5)' }}>Sensory anticipation via dark, warm palettes.</p>
                  </div>

                  {/* Hidden Content that Opens Up */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out w-full relative z-20">
                    <div className="overflow-hidden flex flex-col">
                      <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75" style={{ gap: '8px' }}>
                        <div className="bg-transparent rounded-xl border border-[#b87333]/50 w-full flex flex-col items-center" style={{ padding: '12px 16px' }}>
                          <strong className="text-[#b87333] text-xs uppercase block text-center tracking-wider" style={{ textShadow: '0 0 10px rgba(184,115,51,0.4)', marginBottom: '4px' }}>Built as</strong>
                          <p className="text-gray-200 text-xs leading-relaxed">Deep roasted blacks illuminated by warm ambers and soft golds.</p>
                        </div>
                        <div className="bg-[#f4ebd9]/10 rounded-xl border border-[#f4ebd9]/20 backdrop-blur-md w-full flex flex-col items-center shadow-[0_0_15px_rgba(244,235,217,0.05)]" style={{ padding: '12px 16px' }}>
                          <strong className="text-[#e6a15c] text-xs uppercase block text-center tracking-wider" style={{ textShadow: '0 0 10px rgba(230,161,92,0.4)', marginBottom: '4px' }}>Users get..</strong>
                          <p className="text-[#f4ebd9] text-xs leading-relaxed">The simulated warmth of fresh chai, attracting premium customers willing to linger and spend on high-margin pairings.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative h-[380px] w-full">
                <div className="absolute top-0 left-0 w-full min-h-[380px] bg-[#11151a]/80 backdrop-blur-xl rounded-[2rem] border border-[#e6a15c]/10 group hover:-translate-y-4 hover:z-50 z-10 transition-all duration-500 shadow-[0_0_20px_rgba(230,161,92,0.05)] hover:shadow-[0_0_40px_rgba(230,161,92,0.2)] flex flex-col items-center text-center cursor-pointer overflow-hidden" style={{ padding: '32px 24px' }}>
                  {/* Asymmetrical Fluid Coffee Wave */}
                  <div className="absolute top-[45%] -left-20 w-80 h-80 bg-[#b87333]/40 rounded-full blur-[70px] animate-wave-flow pointer-events-none mix-blend-screen" />
                  <div className="absolute -bottom-10 left-[10%] w-96 h-72 bg-[#8b5a2b]/40 rounded-full blur-[70px] animate-wave-flow-reverse pointer-events-none mix-blend-screen" style={{ animationDelay: '-4s' }} />
                  <div className="absolute -bottom-32 -right-16 w-80 h-64 bg-[#cd853f]/20 rounded-full blur-[70px] animate-wave-flow pointer-events-none mix-blend-screen" style={{ animationDelay: '-8s' }} />
                  
                  {/* Centered Visible Content */}
                  <div className="flex flex-col items-center justify-center w-full h-[316px] group-hover:h-[140px] transition-all duration-500 ease-in-out relative z-20">
                    <h3 className="text-[#f4ebd9] text-2xl font-semibold w-full transition-transform duration-500 group-hover:-translate-y-1" style={{ marginBottom: '12px' }}>Fluid Interactions</h3>
                    <p className="text-[#e6a15c] text-sm font-medium tracking-wide transition-all duration-500 group-hover:text-[#f4ebd9]" style={{ textShadow: '0 0 10px rgba(230,161,92,0.5)' }}>Dynamic animations that build brand equity.</p>
                  </div>

                  {/* Hidden Content that Opens Up */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out w-full relative z-20">
                    <div className="overflow-hidden flex flex-col">
                      <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75" style={{ gap: '8px' }}>
                        <div className="bg-transparent rounded-xl border border-[#b87333]/50 w-full flex flex-col items-center" style={{ padding: '12px 16px' }}>
                          <strong className="text-[#b87333] text-xs uppercase block text-center tracking-wider" style={{ textShadow: '0 0 10px rgba(184,115,51,0.4)', marginBottom: '4px' }}>Built as</strong>
                          <p className="text-gray-200 text-xs leading-relaxed">Breathing pulse indicators, smooth card tilts, and floating anti-gravity menus.</p>
                        </div>
                        <div className="bg-[#f4ebd9]/10 rounded-xl border border-[#f4ebd9]/20 backdrop-blur-md w-full flex flex-col items-center shadow-[0_0_15px_rgba(244,235,217,0.05)]" style={{ padding: '12px 16px' }}>
                          <strong className="text-[#e6a15c] text-xs uppercase block text-center tracking-wider" style={{ textShadow: '0 0 10px rgba(230,161,92,0.4)', marginBottom: '4px' }}>Users get..</strong>
                          <p className="text-[#f4ebd9] text-xs leading-relaxed">Proof the brand is alive. Flawless interactions implant the thought: "If they care this much about details, they care about my food."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SITUATION & SCOPE */}
        <section className="section-padding relative w-full flex justify-center" style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: "1px solid rgba(230, 161, 92, 0.1)" }}>
          <div className="w-full max-w-[1200px] px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full text-center" style={{ gap: '32px' }}>
              
              {/* The Situation */}
              <div className="bg-[#11151a]/50 rounded-[2rem] border border-[#e6a15c]/10 relative overflow-hidden group hover:border-[#e6a15c]/30 transition-colors shadow-2xl flex flex-col items-center w-full" style={{ padding: '40px' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6a15c]/5 rounded-full blur-[60px] group-hover:bg-[#e6a15c]/10 transition-colors pointer-events-none" />
                <h3 className="text-[#e6a15c] text-sm uppercase font-bold flex items-center justify-center w-full" style={{ letterSpacing: '0.2em', marginBottom: '24px', gap: '16px' }}>
                  <span className="w-6 h-[1px] bg-[#e6a15c]/50"></span>
                  The Situation
                  <span className="w-6 h-[1px] bg-[#e6a15c]/50"></span>
                </h3>
                <p className="text-xl md:text-2xl text-[#f4ebd9] font-light text-center w-full" style={{ lineHeight: '1.6', marginBottom: '20px' }}>
                  Before the redesign, their digital presence was entirely reliant on a basic Google Maps link. 
                </p>
                <p className="text-gray-400 text-lg text-center w-full leading-[1.8]">
                  The core problems holding them back were <strong className="font-normal text-white relative inline-block px-1 z-10" style={{ fontFamily: 'var(--font-display)' }}><span className="absolute left-0 bottom-1 h-[60%] bg-[#e6a15c]/60 -z-10 w-0 group-hover:w-full transition-all duration-500 ease-out delay-0"></span>weak conversion pathways</strong>, <strong className="font-normal text-white relative inline-block px-1 z-10" style={{ fontFamily: 'var(--font-display)' }}><span className="absolute left-0 bottom-1 h-[60%] bg-[#e6a15c]/60 -z-10 w-0 group-hover:w-full transition-all duration-500 ease-out delay-300"></span>zero mobile-first optimization</strong>, and <strong className="font-normal text-white relative inline-block px-1 z-10" style={{ fontFamily: 'var(--font-display)' }}><span className="absolute left-0 bottom-1 h-[60%] bg-[#e6a15c]/60 -z-10 w-0 group-hover:w-full transition-all duration-500 ease-out delay-[600ms]"></span>poor local discoverability</strong>.
                </p>
              </div>

              {/* What Was Built */}
              <div className="bg-[#11151a]/50 rounded-[2rem] border border-[#e6a15c]/10 relative overflow-hidden group hover:border-[#e6a15c]/30 transition-colors shadow-2xl flex flex-col items-center w-full" style={{ padding: '40px' }}>
                <h3 className="text-[#e6a15c] text-sm uppercase font-bold flex items-center justify-center w-full" style={{ letterSpacing: '0.2em', marginBottom: '24px', gap: '16px' }}>
                  <span className="w-6 h-[1px] bg-[#e6a15c]/50"></span>
                  What Was Built
                  <span className="w-6 h-[1px] bg-[#e6a15c]/50"></span>
                </h3>
                <ul className="w-full flex flex-col items-center" style={{ gap: '20px' }}>
                  {[
                    "Complete Landing Page Redesign",
                    "Mobile-First Localized Layout",
                    "Simplified Menu Navigation",
                    "Integrated Location & Contact Mapping"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-center text-[#f4ebd9] text-xl font-light text-center w-full" style={{ gap: '12px', lineHeight: '1.4' }}>
                      <CheckCircle2 className="w-6 h-6 text-[#e6a15c] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ANNOTATED SCREENSHOTS / SECTION BREAKDOWNS */}
        <section className="section-padding relative w-full flex justify-center" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <div className="w-full max-w-[1400px] flex flex-col items-center px-4">
            <div className="w-full text-center flex flex-col items-center" style={{ marginBottom: '64px' }}>
              <h2 className="text-4xl md:text-6xl font-bold text-[#f4ebd9] text-center w-full" style={{ fontFamily: "var(--font-display)", marginBottom: '16px' }}>
                Designing for Conversion
              </h2>
              <p className="text-[#e6a15c] text-xl uppercase font-semibold text-center w-full" style={{ letterSpacing: '0.1em' }}>Section by Section Breakdown</p>
            </div>

            <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: '128px' }}>
              
              {caseStudySections.map((section, idx) => (
                <div key={section.id} className="annotated-block flex flex-col items-center w-full">
                  <div className="flex items-center justify-center border-b border-[#e6a15c]/10 w-full" style={{ gap: '20px', marginBottom: '32px', paddingBottom: '16px' }}>
                    <span className="text-[#e6a15c] font-mono text-3xl font-bold">{section.id}</span>
                    <h3 className="text-4xl font-semibold text-[#f4ebd9] text-center" style={{ fontFamily: "var(--font-display)" }}>{section.title}</h3>
                  </div>
                  
                  {/* Image Placeholder */}
                  <div className="relative w-full max-w-[1400px] aspect-[16/9] md:aspect-[21/9] bg-[#0d121c] border border-[#e6a15c]/20 rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center" style={{ marginBottom: '56px' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#11151a] to-[#0a0f19]" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                    <p className="text-gray-500 font-mono uppercase text-base relative z-10 text-center w-full" style={{ letterSpacing: '0.1em' }}>[ {section.title} Screenshot Placeholder ]</p>
                  </div>

                  {/* Explanations Grid */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${section.points.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'} w-full max-w-[1400px]`} style={{ gap: '32px' }}>
                    {section.points.map((point, i) => (
                      <div key={i} className="bg-[#11151a]/80 rounded-3xl border border-[#e6a15c]/10 hover:border-[#e6a15c]/30 transition-colors shadow-[0_0_20px_rgba(230,161,92,0.05)] hover:shadow-[0_0_30px_rgba(230,161,92,0.15)] flex flex-col items-center text-center w-full h-full justify-between relative overflow-hidden" style={{ padding: '56px 32px' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6a15c]/5 rounded-full blur-[60px] pointer-events-none" />
                        <div className="flex flex-col items-center w-full relative z-10">
                          <div className="w-12 h-12 bg-[#e6a15c]/10 text-[#e6a15c] rounded-full flex items-center justify-center font-bold text-2xl border border-[#e6a15c]/30 mx-auto shadow-[0_0_15px_rgba(230,161,92,0.2)]" style={{ marginBottom: '24px' }}>{i + 1}</div>
                          <h4 className="text-[#f4ebd9] font-semibold text-2xl text-center w-full" style={{ marginBottom: '16px' }}>{point.title}</h4>
                          <p className="text-gray-400 text-sm text-center w-full" style={{ lineHeight: '1.7', marginBottom: '32px' }}>
                            <strong className="text-white block mb-2">Implementation</strong> {point.implementation}
                          </p>
                        </div>
                        <div className="w-full flex flex-col gap-4 mt-auto relative z-10">
                          {/* Fire Yellow: Projected Conversion */}
                          <div className="bg-[#e6a15c]/10 rounded-xl border border-[#e6a15c]/30 w-full flex flex-col items-center text-center shadow-[0_0_15px_rgba(230,161,92,0.1)] relative overflow-hidden" style={{ padding: '12px 16px' }}>
                            <strong className="text-[#e6a15c] text-xs uppercase block text-center mb-3 tracking-wider" style={{ textShadow: '0 0 10px rgba(230,161,92,0.4)' }}>Projected Conversion</strong>
                            <p className="text-sm text-gray-200 text-center" style={{ lineHeight: '1.6' }}>{point.conversion}</p>
                          </div>
                          {/* Fire Red: Loss if Ignored */}
                          <div className="bg-[#ef4444]/10 rounded-xl border border-[#ef4444]/30 w-full flex flex-col items-center text-center shadow-[0_0_15px_rgba(239,68,68,0.1)] relative overflow-hidden" style={{ padding: '12px 16px' }}>
                            <strong className="text-[#ef4444] text-xs uppercase block text-center mb-3 tracking-wider" style={{ textShadow: '0 0 10px rgba(239,68,68,0.4)' }}>Loss if Ignored</strong>
                            <p className="text-sm text-gray-300 text-center" style={{ lineHeight: '1.6' }}>{point.loss}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* INDUSTRY BENCHMARKS */}
        <section className="section-padding bg-[#0d121c] relative border-t border-[#e6a15c]/10 w-full flex justify-center" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <div className="w-full max-w-[1200px] flex flex-col items-center px-4">
            <div className="w-full flex flex-col items-center" style={{ gap: '24px', marginBottom: '64px' }}>
              <div className="text-center w-full">
                <h2 className="text-4xl md:text-6xl font-bold text-[#f4ebd9] text-center w-full" style={{ fontFamily: "var(--font-display)", marginBottom: '16px' }}>
                  Why This Matters
                </h2>
                <div className="inline-block bg-[#e6a15c]/10 border border-[#e6a15c]/20 rounded-full px-5 py-2 mx-auto">
                  <p className="text-[#e6a15c] font-bold uppercase text-sm text-center" style={{ letterSpacing: '0.2em' }}>Industry Data & Benchmarks</p>
                </div>
              </div>
              <div className="bg-[#11151a] border border-gray-800 rounded-2xl w-full max-w-lg" style={{ padding: '16px' }}>
                <p className="text-gray-400 text-sm text-center w-full" style={{ lineHeight: '1.6' }}>
                  *These metrics represent general industry statistics for UX optimization, demonstrating the vast potential ROI of these specific design principles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 w-full" style={{ gap: '24px' }}>
              <div className="bg-[#11151a] rounded-[2rem] border border-[#e6a15c]/10 hover:-translate-y-2 transition-transform duration-300 shadow-2xl flex flex-col items-center text-center w-full" style={{ padding: '40px' }}>
                <TrendingUp className="w-12 h-12 text-[#e6a15c] mx-auto" style={{ marginBottom: '24px' }} />
                <h4 className="text-6xl font-bold text-white font-mono tracking-tighter text-center w-full" style={{ marginBottom: '20px' }}>400<span className="text-3xl text-[#e6a15c] ml-1">%</span></h4>
                <p className="text-gray-400 text-lg text-center w-full" style={{ lineHeight: '1.6' }}>
                  A frictionless, well-designed user interface can raise a website's conversion rate by up to 400%.
                </p>
              </div>
              <div className="bg-[#11151a] rounded-[2rem] border border-[#e6a15c]/10 hover:-translate-y-2 transition-transform duration-300 shadow-2xl flex flex-col items-center text-center w-full" style={{ padding: '40px' }}>
                <Smartphone className="w-12 h-12 text-[#e6a15c] mx-auto" style={{ marginBottom: '24px' }} />
                <h4 className="text-6xl font-bold text-white font-mono tracking-tighter text-center w-full" style={{ marginBottom: '20px' }}>74<span className="text-3xl text-[#e6a15c] ml-1">%</span></h4>
                <p className="text-gray-400 text-lg text-center w-full" style={{ lineHeight: '1.6' }}>
                  Of users say they are more likely to return to a company's website if it is heavily optimized for mobile navigation.
                </p>
              </div>
              <div className="bg-[#11151a] rounded-[2rem] border border-[#e6a15c]/10 hover:-translate-y-2 transition-transform duration-300 shadow-2xl flex flex-col items-center text-center w-full" style={{ padding: '40px' }}>
                <Users className="w-12 h-12 text-[#e6a15c] mx-auto" style={{ marginBottom: '24px' }} />
                <h4 className="text-6xl font-bold text-white font-mono tracking-tighter text-center w-full" style={{ marginBottom: '20px' }}>88<span className="text-3xl text-[#e6a15c] ml-1">%</span></h4>
                <p className="text-gray-400 text-lg text-center w-full" style={{ lineHeight: '1.6' }}>
                  Of online consumers are less likely to return to a site after experiencing a single bad user experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLIENT NOTE */}
        <section className="section-padding text-center relative overflow-hidden bg-[#0a0f19] w-full flex justify-center" style={{ paddingTop: '128px', paddingBottom: '128px' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#e6a15c]/5 pointer-events-none" />
          <div className="w-full max-w-[1000px] relative z-10 px-4 flex flex-col items-center">
            <span className="text-[200px] font-serif leading-none text-[#e6a15c]/10 absolute -top-20 -left-16 select-none z-0">"</span>
            <h3 className="text-4xl md:text-5xl text-[#f4ebd9] font-light leading-snug relative z-10 text-center w-full" style={{ fontFamily: "var(--font-display)", marginBottom: '64px' }}>
              The process was entirely untouched by us, no extra queries asked, and the final design is simply brilliant.
            </h3>
            <div className="w-full flex flex-col items-center justify-center relative z-10" style={{ gap: '12px' }}>
              <span className="w-16 h-16 rounded-full bg-[#11151a] border border-[#e6a15c]/30 flex items-center justify-center text-[#e6a15c] font-bold text-2xl shadow-[0_0_30px_rgba(230,161,92,0.15)] mx-auto" style={{ marginBottom: '8px' }}>T</span>
              <p className="text-white font-bold uppercase text-sm text-center w-full" style={{ letterSpacing: '0.25em' }}>Owner</p>
              <p className="text-[#e6a15c] text-xs uppercase text-center w-full" style={{ letterSpacing: '0.25em' }}>Tabun Chai</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </SmoothScroll>
  );
}
