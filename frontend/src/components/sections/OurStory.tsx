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
  // Hidden as requested; code and logic preserved in file
  return null;
}
