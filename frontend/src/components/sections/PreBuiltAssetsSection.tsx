"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ChevronDown,
  Globe,
  Bot,
  Layers,
  Zap,
  Sparkles,
  CheckCircle2,
  X,
  ShieldCheck,
  Send,
  Loader2,
  ExternalLink,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { initialPrebuiltAssets, PrebuiltAsset } from "@/app/api/prebuilt-assets/route";
import { useRegion } from "@/components/providers/RegionContext";

gsap.registerPlugin(ScrollTrigger);

const FILTERS = [
  { id: "all", label: "All Assets", icon: Layers },
  { id: "Websites", label: "Websites", icon: Globe },
  { id: "AI Automations", label: "AI Automations", icon: Bot },
  { id: "Digital Assets", label: "Digital Assets", icon: Zap },
  { id: "Bundles", label: "Bundles", icon: Sparkles },
];

export default function PreBuiltAssetsSection() {
  const { region } = useRegion();
  const sectionRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const [assets, setAssets] = useState<PrebuiltAsset[]>(initialPrebuiltAssets);
  const [expandedCardId, setExpandedCardId] = useState<string | number | null>(null);

  // Toast notification state
  const [toastMsg, setToastMsg] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  // Claim Modal & Growth Tier Modal State
  const [showGrowthTierModal, setShowGrowthTierModal] = useState<boolean>(false);
  const [claimAsset, setClaimAsset] = useState<PrebuiltAsset | null>(null);
  const [claimName, setClaimName] = useState<string>("");
  const [claimEmail, setClaimEmail] = useState<string>("");
  const [claimPhone, setClaimPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [claimSubmitted, setClaimSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    fetch("/api/prebuilt-assets")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          const merged = data.items.map((fetched: PrebuiltAsset) => {
            const local = initialPrebuiltAssets.find((i) => i.slug === fetched.slug);
            if (!local) return fetched;
            return {
              ...local,
              ...fetched,
              description: local.description || fetched.description,
              priceInr: fetched.priceInr || local.priceInr,
              priceUsd: fetched.priceUsd || local.priceUsd,
              originalPriceInr: fetched.originalPriceInr || local.originalPriceInr,
              originalPriceUsd: fetched.originalPriceUsd || local.originalPriceUsd,
              limitations: (fetched.limitations && fetched.limitations.length > 0) ? fetched.limitations : local.limitations,
              growthTierLink: fetched.growthTierLink || local.growthTierLink,
              liveSoon: fetched.liveSoon !== undefined ? fetched.liveSoon : local.liveSoon,
            };
          });
          setAssets(merged);
        }
      })
      .catch((err) => console.error("Error fetching prebuilt assets:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prebuilt-display-line", {
        yPercent: 100,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".prebuilt-header",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".prebuilt-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".prebuilt-grid",
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter items & restrict to maximum of 4 products for 2x2 grid
  const filteredAssets = (
    activeFilter === "all"
      ? assets
      : assets.filter(
          (item) => item.category.toLowerCase() === activeFilter.toLowerCase()
        )
  ).slice(0, 4);

  const activeFilterLabel =
    FILTERS.find((f) => f.id === activeFilter)?.label || "All Assets";

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

  return (
    <>
      <section
        ref={sectionRef}
        id="prebuilt-assets"
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#07090b",
          padding: "44px 16px",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {/* Soft Ambient Glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-100px",
            right: "5%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            backgroundColor: "rgba(54, 184, 255, 0.05)",
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div className="section-meta-row" style={{ marginBottom: "16px" }}>
            <span>[ Fast Setup · Affordable · Battle-tested ]</span>
            <SectionBadge label="Ready-to-Deploy Assets" number="03" />
            <span>[ 2x2 Product Grid ]</span>
          </div>

          {/* Header */}
          <div className="prebuilt-header" style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 20px auto" }}>
            <div className="overflow-hidden">
              <span
                className="prebuilt-display-line"
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#36b8ff",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                Plug &amp; Play Workflows
              </span>
            </div>
            <div className="overflow-hidden">
              <h2
                className="prebuilt-display-line"
                style={{
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  marginBottom: "10px",
                  fontFamily: "var(--font-display), Syne, sans-serif",
                  lineHeight: 1.15,
                }}
              >
                Is It <span style={{ color: "#36b8ff" }}>Very Complex</span>?
              </h2>
            </div>
            {/* SHORTENED DESCRIPTION */}
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.55",
                color: "rgba(255, 255, 255, 0.75)",
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                margin: "0 auto",
                maxWidth: "680px",
              }}
            >
              Not ready for a full custom system? Plug proven pre-built assets directly into your workflow at an affordable price, complete with custom brand tweaks before handoff.
            </p>
          </div>

          {/* AIGLEON LIBRARY STYLE DROPDOWN FILTER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <div style={{ position: "relative", width: "100%", maxWidth: "320px" }} ref={dropdownRef}>
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
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: dropdownOpen ? "0 0 20px rgba(54, 184, 255, 0.25)" : "none",
                  transition: "all 0.25s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#36b8ff", fontSize: "11px", fontWeight: 600 }}>FILTER:</span>
                  <span style={{ color: "#ffffff", fontWeight: 600 }}>{activeFilterLabel}</span>
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
                    top: "calc(100% + 8px)",
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    backgroundColor: "#0d1116",
                    border: "1px solid rgba(54, 184, 255, 0.35)",
                    borderRadius: "14px",
                    padding: "6px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(54, 184, 255, 0.2)",
                  }}
                >
                  {FILTERS.map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = activeFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveFilter(tab.id);
                          setDropdownOpen(false);
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          fontSize: "12px",
                          fontFamily: "monospace",
                          letterSpacing: "0.05em",
                          backgroundColor: isSelected ? "rgba(54, 184, 255, 0.16)" : "transparent",
                          color: isSelected ? "#36b8ff" : "#d1d5db",
                          fontWeight: isSelected ? 700 : 500,
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
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
          </div>

          {/* 2x2 PRODUCT CATALOG GRID */}
          {filteredAssets.length > 0 ? (
            <div
              className="prebuilt-grid grid grid-cols-1 md:grid-cols-2"
              style={{
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              {filteredAssets.map((asset) => {
                const isExpanded = expandedCardId === asset.id;
                return (
                  <div
                    key={asset.id}
                    className="prebuilt-card group"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      backgroundColor: "#0e1115",
                      padding: "18px 20px",
                      transition: "all 0.25s ease",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
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

                      {/* Product Title */}
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#ffffff",
                          marginBottom: "6px",
                          lineHeight: "1.3",
                          fontFamily: "var(--font-display), Syne, sans-serif",
                        }}
                      >
                        {asset.title}
                      </h3>

                      {/* Description - 2 Lines Limit */}
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
                        }}
                      >
                        {asset.tagline}
                      </p>

                      {/* Read More / Show Less toggle link & Live Link */}
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
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

                        {asset.demoUrl ? (
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
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setToastMsg("This will be live soon");
                              setShowToast(true);
                              setTimeout(() => setShowToast(false), 2600);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#ffffff",
                              fontSize: "12px",
                              fontWeight: 600,
                              textDecoration: "underline",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "3px",
                              opacity: 0.85,
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            <span>Live Link</span>
                            <ExternalLink style={{ width: "11px", height: "11px", color: "#36b8ff" }} />
                          </button>
                        )}
                      </div>

                      {/* Features list, full description & limitations (visible when expanded) */}
                      {isExpanded && (
                        <div
                          style={{
                            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                            paddingTop: "10px",
                            marginBottom: "12px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {asset.description && (
                            <div style={{ fontSize: "12.5px", color: "rgba(255, 255, 255, 0.85)", lineHeight: "1.55", marginBottom: "4px", whiteSpace: "pre-line" }}>
                              {asset.description}
                            </div>
                          )}

                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {asset.features.map((feat, i) => (
                              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255, 255, 255, 0.85)" }}>
                                <CheckCircle2 style={{ width: "13px", height: "13px", color: "#36b8ff", flexShrink: 0 }} />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Product Limitations Section */}
                          {asset.limitations && asset.limitations.length > 0 && (
                            <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px dashed rgba(255,255,255,0.12)" }}>
                              <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
                                Scope &amp; Product Limitations
                              </span>
                              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                {asset.limitations.map((lim, idx) => (
                                  <p key={idx} style={{ fontSize: "11.5px", color: "rgba(255, 255, 255, 0.72)", lineHeight: "1.45", margin: 0, paddingLeft: "8px", borderLeft: "2px solid rgba(54, 184, 255, 0.4)" }}>
                                    {lim}
                                  </p>
                                ))}
                              </div>

                              {asset.growthTierLink && (
                                <div style={{ marginTop: "10px" }}>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowGrowthTierModal(true);
                                    }}
                                    style={{
                                      fontSize: "12px",
                                      color: "#36b8ff",
                                      fontWeight: 600,
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      textDecoration: "underline",
                                      background: "none",
                                      border: "none",
                                      padding: 0,
                                      cursor: "pointer",
                                    }}
                                  >
                                    <span>Need custom workflows or advanced AI rules? Go to Growth Tier</span>
                                    <ArrowUpRight style={{ width: "12px", height: "12px" }} />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Pricing + Claim Button Side-by-Side (0 Border Radius) & Asterisk Notes */}
                      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px" }}>
                        <div style={{ display: "flex", alignItems: "stretch", gap: "8px", marginBottom: "8px" }}>
                          {/* Price Box matching Region (India vs Others) */}
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "6px 10px",
                              borderRadius: 0,
                              backgroundColor: "transparent",
                              border: "1px solid rgba(54, 184, 255, 0.4)",
                              color: "#ffffff",
                              fontFamily: "monospace",
                              textAlign: "center",
                            }}
                          >
                            <span style={{ fontSize: "11px", textDecoration: "line-through", color: "rgba(255, 255, 255, 0.5)", lineHeight: "1.1" }}>
                              {region === "IN"
                                ? asset.originalPriceInr || asset.originalPrice || "₹18,000/-"
                                : asset.originalPriceUsd || "$350/-"}
                            </span>
                            <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#ffffff", lineHeight: "1.2", textAlign: "center" }}>
                              {region === "IN"
                                ? asset.priceInr || asset.price || "₹9,999/-"
                                : asset.priceUsd || "$199/-"}
                            </span>
                          </div>

                          {/* Claim This Button (0 Border Radius, Edged Theme Button) */}
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
                              fontSize: "13px",
                              fontWeight: 700,
                              cursor: "pointer",
                              transition: "all 0.25s ease",
                            }}
                            className="bg-transparent hover:bg-[#36b8ff] text-white hover:text-[#020303] border border-[#36b8ff] group/claimbtn"
                          >
                            <span>Claim this</span>
                            <ArrowUpRight style={{ width: "15px", height: "15px" }} className="transition-transform duration-200 group-hover/claimbtn:-translate-y-0.5 group-hover/claimbtn:translate-x-0.5" />
                          </button>
                        </div>

                        {/* Asterisk Notes below price button row */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          <p style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.65)", fontStyle: "italic", margin: 0 }}>
                            {region === "IN"
                              ? asset.maintenanceNoteInr || asset.maintenanceNote || "* ₹2,500/- annually for maintenance"
                              : asset.maintenanceNoteUsd || "* $35/- annually for maintenance"}
                          </p>
                          {asset.revisionNote && (
                            <p style={{ fontSize: "11px", color: "#36b8ff", fontStyle: "italic", margin: 0 }}>
                              {asset.revisionNote}
                            </p>
                          )}
                        </div>
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
                padding: "36px 20px",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "13.5px", color: "rgba(255, 255, 255, 0.7)" }}>
                No pre-built products currently listed under &ldquo;{activeFilterLabel}&rdquo;.{" "}
              </span>
              <span
                onClick={() => setActiveFilter("Websites")}
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

          {/* AIGLEON LIBRARY STYLE CTA BUTTON (Edged Transparent, Reduced Glow) */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              href="/prebuilt-assets"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                borderRadius: "14px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                backdropFilter: "blur(8px)",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "13.5px",
                letterSpacing: "0.02em",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              className="group hover:bg-white/[0.08] hover:border-white/30"
            >
              <span>Check out our prebuilt assets</span>
              <ArrowUpRight style={{ width: "15px", height: "15px" }} className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>

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

      {/* Growth Tier Modal */}
      {showGrowthTierModal && (
        <div
          onClick={() => setShowGrowthTierModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "rgba(2, 3, 3, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "620px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#07090c",
              border: "1px solid rgba(54, 184, 255, 0.35)",
              borderRadius: "20px",
              padding: "32px 28px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(54, 184, 255, 0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowGrowthTierModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <X style={{ width: "16px", height: "16px" }} />
            </button>

            {/* Header Tag */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  backgroundColor: "rgba(54, 184, 255, 0.12)",
                  border: "1px solid rgba(54, 184, 255, 0.35)",
                  color: "#36b8ff",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                <Sparkles style={{ width: "12px", height: "12px" }} />
                <span>Everything Included in Product Tier +</span>
              </div>

              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", margin: 0, lineHeight: "1.25" }}>
                Growth Tier &amp; Custom AI Solutions
              </h3>
              <p style={{ fontSize: "13.5px", color: "rgba(255, 255, 255, 0.72)", marginTop: "8px", marginBottom: 0, lineHeight: "1.5" }}>
                Bespoke enterprise AI agent architectures tailored specifically to your business workflows, custom CRM connectors, and deep preference-mining engines.
              </p>
            </div>

            {/* Bespoke Features List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", backgroundColor: "rgba(255, 255, 255, 0.02)", padding: "18px", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", display: "block" }}>
                Bespoke Growth Features &amp; Capabilities:
              </span>

              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 style={{ width: "16px", height: "16px", color: "#36b8ff", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    Custom RAG &amp; Deep Preference Mining
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.65)", margin: "2px 0 0 0", lineHeight: "1.4" }}>
                    Advanced preference-mining models trained on your proprietary product catalogs, user behavior history, and dynamic personalized offer logic.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 style={{ width: "16px", height: "16px", color: "#36b8ff", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    Custom CRM, ERP &amp; Database Connectors
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.65)", margin: "2px 0 0 0", lineHeight: "1.4" }}>
                    Bi-directional integrations extending beyond standard Shopify/WooCommerce webhooks into custom CRMs, ERPs, inventory databases, and custom APIs.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 style={{ width: "16px", height: "16px", color: "#36b8ff", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    Multi-Template Feedback &amp; Referral Engines
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.65)", margin: "2px 0 0 0", lineHeight: "1.4" }}>
                    Custom multi-step post-purchase review sequences, automated referral distribution, and dynamic testimonial capture flows.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 style={{ width: "16px", height: "16px", color: "#36b8ff", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    Tailored AI Guardrails &amp; Dynamic Offer Logic
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.65)", margin: "2px 0 0 0", lineHeight: "1.4" }}>
                    Custom prompt engineering, brand tone calibration, multi-lingual capabilities, and custom human-in-the-loop escalation rules.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 style={{ width: "16px", height: "16px", color: "#36b8ff", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    Dedicated 1-on-1 Strategy &amp; Priority Support
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.65)", margin: "2px 0 0 0", lineHeight: "1.4" }}>
                    Architecture strategy calls, custom agent tuning, dedicated account manager, and direct Slack/WhatsApp priority channels.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
              <a
                href="https://wa.me/917396733009?text=Hi,%20I%20want%20to%20discuss%20Growth%20Tier%20custom%20AI%20workflows%20for%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "13px 20px",
                  borderRadius: "12px",
                  backgroundColor: "#36b8ff",
                  color: "#020303",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  textDecoration: "none",
                  boxShadow: "0 0 25px rgba(54, 184, 255, 0.35)",
                }}
              >
                <span>Discuss Growth Tier on WhatsApp</span>
                <ArrowUpRight style={{ width: "16px", height: "16px" }} />
              </a>

              <button
                type="button"
                onClick={() => setShowGrowthTierModal(false)}
                style={{
                  padding: "13px 20px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 99999,
            backgroundColor: "#0b0d0f",
            border: "1px solid rgba(54, 184, 255, 0.5)",
            borderRadius: "10px",
            padding: "10px 18px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
            color: "#ffffff",
            fontSize: "12px",
            fontFamily: "monospace",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#36b8ff" }} />
          <span>{toastMsg}</span>
        </div>
      )}
    </>
  );
}
