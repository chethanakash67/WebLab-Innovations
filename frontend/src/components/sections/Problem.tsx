"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AlertCircle, Terminal, HelpCircle, Flame } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasIntersected) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(".problem-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        }
      )
      .fromTo(".problem-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [hasIntersected]);

  return (
    <section ref={sectionRef} id="problems" className="relative overflow-hidden" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#030405", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(40px, 5vw, 60px)" }}>
      {/* Background Watermark */}
      <div className="absolute select-none opacity-[0.015] font-display font-bold text-[24vw] leading-none pointer-events-none text-white right-[2%] top-[-5%]">
        PAIN
      </div>

      <div className="mx-auto max-w-[1500px] relative z-10" style={{ paddingLeft: "clamp(20px, 5vw, 64px)", paddingRight: "clamp(20px, 5vw, 64px)" }}>
        <header>
          <div className="problem-reveal" style={{ opacity: 0 }}>
            <SectionBadge label="The Core Problems" number="02" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-medium tracking-tight mt-6 text-white problem-reveal" style={{ opacity: 0, lineHeight: 1.2 }}>
            Why gorgeous websites
            <br />
            <span className="text-[#36b8ff]/80">still fail to grow.</span>
          </h2>
          <p className="text-white/40 max-w-[550px] mt-6 leading-relaxed problem-reveal" style={{ opacity: 0 }}>
            Building a website is easy. Designing a system that ranks on search engines, is recommended by AI models, and converts traffic is where most businesses fail.
          </p>
        </header>

        <div className="problem-cards-grid grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: "32px", marginTop: "clamp(48px, 6vw, 72px)" }}>
          {/* Card 1: AI Search Blindspot */}
          <div className="problem-card border border-white/10 rounded-3xl bg-white/[0.01] backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:border-[#36b8ff]/30 group" style={{ opacity: 0, padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "28px", minHeight: "480px" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#36b8ff]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#36b8ff]/10 transition-all duration-300" />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-md bg-red-950/20 border border-red-500/25 animate-red-glow">
                  AI Blindspot
                </span>
                <HelpCircle className="h-5 w-5 text-[#36b8ff]/70" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h3 className="text-xl font-display font-semibold text-white">
                  Invisible to AI Engines
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  When users ask ChatGPT, Claude, or Perplexity for options, your brand is left out because your site lacks semantic AI optimizations (GEO/AEO).
                </p>
              </div>
            </div>

            {/* What's the Loss */}
            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "16px", marginTop: "-4px" }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#36b8ff]/90 block mb-1.5">What's the Loss?</span>
              <p className="text-white/60 text-xs leading-relaxed">
                Customers asking ChatGPT or Claude for recommendations will never hear about your business. You lose them to competitors before they even search on Google.
              </p>
            </div>

            {/* Visual simulation of AI prompt failure */}
            <div className="w-full bg-[#08090a] border border-white/5 rounded-2xl p-4 font-mono text-[11px] text-white/40">
              <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
                <Terminal className="h-3.5 w-3.5 text-[#36b8ff]/70" />
                <span className="text-white/60">LLM Recommendation Query</span>
              </div>
              <div className="text-white/70 mb-1">&gt; Find top local services near me:</div>
              <div className="text-[#36b8ff]/80 mb-2">● [Scanning web data...]</div>
              <div className="text-white/30 italic">"I couldn't find verified schema records or structured references for your business. Recommending competitors instead..."</div>
            </div>
          </div>

          {/* Card 2: Friction Penalty */}
          <div className="problem-card border border-white/10 rounded-3xl bg-white/[0.01] backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:border-[#36b8ff]/30 group" style={{ opacity: 0, padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "28px", minHeight: "480px" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#36b8ff]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#36b8ff]/10 transition-all duration-300" />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-md bg-red-950/20 border border-red-500/25 animate-red-glow">
                  Friction Penalty
                </span>
                <AlertCircle className="h-5 w-5 text-[#36b8ff]/70" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h3 className="text-xl font-display font-semibold text-white">
                  The Leaky Funnel UI
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Driving ad clicks to a page with messy value props, too many form fields, and poor mobile responsiveness results in immediate bounces.
                </p>
              </div>
            </div>

            {/* What's the Loss */}
            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "16px", marginTop: "-4px" }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#36b8ff]/90 block mb-1.5">What's the Loss?</span>
              <p className="text-white/60 text-xs leading-relaxed">
                You pay hard-earned money to get visitors to your website, but they leave immediately because the page is confusing. You are wasting budget on empty clicks.
              </p>
            </div>

            {/* Visual funnel conversion representation */}
            <div className="w-full bg-[#08090a] border border-white/5 rounded-2xl p-4 text-[11px] text-white/40">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] text-white/50 mb-1">
                    <span>Ad Traffic / Visits</span>
                    <span className="text-white">100%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-white/20" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-white/50 mb-1">
                    <span>Engagement</span>
                    <span className="text-white/60">32%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[32%] bg-[#36b8ff]/30" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-[#36b8ff]/80 font-semibold mb-1">
                    <span>Conversions (Form Fills)</span>
                    <span>1.2%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[1.2%] bg-[#36b8ff]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Speed Penalty */}
          <div className="problem-card border border-white/10 rounded-3xl bg-white/[0.01] backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:border-[#36b8ff]/30 group" style={{ opacity: 0, padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "28px", minHeight: "480px" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#36b8ff]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#36b8ff]/10 transition-all duration-300" />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-md bg-red-950/20 border border-red-500/25 animate-red-glow">
                  Performance Crash
                </span>
                <Flame className="h-7 w-7 text-[#36b8ff]/70" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h3 className="text-xl font-display font-semibold text-white">
                  Core Web Vital Penalty
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Google and modern search bots penalize websites with slow loading times, heavy assets, and layout shifts, ranking them far down the index.
                </p>
              </div>
            </div>

            {/* What's the Loss */}
            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "16px", marginTop: "-4px" }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#36b8ff]/90 block mb-1.5">What's the Loss?</span>
              <p className="text-white/60 text-xs leading-relaxed">
                A slow-loading website frustrates visitors and makes them leave. Because of this, search engines push your site down, making you invisible online.
              </p>
            </div>

            {/* Visual performance gauge representation */}
            <div className="w-full bg-[#08090a] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="relative w-16 h-16 rounded-full border-4 border-[#36b8ff]/20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#36b8ff] border-t-transparent animate-spin-slow" />
                <span className="font-mono text-base font-bold text-[#36b8ff]">38</span>
              </div>
              <div className="text-[10px] text-white/40 space-y-1.5 text-right font-mono">
                <div>LCP: <span className="text-[#36b8ff] font-semibold">5.4s</span></div>
                <div>CLS: <span className="text-[#36b8ff] font-semibold">0.42</span></div>
                <div>FID: <span className="text-[#36b8ff] font-semibold">240ms</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
