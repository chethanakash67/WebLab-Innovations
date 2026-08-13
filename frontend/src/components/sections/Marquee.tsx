"use client";

import React from "react";

const customIcons: Record<string, React.ReactNode> = {
  "Screaming Frog": (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="https://www.google.com/s2/favicons?domain=screamingfrog.co.uk&sz=128" alt="Screaming Frog" className="w-9 h-9 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
  ),
  "SEOptimer": (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="https://www.google.com/s2/favicons?domain=seoptimer.com&sz=128" alt="SEOptimer" className="w-9 h-9 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
  ),
  "Google Rich Results Test": (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="https://www.google.com/s2/favicons?domain=search.google.com&sz=128" alt="Google Rich Results Test" className="w-9 h-9 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
  ),
  "BuiltWith": (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="https://www.google.com/s2/favicons?domain=builtwith.com&sz=128" alt="BuiltWith" className="w-9 h-9 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
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
      <div className="max-w-[1500px] mx-auto page-inset w-full flex flex-col md:flex-row items-stretch justify-center gap-6">
        
        {/* Left: Static Text Card */}
        <div className="shrink-0 flex items-center px-5 md:px-12 lg:px-16 py-3 md:py-10 lg:py-12 bg-white/[0.02] rounded-2xl backdrop-blur-md z-20">
          <h2 className="marquee-heading text-sm font-sans font-light md:text-3xl md:font-display md:font-bold lg:text-5xl whitespace-nowrap tracking-tight leading-[1.1]">
            <span className="text-[#36b8ff] block">Tools we</span>
            <span className="text-white block">work with</span>
          </h2>
        </div>

        {/* Right: Scrolling Marquee Card */}
        <div className="relative flex-1 min-w-0 max-w-[1000px] flex items-center bg-white/[0.02] rounded-2xl backdrop-blur-md py-2 md:py-10 lg:py-12 px-2 md:px-4">
          
          {/* Mask container to handle fading edges seamlessly. */}
          <div 
            className="w-full py-6 -my-6 px-6 -mx-6 md:py-16 md:-my-16 md:px-16 md:-mx-16"
            style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 15%, black 85%, transparent 95%)', maskImage: 'linear-gradient(to right, transparent 5%, black 15%, black 85%, transparent 95%)' }}
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none z-[9999]">
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
