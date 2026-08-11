"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import dynamic from "next/dynamic";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";
import SmoothScroll from "@/components/providers/SmoothScroll";
import {
  Search,
  Bot,
  Layers,
  Zap,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  X,
  ChevronDown,
  Send,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { initialPrebuiltAssets, PrebuiltAsset } from "@/app/api/prebuilt-assets/route";

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false }
);

const CATEGORIES = [
  { id: "all", label: "All Assets", icon: Layers },
  { id: "Websites", label: "Websites", icon: Globe },
  { id: "AI Automations", label: "AI Automations", icon: Bot },
  { id: "Digital Assets", label: "Digital Assets", icon: Zap },
  { id: "Bundles", label: "Bundles", icon: Sparkles },
];

export default function PrebuiltAssetsPage() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Websites");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [assets, setAssets] = useState<PrebuiltAsset[]>(initialPrebuiltAssets);
  const [expandedCardId, setExpandedCardId] = useState<string | number | null>(null);

  // Claim Modal Form State
  const [claimAsset, setClaimAsset] = useState<PrebuiltAsset | null>(null);
  const [claimName, setClaimName] = useState<string>("");
  const [claimEmail, setClaimEmail] = useState<string>("");
  const [claimPhone, setClaimPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [claimSubmitted, setClaimSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    fetch(`/api/prebuilt-assets?category=${encodeURIComponent(activeCategory)}&q=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.items)) {
          setAssets(data.items);
        }
      })
      .catch((err) => console.error("Error loading prebuilt assets:", err));
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleExpand = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const openClaimModal = (asset: PrebuiltAsset, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setClaimAsset(asset);
    setClaimSubmitted(false);
    setErrorMessage("");
    document.body.style.overflow = "hidden";
  };

  const closeClaimModal = () => {
    setClaimAsset(null);
    setClaimSubmitted(false);
    document.body.style.overflow = "";
  };

  const handleClaimSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!claimName.trim() || claimName.trim().length < 2) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!claimEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(claimEmail.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!claimPhone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }

    setIsSubmitting(true);

    const productName = claimAsset ? claimAsset.title : "Pre-built Asset";
    const productPrice = claimAsset ? claimAsset.price : "Custom Price";

    // Format WhatsApp message with strictly Name and Product Name
    const waMessage = `Hi, I am *${claimName.trim()}*. I want to claim the pre-built asset: *${productName}*.`;
    const waUrl = `https://wa.me/917396733009?text=${encodeURIComponent(waMessage)}`;

    try {
      // 1. FIRST store lead in database table product_claims
      await fetch("/api/product-claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: claimName.trim(),
          email: claimEmail.trim().toLowerCase(),
          phone: claimPhone.trim(),
          product_name: productName,
          product_slug: claimAsset?.slug || "prebuilt-asset",
          price: productPrice,
        }),
      });
    } catch (err) {
      console.error("Error storing claim lead to database:", err);
    } finally {
      setIsSubmitting(false);
      setClaimSubmitted(true);
      // 2. THEN redirect to WhatsApp to send message
      window.open(waUrl, "_blank");
    }
  };

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.label || "All Assets";

  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />

      <main style={{ paddingTop: "130px", minHeight: "85vh", position: "relative", zIndex: 10, backgroundColor: "#020303" }}>
        {/* Soft Ambient Glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "5%",
            right: "50%",
            transform: "translateX(50%)",
            width: "500px",
            height: "500px",
            backgroundColor: "rgba(54, 184, 255, 0.05)",
            borderRadius: "50%",
            filter: "blur(130px)",
            pointerEvents: "none",
          }}
        />

        <section style={{ padding: "48px 16px 80px 16px", position: "relative" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto", textAlign: "center" }}>
            {/* Header (Centered) */}
            <div style={{ marginBottom: "36px", textAlign: "center" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
                <SectionBadge label="Product Catalog" number="03" />
                <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#9ca3af" }}>[ Ready To Deploy ]</span>
              </div>
              <h1
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-display), Syne, sans-serif",
                  marginBottom: "14px",
                  lineHeight: 1.15,
                  textAlign: "center",
                }}
              >
                Pre-Built Assets <span style={{ color: "#36b8ff" }}>&amp; Workflows.</span>
              </h1>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.78)",
                  fontSize: "0.98rem",
                  lineHeight: "1.6",
                  maxWidth: "760px",
                  margin: "0 auto",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  textAlign: "center",
                }}
              >
                Plug-and-play AI automations, digital growth kits, and ready-to-deploy workflow bundles built with deep niche research and current market trends. Every asset includes custom tweaks for your business before handoff.
              </p>
            </div>

            {/* Filter & Search Toolbar (Centered) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginBottom: "36px",
                paddingBottom: "20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px", width: "100%" }}>
                {/* Dropdown Filter */}
                <div style={{ position: "relative", minWidth: "260px" }} ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 18px",
                      borderRadius: "14px",
                      border: dropdownOpen ? "1px solid #36b8ff" : "1px solid rgba(255, 255, 255, 0.16)",
                      backgroundColor: dropdownOpen ? "rgba(54, 184, 255, 0.1)" : "rgba(255, 255, 255, 0.04)",
                      color: "#ffffff",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#36b8ff", fontSize: "11px", fontWeight: 600 }}>CATEGORY:</span>
                      <span style={{ color: "#ffffff", fontWeight: 600 }}>{activeCategoryLabel}</span>
                    </div>
                    <ChevronDown
                      style={{
                        width: "14px",
                        height: "14px",
                        color: "#36b8ff",
                        transform: dropdownOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.25s ease",
                      }}
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        zIndex: 50,
                        backgroundColor: "#0d1116",
                        border: "1px solid rgba(54, 184, 255, 0.35)",
                        borderRadius: "14px",
                        padding: "6px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 25px rgba(54, 184, 255, 0.2)",
                      }}
                    >
                      {CATEGORIES.map((tab) => {
                        const Icon = tab.icon;
                        const isSelected = activeCategory === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => {
                              setActiveCategory(tab.id);
                              setDropdownOpen(false);
                            }}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "9px 12px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontFamily: "monospace",
                              letterSpacing: "0.05em",
                              backgroundColor: isSelected ? "rgba(54, 184, 255, 0.16)" : "transparent",
                              color: isSelected ? "#36b8ff" : "#d1d5db",
                              fontWeight: isSelected ? 700 : 500,
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <Icon style={{ width: "14px", height: "14px", color: isSelected ? "#36b8ff" : "#9ca3af" }} />
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Search Bar */}
                <div style={{ position: "relative", minWidth: "260px", maxWidth: "340px" }}>
                  <Search
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "15px",
                      height: "15px",
                      color: "rgba(255, 255, 255, 0.4)",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search assets or features..."
                    style={{
                      width: "100%",
                      padding: "10px 14px 10px 38px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      fontSize: "12px",
                      color: "#ffffff",
                      outline: "none",
                      boxSizing: "border-box",
                      textAlign: "center",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Assets Grid (Centered Content inside Cards) */}
            {assets.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "20px",
                  marginBottom: "60px",
                  justifyContent: "center",
                }}
              >
                {assets.map((asset) => {
                  const isExpanded = expandedCardId === asset.id;
                  return (
                    <div
                      key={asset.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        backgroundColor: "#0e1115",
                        padding: "20px",
                        textAlign: "left",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <div>
                        {/* Flags Row: Social Proof Flag (Left) & Category Badge (Right) */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "12px" }}>
                          <div
                            style={{
                              fontSize: "11px",
                              fontFamily: "monospace",
                              color: "rgba(255, 255, 255, 0.85)",
                              backgroundColor: "rgba(54, 184, 255, 0.08)",
                              border: "1px solid rgba(54, 184, 255, 0.25)",
                              borderRadius: "20px",
                              padding: "3px 10px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span>🔥</span>
                            <span><strong style={{ color: "#36b8ff", fontWeight: 700 }}>13</strong> people already bought this.</span>
                          </div>

                          <span
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "rgba(54, 184, 255, 0.12)",
                              border: "1px solid rgba(54, 184, 255, 0.35)",
                              padding: "3px 12px",
                              fontSize: "11px",
                              fontFamily: "monospace",
                              color: "#36b8ff",
                              fontWeight: 600,
                            }}
                          >
                            {asset.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#ffffff",
                            marginBottom: "8px",
                            lineHeight: "1.3",
                            fontFamily: "var(--font-display), Syne, sans-serif",
                            textAlign: "left",
                          }}
                        >
                          {asset.title}
                        </h3>

                        {/* Tagline / Subtitle - 2 Lines Limit */}
                        <p
                          style={{
                            fontSize: "12.5px",
                            color: "rgba(255, 255, 255, 0.7)",
                            marginBottom: "6px",
                            lineHeight: "1.5",
                            display: isExpanded ? "block" : "-webkit-box",
                            WebkitLineClamp: isExpanded ? "none" : 2,
                            WebkitBoxOrient: "vertical",
                            overflow: isExpanded ? "visible" : "hidden",
                            textAlign: "left",
                          }}
                        >
                          {asset.tagline}
                        </p>

                        {/* Read More / Show Less Toggle Link & Live Link */}
                        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                          <button
                            type="button"
                            onClick={(e) => toggleExpand(asset.id, e)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#36b8ff",
                              fontSize: "12px",
                              fontWeight: 600,
                              padding: 0,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span>{isExpanded ? "Show less" : "Read more"}</span>
                            <ChevronDown
                              style={{
                                width: "12px",
                                height: "12px",
                                transform: isExpanded ? "rotate(180deg)" : "none",
                                transition: "transform 0.2s ease",
                              }}
                            />
                          </button>

                          {asset.demoUrl && (
                            <a
                              href={asset.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                color: "#ffffff",
                                fontSize: "12px",
                                fontWeight: 600,
                                textDecoration: "underline",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "3px",
                                opacity: 0.9,
                              }}
                            >
                              <span>Live Link</span>
                              <ExternalLink style={{ width: "11px", height: "11px", color: "#36b8ff" }} />
                            </a>
                          )}
                        </div>

                        {/* Features List & Full Description (Expanded inline) */}
                        {isExpanded && (
                          <div
                            style={{
                              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                              paddingTop: "12px",
                              marginBottom: "14px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {asset.description && (
                              <p style={{ fontSize: "12.5px", color: "rgba(255, 255, 255, 0.85)", lineHeight: "1.55", marginBottom: "4px" }}>
                                {asset.description}
                              </p>
                            )}
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                              {asset.features.map((feat, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255, 255, 255, 0.85)" }}>
                                  <CheckCircle2 style={{ width: "13px", height: "13px", color: "#36b8ff", flexShrink: 0 }} />
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Pricing + Claim Button Side-by-Side (0 Border Radius) & Asterisk Notes */}
                      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px" }}>
                        <div style={{ display: "flex", alignItems: "stretch", gap: "8px", marginBottom: "8px" }}>
                          {/* Transparent 0 border radius Price Box with Strikethrough 8,000/- above 3,999/- */}
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "6px 12px",
                              borderRadius: 0,
                              backgroundColor: "transparent",
                              border: "1px solid rgba(54, 184, 255, 0.4)",
                              color: "#ffffff",
                              fontFamily: "monospace",
                            }}
                          >
                            <span style={{ fontSize: "11px", textDecoration: "line-through", color: "rgba(255, 255, 255, 0.5)", lineHeight: "1.1" }}>
                              ₹8,000/-
                            </span>
                            <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#ffffff", lineHeight: "1.2" }}>
                              ₹3,999/-
                            </span>
                          </div>

                          {/* Claim This Button (0 Border Radius) */}
                          <button
                            type="button"
                            onClick={(e) => openClaimModal(asset, e)}
                            style={{
                              flex: 1,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              padding: "10px 14px",
                              borderRadius: 0,
                              backgroundColor: "#36b8ff",
                              color: "#020303",
                              fontSize: "13px",
                              fontWeight: 700,
                              border: "none",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <span>Claim this</span>
                            <ArrowUpRight style={{ width: "15px", height: "15px" }} />
                          </button>
                        </div>

                        {/* Asterisk Notes below price button row */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px", textAlign: "center" }}>
                          <p style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.65)", fontStyle: "italic", margin: 0 }}>
                            * ₹2,500/- annually for maintenance
                          </p>
                          {asset.revisionNote && (
                            <p style={{ fontSize: "11px", color: "#36b8ff", fontStyle: "italic", margin: 0 }}>
                              {asset.revisionNote}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* EMPTY CATEGORY MESSAGE: CLEAN TEXT + LINK, NO BUTTON OUTLINE */
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 20px",
                  marginBottom: "24px",
                }}
              >
                <span style={{ fontSize: "13.5px", color: "rgba(255, 255, 255, 0.7)" }}>
                  No pre-built products currently listed under &ldquo;{activeCategoryLabel}&rdquo;.{" "}
                </span>
                <span
                  onClick={() => setActiveCategory("Websites")}
                  style={{
                    color: "#36b8ff",
                    textDecoration: "underline",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  View Websites Asset (Tabun Chai)
                </span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* DEDICATED "CLAIM THIS" PRODUCT CONTACT FORM MODAL */}
      {claimAsset && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "rgba(2, 3, 3, 0.88)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          onClick={closeClaimModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#0b0d0f",
              border: "1px solid rgba(54, 184, 255, 0.4)",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 0 60px rgba(54, 184, 255, 0.22)",
              color: "#ffffff",
              textAlign: "left",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeClaimModal}
              aria-label="Close claim modal"
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X style={{ width: "18px", height: "18px" }} />
            </button>

            {!claimSubmitted ? (
              <form onSubmit={handleClaimSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      backgroundColor: "rgba(54, 184, 255, 0.15)",
                      border: "1px solid rgba(54, 184, 255, 0.35)",
                      color: "#36b8ff",
                      fontSize: "11px",
                      fontFamily: "monospace",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    <Sparkles style={{ width: "12px", height: "12px" }} />
                    <span>Claim Pre-Built Asset</span>
                  </span>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#ffffff",
                      fontFamily: "var(--font-display), Syne, sans-serif",
                      margin: 0,
                    }}
                  >
                    Claim &ldquo;{claimAsset.title}&rdquo;
                  </h3>
                  <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.7)", marginTop: "4px", marginBottom: 0 }}>
                    Enter your contact details below to send a direct request link to WhatsApp.
                  </p>
                </div>

                {errorMessage && (
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(239, 68, 68, 0.12)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      color: "#f87171",
                      fontSize: "13px",
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d1d5db", marginBottom: "4px" }}>
                      Your Name <span style={{ color: "#36b8ff" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={claimName}
                      onChange={(e) => setClaimName(e.target.value)}
                      placeholder="Alex Vance"
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        borderRadius: "12px",
                        padding: "11px 14px",
                        fontSize: "13px",
                        color: "#ffffff",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d1d5db", marginBottom: "4px" }}>
                      Work Email <span style={{ color: "#36b8ff" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={claimEmail}
                      onChange={(e) => setClaimEmail(e.target.value)}
                      placeholder="alex@company.com"
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        borderRadius: "12px",
                        padding: "11px 14px",
                        fontSize: "13px",
                        color: "#ffffff",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d1d5db", marginBottom: "4px" }}>
                      Phone Number <span style={{ color: "#36b8ff" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={claimPhone}
                      onChange={(e) => setClaimPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        borderRadius: "12px",
                        padding: "11px 14px",
                        fontSize: "13px",
                        color: "#ffffff",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(54, 184, 255, 0.08)",
                    border: "1px solid rgba(54, 184, 255, 0.2)",
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <span style={{ color: "#36b8ff", fontWeight: 600 }}>Selected Package:</span> {claimAsset.title} ({claimAsset.price})
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    backgroundColor: "#36b8ff",
                    color: "#020303",
                    fontWeight: 700,
                    fontSize: "14px",
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 0 25px rgba(54, 184, 255, 0.4)",
                    transition: "all 0.2s ease",
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 style={{ width: "16px", height: "16px" }} className="animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Request</span>
                      <Send style={{ width: "16px", height: "16px" }} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div style={{ padding: "20px 0", textAlign: "center", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(54, 184, 255, 0.15)",
                    border: "1px solid rgba(54, 184, 255, 0.4)",
                    color: "#36b8ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    boxShadow: "0 0 35px rgba(54, 184, 255, 0.3)",
                  }}
                >
                  <CheckCircle2 style={{ width: "32px", height: "32px" }} />
                </div>

                <div>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    Request Sent!
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "rgba(255, 255, 255, 0.8)", marginTop: "8px", marginBottom: 0, lineHeight: "1.5" }}>
                    Thank you <span style={{ color: "#36b8ff", fontWeight: 600 }}>{claimName}</span>! Your WhatsApp chat window has been opened with your pre-filled request for <span style={{ color: "#ffffff", fontWeight: 600 }}>{claimAsset.title}</span>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeClaimModal}
                  style={{
                    padding: "11px 22px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "pointer",
                    margin: "0 auto",
                  }}
                >
                  Return to Website
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </SmoothScroll>
  );
}
