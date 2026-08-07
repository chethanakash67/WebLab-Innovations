"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import "../globals.css";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { CheckCircle2, TrendingUp, Search, Smartphone, Users, MapPin, ArrowRight, ArrowLeft, Cpu, FileCode2, MessageSquare } from "lucide-react";

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

const getCoordinatesForPoint = (sectionId: string, pointIndex: number) => {
  const coords: Record<string, { x: number; y: number }[]> = {
    "01": [
      { x: 50, y: 55 }, // Above-the-Fold Clarity (Center Hero Card)
      { x: 50, y: 82 }, // Fitts's Law & Thumb Zone (Bottom CTA buttons)
      { x: 70, y: 28 }  // Loss Aversion & Urgency (Top Spec Chip / Live Badge)
    ],
    "02": [
      { x: 77, y: 60 }, // Live Countdown Timers (Top Timer)
      { x: 28.7, y: 52 }, // Progressive Disclosure (Center Active Offer)
      { x: 50, y: 78 }  // Social Proof Proximity (Bottom Metrics)
    ],
    "03": [
      { x: 72, y: 56 }, // Interactive Flip Cards (Left reviews)
      { x: 52, y: 40 }, // Jakob's Law (Right Review Profile/Stars)
      { x: 50, y: 26 }, // Anchoring Effect (Top Score Bar)
      { x: 60, y: 75 }  // Von Restorff Effect (Overlapping photo stack)
    ],
    "04": [
      { x: 30, y: 42 }, // Visual Isolation (Flagship Branch Card)
      { x: 50, y: 90 }, // Mental Models (Trust Footer Contacts)
      { x: 54, y: 53 }, // Thumb Zone Design (Call Button on Left Card)
      { x: 75, y: 28 }  // Mere-Exposure Effect (Call Button on Right Card)
    ]
  };
  return coords[sectionId]?.[pointIndex] || { x: 50, y: 50 };
};

const getImageNameForSection = (sectionId: string) => {
  const images: Record<string, string> = {
    "01": "Hero image.png",
    "02": "Time Sensitive offers.png",
    "03": "testimonials.png",
    "04": "location and contact.png"
  };
  return images[sectionId] || "";
};

export default function TabunChaiPage() {
  const [section3Slide, setSection3Slide] = useState(0);
  const [section3Fading, setSection3Fading] = useState(false);
  const [section3Started, setSection3Started] = useState(false);
  const section3Ref = useRef<HTMLDivElement>(null);

  const toggleSection3Slide = () => {
    setSection3Started(true);
    setSection3Slide((prev) => (prev === 0 ? 1 : 0));
    setSection3Fading(false);
  };

  useEffect(() => {
    const target = section3Ref.current;
    if (!target || section3Started) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSection3Started(true);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [section3Started]);

  useEffect(() => {
    if (!section3Started) {
      return;
    }

    const HOLD = 5000;  // fully visible hold time
    const FADE = 1500;  // matches CSS transition

    let holdT: ReturnType<typeof setTimeout>;
    let swapT: ReturnType<typeof setTimeout>;

    const runCycle = () => {
      holdT = setTimeout(() => {
        setSection3Fading(true);
        swapT = setTimeout(() => {
          setSection3Slide((prev) => (prev === 0 ? 1 : 0));
          setSection3Fading(false);
        }, FADE);
      }, HOLD);
    };

    runCycle();

    return () => {
      clearTimeout(holdT);
      clearTimeout(swapT);
    };
  }, [section3Started, section3Slide]);


  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <motion.main
        className="w-full flex flex-col items-center overflow-hidden"
        style={{ paddingTop: "140px", minHeight: "100vh", position: "relative", zIndex: 10, background: "#0a0f19" }}
        initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        
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
                <div
                  key={section.id}
                  ref={section.id === "03" ? section3Ref : undefined}
                  className="annotated-block flex flex-col items-center w-full"
                >
                  <div className="flex items-center justify-center border-b border-[#e6a15c]/10 w-full" style={{ gap: '20px', marginBottom: '32px', paddingBottom: '16px' }}>
                    <span className="text-[#e6a15c] font-mono text-3xl font-bold">{section.id}</span>
                    <h3 className="text-4xl font-semibold text-[#f4ebd9] text-center" style={{ fontFamily: "var(--font-display)" }}>{section.title}</h3>
                  </div>
                  
                  {/* Image Container with Interactive UX Hotspots */}
                  <div className="relative w-full max-w-[1400px] bg-[#0d121c] border border-[#e6a15c]/20 rounded-[2rem] overflow-hidden shadow-2xl group/img" style={{ marginBottom: '56px' }}>
                    {section.id === "03" ? (
                      <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] xl:h-[750px] overflow-hidden">
                        {/* Slide 1: Testimonials — visible when slide=0 & not fading, or slide=1 & fading in */}
                        <img 
                          src="/testimonials.png" 
                          alt="Testimonials Layout" 
                          className="absolute inset-0 w-full h-full object-contain select-none"
                          style={{
                            opacity: section3Slide === 0 ? (section3Fading ? 0 : 1) : (section3Fading ? 1 : 0),
                            transition: 'opacity 1500ms ease-in-out',
                            zIndex: section3Slide === 0 ? 10 : 5
                          }}
                        />
                        {/* Slide 2: Live Moments — visible when slide=1 & not fading, or slide=0 & fading in */}
                        <img 
                          src="/live%20moments.png" 
                          alt="Live Moments Photo Stack" 
                          className="absolute inset-0 w-full h-full object-contain select-none"
                          style={{
                            opacity: section3Slide === 1 ? (section3Fading ? 0 : 1) : (section3Fading ? 1 : 0),
                            transition: 'opacity 1500ms ease-in-out',
                            zIndex: section3Slide === 1 ? 10 : 5
                          }}
                        />

                        <button
                          type="button"
                          aria-label={section3Slide === 0 ? "Show live moments" : "Show testimonials"}
                          onClick={toggleSection3Slide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center rounded-full border border-[#e6a15c]/35 bg-[#0b0f18]/75 backdrop-blur-md transition-all duration-300 hover:border-[#e6a15c]/70 hover:bg-[#0b0f18]/92 hover:shadow-[0_0_20px_rgba(230,161,92,0.16)]"
                          style={{ width: '46px', height: '78px', padding: '0' }}
                        >
                          {section3Slide === 0 ? (
                            <ArrowRight className="h-5 w-5 text-[#f4ebd9] transition-transform duration-300 group-hover:translate-x-0.5" />
                          ) : (
                            <ArrowLeft className="h-5 w-5 text-[#f4ebd9] transition-transform duration-300 group-hover:-translate-x-0.5" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <img 
                        src={`/${getImageNameForSection(section.id)}`} 
                        alt={section.title} 
                        className="w-full h-auto block object-contain select-none max-h-[750px] mx-auto" 
                      />
                    )}
                    
                    {/* Dark gradient overlay that makes hotspots and details pop slightly */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15 pointer-events-none z-20" />

                    {/* Interactive hotspots overlay */}
                    {section.points.map((point, i) => {
                      const coord = getCoordinatesForPoint(section.id, i);

                      // For section 03: mirror the exact opacity of the corresponding image
                      // Dots 0,1,2 → testimonials image: slide===0 ? (fading?0:1) : (fading?1:0)
                      // Dot 3       → live moments image: slide===1 ? (fading?0:1) : (fading?1:0)
                      const dotOpacity = section.id !== "03"
                        ? 1
                        : i < 3
                          ? (section3Slide === 0 ? (section3Fading ? 0 : 1) : (section3Fading ? 1 : 0))
                          : (section3Slide === 1 ? (section3Fading ? 0 : 1) : (section3Fading ? 1 : 0));

                      const dotPointerEvents = section.id !== "03"
                        ? 'auto'
                        : dotOpacity > 0.5 ? 'auto' : 'none';

                      return (
                        <div
                          key={i}
                          className="absolute group/badge cursor-pointer"
                          style={{
                            left: `${coord.x}%`,
                            top: `${coord.y}%`,
                            transform: 'translate(-50%, -50%)',
                            opacity: dotOpacity,
                            transition: 'opacity 1500ms ease-in-out',
                            pointerEvents: dotPointerEvents,
                            zIndex: 30
                          }}
                        >
                          {/* Pulse effect */}
                          <span className="absolute -inset-2 rounded-full bg-[#e6a15c]/40 animate-ping pointer-events-none" />
                          
                          {/* Circle Badge */}
                          <div className="w-8 h-8 rounded-full bg-[#e6a15c] text-[#0a0f19] flex items-center justify-center font-bold font-mono text-sm border-2 border-white shadow-[0_0_20px_rgba(230,161,92,0.6)] group-hover/badge:bg-white group-hover/badge:text-[#0a0f19] transition-colors duration-300">
                            {i + 1}
                          </div>

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#11151a] border border-[#e6a15c]/35 text-[#f4ebd9] text-xs font-mono py-1.5 px-3 whitespace-nowrap opacity-0 scale-95 group-hover/badge:opacity-100 group-hover/badge:scale-100 transition-all duration-300 pointer-events-none rounded-md shadow-2xl z-40">
                            <span className="text-[#e6a15c] font-bold block text-[10px] uppercase mb-0.5 tracking-wider">UX Rule {i + 1}</span>
                            {point.title}
                          </div>
                        </div>
                      );
                    })}
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
                <div className="inline-block bg-[#e6a15c]/10 border border-[#e6a15c]/20 rounded-full px-5 py-2 mx-auto" style={{ padding: '12px 24px', borderRadius: '999px' }}>
                  <p suppressHydrationWarning className="text-[#e6a15c] font-bold uppercase text-sm text-center" style={{ letterSpacing: '0.2em', lineHeight: '1.45', padding: '2px 0' }}>Industry Data & Benchmarks</p>
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

        {/* FUTURE ROADMAP / ADVANCEMENTS SECTION */}
        <section className="section-padding relative border-t border-[#e6a15c]/10 w-full flex justify-center" style={{ paddingTop: '96px', paddingBottom: '96px', background: "#080c14" }}>
          <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[#e6a15c]/3 rounded-full blur-[100px] pointer-events-none" />
          <div className="w-full max-w-[1400px] flex flex-col items-center px-4">
            
            {/* Header */}
            <div className="w-full text-center flex flex-col items-center" style={{ marginBottom: '64px' }}>
              <SectionBadge label="Future Scope" number="05" />
              <h2 className="text-4xl md:text-6xl font-bold text-[#f4ebd9] text-center w-full" style={{ fontFamily: "var(--font-display)", marginTop: '24px', marginBottom: '16px' }}>
                Advancements that can be done for user growth & retention
              </h2>
              <p className="text-gray-400 text-lg text-center w-full max-w-3xl" style={{ lineHeight: '1.6' }}>
                Beyond visual and layout optimizations, these architectural advancements are designed to capture high-intent search traffic and build an automated repeat-customer flywheel.
              </p>
            </div>

            {/* Grid of Advancements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-8">
              
              {/* Card 1: AEO */}
              <div className="relative group bg-[#0e1320] border border-[#e6a15c]/15 hover:border-[#e6a15c]/40 transition-all duration-300 flex flex-col rounded-none hover:shadow-[0_0_30px_rgba(230,161,92,0.08)] cursor-pointer overflow-hidden" style={{ padding: '40px 32px', borderTop: '4px solid rgba(230, 161, 92, 0.3)' }}>
                {/* Tech scan grid lines background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(230,161,92,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(230,161,92,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                
                {/* Corner Label */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-500 tracking-wider">
                  [ ADVANCEMENT 01 ]
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-4 relative z-10" style={{ marginBottom: '28px' }}>
                  <div className="w-12 h-12 border border-[#e6a15c]/30 text-[#e6a15c] flex items-center justify-center rounded-none shrink-0 relative after:absolute after:-inset-1 after:border after:border-[#e6a15c]/10">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-[#f4ebd9] text-2xl font-bold group-hover:text-[#e6a15c] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    Hyper-Local AEO
                  </h3>
                </div>

                {/* Concept */}
                <div className="relative z-10" style={{ marginBottom: '24px' }}>
                  <span className="font-mono text-[11px] uppercase text-[#e6a15c]/80 tracking-wider mb-2 block font-semibold">
                    // The Concept
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Traditional SEO tries to rank you on a page of 10 blue links. AEO (Answer Engine Optimization) structures your data so that when a user asks ChatGPT, Perplexity, or Google's AI Overview, <span className="text-[#f4ebd9] italic font-light">"Where is the best late-night chai spot near Balaji Colony?"</span>, the AI gives Tabun Chai as the definitive, single answer.
                  </p>
                </div>

                {/* Process */}
                <div className="relative z-10" style={{ marginBottom: '32px' }}>
                  <span className="font-mono text-[11px] uppercase text-[#e6a15c]/80 tracking-wider mb-2 block font-semibold">
                    // Implementation Process
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We write natural-language Q&A clusters within the site's code that directly answer highly specific local queries (e.g., <span className="text-[#f4ebd9] italic font-light">"Does Tabun Chai serve snacks late at night?"</span>). We then aggressively link your menu and exact coordinates to AI data-scraping sources, ensuring LLMs view you as the localized authority.
                  </p>
                </div>

                {/* Output */}
                <div className="bg-[#e6a15c]/5 border-l-2 border-[#e6a15c] relative z-10 mt-auto" style={{ padding: '20px' }}>
                  <span className="font-mono text-[10px] uppercase text-[#e6a15c] tracking-widest mb-1.5 block font-bold">
                    Expected Output
                  </span>
                  <p className="text-gray-200 text-[13px] leading-relaxed font-semibold">
                    35% to 50% increase in Zero-Click visibility. Bypasses standard Google search competition. Customers get the direct answer to go to you, drastically increasing high-intent footfall.
                  </p>
                </div>
              </div>

              {/* Card 2: Schema */}
              <div className="relative group bg-[#0e1320] border border-[#e6a15c]/15 hover:border-[#e6a15c]/40 transition-all duration-300 flex flex-col rounded-none hover:shadow-[0_0_30px_rgba(230,161,92,0.08)] cursor-pointer overflow-hidden" style={{ padding: '40px 32px', borderTop: '4px solid rgba(230, 161, 92, 0.3)' }}>
                {/* Tech scan grid lines background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(230,161,92,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(230,161,92,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                
                {/* Corner Label */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-500 tracking-wider">
                  [ ADVANCEMENT 02 ]
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-4 relative z-10" style={{ marginBottom: '28px' }}>
                  <div className="w-12 h-12 border border-[#e6a15c]/30 text-[#e6a15c] flex items-center justify-center rounded-none shrink-0 relative after:absolute after:-inset-1 after:border after:border-[#e6a15c]/10">
                    <FileCode2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-[#f4ebd9] text-2xl font-bold group-hover:text-[#e6a15c] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    Live-Menu Schema
                  </h3>
                </div>

                {/* Concept */}
                <div className="relative z-10" style={{ marginBottom: '24px' }}>
                  <span className="font-mono text-[11px] uppercase text-[#e6a15c]/80 tracking-wider mb-2 block font-semibold">
                    // The Concept
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Right now, Google knows you are a website. Schema markup translates your exact menu, prices, and 5-star aggregate ratings into a machine-readable language so Google can display them directly on the search results page before the user even clicks your link.
                  </p>
                </div>

                {/* Process */}
                <div className="relative z-10" style={{ marginBottom: '32px' }}>
                  <span className="font-mono text-[11px] uppercase text-[#e6a15c]/80 tracking-wider mb-2 block font-semibold">
                    // Implementation Process
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We inject specific JSON-LD code blocks (LocalBusiness, Menu, and AggregateRating schemas) deep into the website's <code className="text-[#f4ebd9] bg-[#1a2233] px-1 py-0.5 font-mono text-xs font-light">&lt;head&gt;</code>. This securely tags every item (e.g., Garam Chai - ₹15) and your 4.8/5 rating so search engine crawlers can instantly pull and display it.
                  </p>
                </div>

                {/* Output */}
                <div className="bg-[#e6a15c]/5 border-l-2 border-[#e6a15c] relative z-10 mt-auto" style={{ padding: '20px' }}>
                  <span className="font-mono text-[10px] uppercase text-[#e6a15c] tracking-widest mb-1.5 block font-bold">
                    Expected Output
                  </span>
                  <p className="text-gray-200 text-[13px] leading-relaxed font-semibold">
                    20% to 30% increase in Organic Click-Through Rate (CTR). Displays bright gold stars, menu items, and pricing directly on Google results to capture intent and win clicks.
                  </p>
                </div>
              </div>

              {/* Card 3: WhatsApp CRM */}
              <div className="relative group bg-[#0e1320] border border-[#e6a15c]/15 hover:border-[#e6a15c]/40 transition-all duration-300 flex flex-col rounded-none hover:shadow-[0_0_30px_rgba(230,161,92,0.08)] cursor-pointer overflow-hidden" style={{ padding: '40px 32px', borderTop: '4px solid rgba(230, 161, 92, 0.3)' }}>
                {/* Tech scan grid lines background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(230,161,92,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(230,161,92,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                
                {/* Corner Label */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-500 tracking-wider">
                  [ ADVANCEMENT 03 ]
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-4 relative z-10" style={{ marginBottom: '28px' }}>
                  <div className="w-12 h-12 border border-[#e6a15c]/30 text-[#e6a15c] flex items-center justify-center rounded-none shrink-0 relative after:absolute after:-inset-1 after:border after:border-[#e6a15c]/10">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-[#f4ebd9] text-2xl font-bold group-hover:text-[#e6a15c] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    Automated CRM Loop
                  </h3>
                </div>

                {/* Concept */}
                <div className="relative z-10" style={{ marginBottom: '24px' }}>
                  <span className="font-mono text-[11px] uppercase text-[#e6a15c]/80 tracking-wider mb-2 block font-semibold">
                    // The Concept
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    You are currently funneling users from the website to WhatsApp to order or ask questions. We upgrade this into a closed-loop loyalty engine that automatically brings them back without manual effort from your staff.
                  </p>
                </div>

                {/* Process */}
                <div className="relative z-10" style={{ marginBottom: '32px' }}>
                  <span className="font-mono text-[11px] uppercase text-[#e6a15c]/80 tracking-wider mb-2 block font-semibold">
                    // Implementation Process
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We transition the basic WhatsApp link to a WhatsApp Business API integration. When a user messages you, they are tagged. Exactly 7 days later, at 4:30 PM (before evening peak), the system autonomously sends: <span className="text-[#f4ebd9] italic font-light">"Hey! Time for a break. Show this text for 15% off chai + momos tonight."</span>
                  </p>
                </div>

                {/* Output */}
                <div className="bg-[#e6a15c]/5 border-l-2 border-[#e6a15c] relative z-10 mt-auto" style={{ padding: '20px' }}>
                  <span className="font-mono text-[10px] uppercase text-[#e6a15c] tracking-widest mb-1.5 block font-bold">
                    Expected Output
                  </span>
                  <p className="text-gray-200 text-[13px] leading-relaxed font-semibold">
                    40% to 60% increase in Repeat Customer Rate. This automated loop turns a one-time website visitor into a habitual, loyal regular with zero extra manual labor.
                  </p>
                </div>
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

      </motion.main>
      <Footer />
    </SmoothScroll>
  );
}
