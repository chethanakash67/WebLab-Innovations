"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";

import SmoothScroll from "@/components/providers/SmoothScroll";
const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

export default function TestimonialsPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "140px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <Testimonials />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
