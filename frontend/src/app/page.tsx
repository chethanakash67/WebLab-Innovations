"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Footer from "@/components/layout/Footer";

// Dynamic imports for sections below the fold
const Services = dynamic(() => import("@/components/sections/Services"));
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"));
const CustomerSystem = dynamic(() => import("@/components/sections/CustomerSystem"));
const Achievements = dynamic(() => import("@/components/sections/Achievements"));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const Founders = dynamic(() => import("@/components/sections/Founders"));
const Playground = dynamic(() => import("@/components/sections/Playground"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

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
        <Services />
        <FeaturedWork />
        <CustomerSystem />
        <Achievements />
        <WhyChooseUs />
        <Founders />
        <Playground />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
