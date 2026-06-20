"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Footer from "@/components/layout/Footer";

// Dynamic imports for sections below the fold
const Problem = dynamic(() => import("@/components/sections/Problem"));
const Services = dynamic(() => import("@/components/sections/Services"));
const CustomerSystem = dynamic(() => import("@/components/sections/CustomerSystem"));
const Achievements = dynamic(() => import("@/components/sections/Achievements"));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const Founders = dynamic(() => import("@/components/sections/Founders"));
const OurStory = dynamic(() => import("@/components/sections/OurStory"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Packages = dynamic(() => import("@/components/sections/Packages"));

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
        <Hero />
        <Marquee />
        <Problem />
        <Services />
        <CustomerSystem />
        <Achievements />
        <WhyChooseUs />
        <Founders />
        <OurStory />
        <Process />
        <Packages />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
