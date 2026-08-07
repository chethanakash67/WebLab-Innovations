"use client";

import dynamic from "next/dynamic";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Packages = dynamic(() => import("@/components/sections/Packages"));

import SmoothScroll from "@/components/providers/SmoothScroll";

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

export default function PricingPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "140px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <Packages />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
