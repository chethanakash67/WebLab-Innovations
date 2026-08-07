"use client";

import dynamic from "next/dynamic";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import SmoothScroll from "@/components/providers/SmoothScroll";

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

const Contact = dynamic(
  () => import("@/components/sections/Contact"),
  { ssr: false }
);

export default function ContactPage() {
  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main style={{ paddingTop: "140px", minHeight: "80vh", position: "relative", zIndex: 10 }}>
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
