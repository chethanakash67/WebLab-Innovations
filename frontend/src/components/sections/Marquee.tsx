"use client";

import React from "react";

// Custom SVGs for tools that might not have reliable simpleicons or just generic equivalents
const customIcons: Record<string, React.ReactNode> = {
  "Screaming Frog": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
  ),
  "SEOptimer": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  "Google Rich Results Test": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>
  ),
  "BuiltWith": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  ),
};

const marqueeTools = [
  { name: "Figma", slug: "figma" },
  { name: "Webflow", slug: "webflow" },
  { name: "Shopify", slug: "shopify" },
  { name: "Screaming Frog", node: customIcons["Screaming Frog"] },
  { name: "SEOptimer", node: customIcons["SEOptimer"] },
  { name: "Google PageSpeed Insights", slug: "pagespeedinsights" },
  { name: "Google Search Console", slug: "googlesearchconsole" },
  { name: "Google Rich Results Test", node: customIcons["Google Rich Results Test"] },
  { name: "Semrush", slug: "semrush" },
  { name: "BuiltWith", node: customIcons["BuiltWith"] },
  { name: "Zoho Invoice", slug: "zoho" },
  { name: "Vercel", slug: "vercel" },
  { name: "Make (Integromat)", slug: "make" },
  { name: "n8n", slug: "n8n" },
];

export default function Marquee() {
  // Triple the items for seamless loop
  const tripled = [...marqueeTools, ...marqueeTools, ...marqueeTools];

  return (
    <section className="marquee-section relative pt-16 lg:pt-32 pb-8 lg:pb-12 flex items-center">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full flex flex-col md:flex-row items-stretch justify-center gap-6">
        
        {/* Left: Static Text Card */}
        <div className="shrink-0 flex items-center px-12 lg:px-16 py-10 lg:py-12 bg-white/[0.02] rounded-2xl backdrop-blur-md z-20">
          <h2 className="text-3xl lg:text-5xl font-display font-bold whitespace-nowrap tracking-tight leading-[1.1]">
            <span className="text-[#36b8ff] block">Tools we</span>
            <span className="text-white block">work with</span>
          </h2>
        </div>

        {/* Right: Scrolling Marquee Card */}
        <div className="relative flex-1 min-w-0 max-w-[1000px] flex items-center bg-white/[0.02] rounded-2xl backdrop-blur-md py-6 px-4">
          
          {/* Mask container to handle fading edges seamlessly. Extra vertical padding ensures the tooltips aren't clipped by the mask boundary! */}
          <div 
            className="w-full py-16 -my-16"
            style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
          >
            <div
              className="marquee-track flex gap-16 items-center animate-marquee hover:[animation-play-state:paused]"
              style={{ width: "max-content" }}
            >
            {tripled.map((tool, i) => (
              <div
                key={`${tool.name}-${i}`}
                className="group relative marquee-logo flex items-center justify-center text-white/40 transition-all duration-300 hover:text-white hover:z-[999]"
              >
                {/* Custom Tooltip */}
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none z-[9999]">
                  <div className="bg-[#11151a] border border-white/20 text-white text-[12px] font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-2xl">
                    {tool.name}
                  </div>
                </div>

                {tool.slug ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={`https://cdn.simpleicons.org/${tool.slug}/white`} 
                    alt={tool.name} 
                    className="w-9 h-9 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                ) : (
                  tool.node
                )}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
