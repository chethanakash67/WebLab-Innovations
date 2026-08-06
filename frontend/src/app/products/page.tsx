"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkle, X, Maximize2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { techProducts } from "@/data/projects";

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

function ProductDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <p
        style={{
          fontSize: "1.05rem",
          color: "#d1d5db",
          lineHeight: 1.6,
          margin: 0,
          display: expanded ? "block" : "-webkit-box",
          WebkitLineClamp: expanded ? undefined : 3,
          WebkitBoxOrient: "vertical",
          overflow: expanded ? "visible" : "hidden",
        }}
      >
        {description}
      </p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "none",
          border: "none",
          color: "#36b8ff",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
          padding: 0,
          marginTop: "6px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        {expanded ? "Show less" : "...Read more"}
      </button>
    </div>
  );
}

export default function ProductsPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />

      <main style={{ paddingTop: "130px", paddingBottom: "90px", position: "relative", zIndex: 10, backgroundColor: "#020303", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1500px", width: "100%", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)" }}>
          
          {/* Header Section */}
          <div style={{ marginBottom: "60px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <SectionBadge label="Venture Lab" number="01" />
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)",
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                marginTop: "16px",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              Explore our <span style={{ color: "#36b8ff" }}>tech products</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                color: "#9ca3aa",
                maxWidth: "720px",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Apart from our client services, we build and launch proprietary tech products as an in-house venture lab.
            </p>
          </div>

          {/* Tech Products Stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {techProducts.map((prod) => (
              <article
                key={prod.id}
                style={{
                  position: "relative",
                  backgroundColor: "#0b0d0f",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "24px",
                  padding: "clamp(24px, 4vw, 40px)",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(54, 184, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                }}
              >
                {/* Background Glow */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "400px",
                    height: "400px",
                    background: "radial-gradient(circle at top right, rgba(54, 184, 255, 0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
                  
                  {/* Badges Row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#36b8ff",
                        backgroundColor: "rgba(54, 184, 255, 0.1)",
                        border: "1px solid rgba(54, 184, 255, 0.3)",
                        padding: "4px 14px",
                        borderRadius: "20px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: prod.id === "dropiq" ? "#10b981" : "#36b8ff",
                          boxShadow: prod.id === "dropiq" ? "0 0 8px #10b981" : "0 0 8px #36b8ff",
                        }}
                      />
                      {prod.status}
                    </span>

                    {/* Paused Flag for DropIQ */}
                    {prod.pausedFlag && (
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#f59e0b",
                          backgroundColor: "rgba(245, 158, 11, 0.12)",
                          border: "1px solid rgba(245, 158, 11, 0.3)",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "#f59e0b",
                            boxShadow: "0 0 6px #f59e0b",
                          }}
                        />
                        {prod.pausedFlag}
                      </span>
                    )}

                    <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>
                      {prod.type}
                    </span>
                  </div>

                  {/* Title & Small Image Box Beside Title */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                        fontFamily: "var(--font-display), sans-serif",
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.15,
                      }}
                    >
                      {prod.title}
                    </h2>

                    {/* Small Thumbnail Box Beside Title */}
                    <button
                      type="button"
                      onClick={() => setSelectedImage({ src: prod.images[0], title: prod.title })}
                      title="Click to view full image"
                      style={{
                        position: "relative",
                        width: "80px",
                        height: "80px",
                        borderRadius: "14px",
                        overflow: "hidden",
                        border: "1.5px solid rgba(54, 184, 255, 0.4)",
                        backgroundColor: "#11151a",
                        cursor: "pointer",
                        padding: 0,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                        transition: "all 0.25s ease",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.06)";
                        e.currentTarget.style.borderColor = "#36b8ff";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(54, 184, 255, 0.35)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.borderColor = "rgba(54, 184, 255, 0.4)";
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.4)";
                      }}
                    >
                      <Image
                        src={prod.images[0]}
                        alt={`${prod.title} preview`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="80px"
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "rgba(0,0,0,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                          opacity: 0.85,
                        }}
                      >
                        <Maximize2 style={{ width: "16px", height: "16px" }} />
                      </div>
                    </button>
                  </div>

                  {/* Expandable Description */}
                  <ProductDescription description={prod.description} />

                  {/* Key Capabilities */}
                  <div style={{ paddingTop: "4px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "#9ca3aa",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "12px",
                      }}
                    >
                      Key Capabilities
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {prod.features.map((feat, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: "14px",
                            color: "#e2e8f0",
                          }}
                        >
                          <Sparkle style={{ width: "14px", height: "14px", color: "#36b8ff", flexShrink: 0 }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div style={{ paddingTop: "12px" }}>
                    {prod.link && prod.link !== "#" ? (
                      <a
                        href={prod.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "12px 24px",
                          backgroundColor: "#36b8ff",
                          color: "#020303",
                          fontWeight: 700,
                          borderRadius: "12px",
                          fontSize: "15px",
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          boxShadow: "0 0 20px rgba(54, 184, 255, 0.25)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.02)";
                          e.currentTarget.style.backgroundColor = "#52c5ff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.backgroundColor = "#36b8ff";
                        }}
                      >
                        Launch {prod.title} {prod.id === "humanonn" && <span style={{ fontSize: "12px", fontWeight: 600, opacity: 0.85, marginLeft: "2px" }}>(Beta Version)</span>}
                        <ArrowUpRight style={{ width: "16px", height: "16px" }} />
                      </a>
                    ) : (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "12px 24px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          color: "#9ca3aa",
                          fontWeight: 600,
                          borderRadius: "12px",
                          fontSize: "14px",
                        }}
                      >
                        In Internal Beta / Venture Development
                      </span>
                    )}
                  </div>

                </div>
              </article>
            ))}
          </div>

          {/* Bottom Back Link */}
          <div style={{ marginTop: "60px", textAlign: "center" }}>
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#9ca3aa",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3aa")}
            >
              View Client Projects & Case Studies
            </Link>
          </div>

        </div>
      </main>

      {/* Full Image Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(2, 3, 3, 0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.25s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "85vh",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(54, 184, 255, 0.4)",
              backgroundColor: "#0b0d0f",
              boxShadow: "0 25px 80px rgba(0, 0, 0, 0.8)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "#11151a",
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-display)" }}>
                {selectedImage.title} Preview
              </span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            {/* Modal Image */}
            <div style={{ position: "relative", width: "85vw", height: "70vh", maxWidth: "1200px" }}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                style={{ objectFit: "contain" }}
                sizes="90vw"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </SmoothScroll>
  );
}
