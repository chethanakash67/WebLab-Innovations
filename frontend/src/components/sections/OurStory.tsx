"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  highlights: string[];
}

function SplitText({ text, highlights }: SplitTextProps) {
  interface Range {
    start: number;
    end: number;
    text: string;
  }

  const ranges: Range[] = [];
  highlights.forEach((hl) => {
    let index = text.indexOf(hl);
    while (index !== -1) {
      ranges.push({ start: index, end: index + hl.length, text: hl });
      index = text.indexOf(hl, index + 1);
    }
  });

  // Sort ranges by start index
  ranges.sort((a, b) => a.start - b.start);

  // Filter overlaps
  const nonOverlappingRanges: Range[] = [];
  let current: Range | null = null;
  for (const r of ranges) {
    if (!current) {
      current = r;
    } else if (r.start >= current.end) {
      nonOverlappingRanges.push(current);
      current = r;
    } else if (r.end > current.end) {
      current.end = r.end;
    }
  }
  if (current) {
    nonOverlappingRanges.push(current);
  }

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  const pushChars = (str: string, isHighlight: boolean, keyPrefix: string) => {
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      nodes.push(
        <span
          key={`${keyPrefix}-${i}`}
          className={`story-char ${isHighlight ? "story-highlight-char" : ""}`}
        >
          {char}
        </span>
      );
    }
  };

  nonOverlappingRanges.forEach((range, rangeIndex) => {
    if (range.start > lastIndex) {
      const normalText = text.substring(lastIndex, range.start);
      pushChars(normalText, false, `normal-${rangeIndex}`);
    }

    const highlightText = text.substring(range.start, range.end);
    const highlightKey = `hl-${rangeIndex}`;
    
    const highlightChars: React.ReactNode[] = [];
    for (let i = 0; i < highlightText.length; i++) {
      const char = highlightText[i];
      highlightChars.push(
        <span
          key={`char-${i}`}
          className="story-char story-highlight-char"
        >
          {char}
        </span>
      );
    }

    nodes.push(
      <span key={highlightKey} className="story-highlight inline">
        {highlightChars}
      </span>
    );

    lastIndex = range.end;
  });

  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    pushChars(remainingText, false, "remaining");
  }

  return <>{nodes}</>;
}

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger to recalculate heights of dynamic sections above
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Typewriter reveal from opacity 0 to 1
      gsap.fromTo(".story-char",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.01,
          stagger: 0.01, // 10ms per letter reveal
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Activate highlight underlines
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          document.querySelectorAll(".story-highlight").forEach((el) => {
            el.classList.add("is-active");
          });
        },
      });
    }, sectionRef);

    // Refresh after dynamic components settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="story" className="section-padding story-section relative overflow-hidden">
      <div className="story-watermark absolute select-none opacity-[0.02] font-display font-bold text-[18vw] leading-none pointer-events-none text-white left-[-2%] bottom-[-5%]">
        STORY
      </div>
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24 items-start">
          <header className="story-header story-reveal">
            <SectionBadge label="Our Origins" number="08" />
            <h2 className="text-4xl lg:text-5xl font-display font-medium tracking-tight mt-6 text-white">
              How a simple idea
              <br />
              <span className="text-primary-light">became AigleOn Labs.</span>
            </h2>
            <div className="flex items-center gap-3 mt-8 text-xs text-primary-light/70 uppercase tracking-widest font-semibold font-display">
              <Sparkles className="h-4 w-4 text-primary-light" />
              <span>Founded by IIIT Students</span>
            </div>
          </header>

          <div className="story-content flex flex-col gap-8">
            <p className="leading-relaxed max-w-[700px]">
              <SplitText
                text="It started in the labs of IIIT, where we spent nights building custom apps, hacking together AI pipelines, and analyzing search algorithms. We noticed a major shift: businesses were struggling to stand out not just on Google, but across ChatGPT and modern AI search engines. There was a clear gap between beautiful designs and the technical intelligence that search engines actually trust."
                highlights={["labs of IIIT", "ChatGPT and modern AI search engines", "technical intelligence"]}
              />
            </p>
            <p className="leading-relaxed max-w-[700px]">
              <SplitText
                text="This led to the birth of The AigleOn Labs. By combining Chethan's eye for polished, conversion-oriented user interfaces with Sai's expertise in SEO-first systems and AI integrations, we set out to build digital products that look premium and rank dominantly. We don't just build websites; we design complete visibility engines built for the future of search."
                highlights={["The AigleOn Labs", "conversion-oriented user interfaces", "SEO-first systems and AI integrations", "visibility engines built for the future of search"]}
              />
            </p>

            <div className="mt-4">
              <Link
                href="/story"
                className="story-cta-link inline-flex items-center gap-4 group border border-white/10 hover:border-primary-light/40 bg-white/[0.02] hover:bg-primary-light/[0.04] text-white hover:text-primary-light px-10 py-4 rounded-full font-semibold transition-all duration-300 font-display"
              >
                <span>Know our whole story</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
