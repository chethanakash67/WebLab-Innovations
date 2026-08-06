"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Footer from "@/components/layout/Footer";

import SmoothScroll from "@/components/providers/SmoothScroll";
const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

export default function WorkPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "100px", minHeight: "75vh", position: "relative", zIndex: 10 }}>
        <FeaturedWork />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
