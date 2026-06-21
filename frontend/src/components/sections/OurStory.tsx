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
      // Typewriter reveal: Starts translucent gray (opacity 0.25), turns solid white (opacity 1)
      gsap.fromTo(".story-char",
        { opacity: 0.35 },
        {
          opacity: 1,
          duration: 0.1,
          stagger: 0.015, // 15ms per letter reveal
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".story-content",
            start: "top 85%",
            toggleActions: "play reset play reset",
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
            <SectionBadge label="Our Origins" number="06" />
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
                text="It started on a phone call, 10:30 on a weekend night. Two friends, both tired of grinding the same DSA sheets for the same jobs everyone around them was chasing. That call wasn't a business plan, just us wanting to build with the skills and knowledge we actually had. Over the next two years, that turned into late nights shipping small apps and tools, just to see if real people would use something we built."
                highlights={["phone call", "Two friends", "building custom apps", "same jobs"]}
              />
            </p>
            <p className="leading-relaxed max-w-[700px]">
              <SplitText
                text="Somewhere in that process, we noticed specialty food and artisan brands kept getting skipped. Because nobody had ever explained why a nice-looking website still doesn't get found, or sell. Most of them had never even heard of AEO. That gap became The AigleOn Labs, Chethan's eye for interfaces that actually convert, and Sai's grip on the technical side that gets a brand found on Google and AI search. Our mission is simple: pretty and converting are not the same thing, and we're here to close that gap, for brands and businesses."
                highlights={["specialty food and artisan brands","why a nice-looking website still doesn't get found","never even heard of AEO","visibility engines built for the future of search"]}
              />
            </p>

            <div className="mt-4">
              <Link href="/story" className="button button-muted group">
                Know our whole story
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
