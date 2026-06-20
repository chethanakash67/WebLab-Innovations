"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Footer from "@/components/layout/Footer";

const SmoothScroll = dynamic(
  () => import("@/components/providers/SmoothScroll"),
  { ssr: false }
);
const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

export default function WorkPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "140px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <FeaturedWork />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
