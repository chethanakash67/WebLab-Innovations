"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Footer from "@/components/layout/Footer";

// Dynamic imports for sections below the fold
const Problem = dynamic(() => import("@/components/sections/Problem"));
const Services = dynamic(() => import("@/components/sections/Services"));
const BestWork = dynamic(() => import("@/components/sections/BestWork"));
const CustomerSystem = dynamic(() => import("@/components/sections/CustomerSystem"));
const Achievements = dynamic(() => import("@/components/sections/Achievements"));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const Process = dynamic(() => import("@/components/sections/Process"));
const OurStory = dynamic(() => import("@/components/sections/OurStory"));
const Founders = dynamic(() => import("@/components/sections/Founders"));

const SmoothScroll = dynamic(
  () => import("@/components/providers/SmoothScroll"),
  { ssr: false }
);
const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main>
        {/* 1. Hook */}
        <Hero />
        <Marquee />

        {/* 2. Problem — why they need us */}
        <Problem />

        {/* 3. Services — what we offer */}
        <Services />

        {/* 4. BestWork — Bento box showcase */}
        <BestWork />

        {/* 5. CustomerSystem — deeper dive into our system */}
        <CustomerSystem />

        {/* 5. Achievements — credibility proof */}
        <Achievements />

        {/* 6. Our Story — humanises the brand right after stats */}
        <OurStory />

        {/* 7. Why Choose Us — trust building */}
        <WhyChooseUs />

        {/* 8. Process — how we work */}
        <Process />

        {/* 9. Closing — team */}
        <Founders />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

