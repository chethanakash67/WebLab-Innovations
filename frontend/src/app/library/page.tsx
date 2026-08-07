"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Search,
  ArrowUpRight,
  FileText,
  X,
  Loader2,
  LibraryBig,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBadge from "@/components/ui/SectionBadge";
import SmoothScroll from "@/components/providers/SmoothScroll";
import {
  CATALOG_FILTERS,
  CATALOG_TYPE_LABELS,
  type CatalogFilter,
  type LibraryCatalogItem,
} from "@/lib/library";

const MouseFollowLight = dynamic(
  () => import("@/components/ui/MouseFollowLight"),
  { ssr: false },
);

const BG = "#030405";
const BLUE = "#36b8ff";

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CatalogFilter>("all");
  const [items, setItems] = useState<LibraryCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile || !moreOpen) return;
    const onClick = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isMobile, moreOpen]);

  const runSearch = useCallback(async (search: string, type: CatalogFilter) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);

    try {
      const url = new URL("/api/library", window.location.origin);
      url.searchParams.set("type", type);
      url.searchParams.set("q", search);

      const response = await fetch(url.toString(), {
        signal: controller.signal,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Could not load the library.");
      }

      const data = await response.json();
      setItems(Array.isArray(data.items) ? data.items : []);
      setError(null);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError((err as Error).message || "Something went wrong.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      runSearch(query.trim(), filter);
    }, 250);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, filter, runSearch]);

  return (
    <SmoothScroll>
      <MouseFollowLight />
      <Navbar />
      <main
        style={{
          paddingTop: "140px",
          minHeight: "80vh",
          position: "relative",
          zIndex: 10,
          background: BG,
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "-10%",
            width: "480px",
            height: "480px",
            backgroundColor: "rgba(54, 184, 255, 0.07)",
            borderRadius: "9999px",
            filter: "blur(140px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            left: "-10%",
            width: "420px",
            height: "420px",
            backgroundColor: "rgba(54, 184, 255, 0.05)",
            borderRadius: "9999px",
            filter: "blur(140px)",
            pointerEvents: "none",
          }}
        />

        <section
          style={{
            position: "relative",
            maxWidth: "1500px",
            margin: "0 auto",
            paddingLeft: "clamp(20px, 5vw, 64px)",
            paddingRight: "clamp(20px, 5vw, 64px)",
            paddingBottom: "96px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          {/* Header */}
          <header
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "32px",
              marginBottom: "48px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: "720px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: BLUE,
                    fontFamily: "monospace",
                  }}
                >
                  [ Knowledge Base ]
                </span>
                <SectionBadge label="Aigleon Library" number="03" />
              </div>
              <h1
                style={{
                  fontSize: "clamp(42px, 6vw, 84px)",
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.95,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Aigleon <span style={{ color: BLUE }}>Library.</span>
              </h1>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "rgba(255, 255, 255, 0.55)",
                  maxWidth: "560px",
                }}
              >
                You&apos;ll get to see all our <b>researches</b>, <b>case studies</b>, <b>audits</b>, and lot more done on <b>current market and real brands</b>.
                We keep acquiring real insights from the market, businesses very deeply, by which our work will <b>not be outdated</b>.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 18px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.02)",
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.5)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <LibraryBig style={{ width: 16, height: 16, color: BLUE }} />
              <span>
                {loading ? "Indexing…" : `${items.length} document${items.length === 1 ? "" : "s"}`}
              </span>
            </div>
          </header>

          {/* Search bar */}
          <div
            style={{
              position: "relative",
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "20px",
            }}
          >
            <Search
              style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 18,
                height: 18,
                color: "rgba(255, 255, 255, 0.35)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for guides, reports, and more..."
              aria-label="Search the Aigleon Library"
              style={{
                width: "100%",
                height: "54px",
                padding: "0 52px 0 48px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "14px",
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "13px",
                letterSpacing: "0.02em",
                outline: "none",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor = "#36b8ff";
                event.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(54, 184, 255, 0.18), 0 0 20px rgba(54, 184, 255, 0.3)";
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                event.currentTarget.style.boxShadow = "none";
              }}
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "grid",
                  width: "28px",
                  height: "28px",
                  placeItems: "center",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  borderRadius: "8px",
                  color: "rgba(255, 255, 255, 0.55)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            ) : (
              <span
                style={{
                  position: "absolute",
                  right: "18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "10px",
                  color: "rgba(255, 255, 255, 0.25)",
                  fontFamily: "monospace",
                  letterSpacing: "0.08em",
                }}
              >
                SEARCH
              </span>
            )}
          </div>

          {/* Filters */}
          {isMobile ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "48px",
              }}
            >
              <button
                type="button"
                onClick={() => setFilter("all")}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border:
                    filter === "all"
                      ? "1px solid #36b8ff"
                      : "1px solid rgba(255, 255, 255, 0.16)",
                  background:
                    filter === "all" ? "#36b8ff" : "rgba(255, 255, 255, 0.03)",
                  color:
                    filter === "all" ? "#000000" : "rgba(255, 255, 255, 0.65)",
                  fontWeight: filter === "all" ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                All
              </button>

              <div style={{ position: "relative" }} ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen((open) => !open)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 18px",
                    borderRadius: "999px",
                    fontFamily: "monospace",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border:
                      filter !== "all" || moreOpen
                        ? "1px solid #36b8ff"
                        : "1px solid rgba(255, 255, 255, 0.16)",
                    background:
                      filter !== "all"
                        ? "#36b8ff"
                        : moreOpen
                          ? "rgba(54, 184, 255, 0.12)"
                          : "rgba(255, 255, 255, 0.03)",
                    color:
                      filter !== "all"
                        ? "#000000"
                        : moreOpen
                          ? "#36b8ff"
                          : "rgba(255, 255, 255, 0.65)",
                    fontWeight: filter !== "all" ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  {filter !== "all"
                    ? CATALOG_FILTERS.find((option) => option.value === filter)
                        ?.label
                    : "More"}
                  <ChevronDown
                    style={{
                      width: 13,
                      height: 13,
                      transform: moreOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>

                {moreOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      zIndex: 30,
                      minWidth: "230px",
                      padding: "6px",
                      borderRadius: "14px",
                      border: "1px solid rgba(54, 184, 255, 0.3)",
                      background: "rgba(8, 12, 16, 0.97)",
                      backdropFilter: "blur(16px)",
                      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {CATALOG_FILTERS.filter(
                      (option) => option.value !== "all",
                    ).map((option) => {
                      const isActive = filter === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setFilter(option.value);
                            setMoreOpen(false);
                          }}
                          style={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            padding: "11px 14px",
                            borderRadius: "10px",
                            textAlign: "left",
                            fontFamily: "monospace",
                            fontSize: "11px",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            border: "1px solid transparent",
                            background: isActive
                              ? "rgba(54, 184, 255, 0.14)"
                              : "transparent",
                            color: isActive
                              ? "#36b8ff"
                              : "rgba(255, 255, 255, 0.7)",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(event) => {
                            if (!isActive) {
                              event.currentTarget.style.background =
                                "rgba(255, 255, 255, 0.05)";
                              event.currentTarget.style.color = "#ffffff";
                            }
                          }}
                          onMouseLeave={(event) => {
                            if (!isActive) {
                              event.currentTarget.style.background = "transparent";
                              event.currentTarget.style.color =
                                "rgba(255, 255, 255, 0.7)";
                            }
                          }}
                        >
                          <span>{option.label}</span>
                          {isActive && (
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "999px",
                                background: "#36b8ff",
                                boxShadow: "0 0 8px #36b8ff",
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "48px",
              }}
            >
              {CATALOG_FILTERS.map((option) => {
                const isActive = filter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilter(option.value)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: isActive
                        ? "1px solid #36b8ff"
                        : "1px solid rgba(255, 255, 255, 0.16)",
                      background: isActive
                        ? "#36b8ff"
                        : "rgba(255, 255, 255, 0.03)",
                      color: isActive ? "#000000" : "rgba(255, 255, 255, 0.65)",
                      fontWeight: isActive ? 700 : 500,
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Results */}
          {error ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                minHeight: "220px",
                border: "1px dashed rgba(255, 255, 255, 0.14)",
                borderRadius: "18px",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "13px",
              }}
            >
              <span>{error}</span>
            </div>
          ) : loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                minHeight: "220px",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" />
              Searching the archive…
            </div>
          ) : items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                minHeight: "220px",
                border: "1px dashed rgba(255, 255, 255, 0.14)",
                borderRadius: "18px",
              }}
            >
              <FileText style={{ width: 28, height: 28, color: "rgba(255, 255, 255, 0.3)" }} />
              <p
                style={{
                  margin: 0,
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "13px",
                }}
              >
                No documents match this search.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: isMobile ? "14px" : "20px",
              }}
            >
              {items.map((item, index) => (
                <LibraryCard
                  key={item.id}
                  item={item}
                  index={index}
                  isMobile={isMobile}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}

function LibraryCard({
  item,
  index,
  isMobile,
}: {
  item: LibraryCatalogItem;
  index: number;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    padding: isMobile ? "18px 16px" : "26px",
    minHeight: isMobile ? undefined : "280px",
    border: hovered
      ? "1px solid rgba(54, 184, 255, 0.5)"
      : "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    background: hovered
      ? "rgba(54, 184, 255, 0.05)"
      : "rgba(255, 255, 255, 0.015)",
    backdropFilter: "blur(12px)",
    textDecoration: "none",
    transition: "all 0.3s ease",
    transform: hovered ? "translateY(-4px)" : "none",
    boxShadow: hovered ? "0 18px 40px rgba(0, 0, 0, 0.35)" : "none",
    cursor: isMobile ? "pointer" : undefined,
    WebkitTapHighlightColor: "transparent",
  };

  const content = (
    <>
      <div
        style={{
          position: "absolute",
          top: isMobile ? "12px" : "16px",
          right: "16px",
          fontSize: "10px",
          fontFamily: "monospace",
          color: "rgba(255, 255, 255, 0.22)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          alignItems: "center",
          gap: "7px",
          padding: "5px 12px",
          borderRadius: "999px",
          border: "1px solid rgba(54, 184, 255, 0.35)",
          background: "rgba(54, 184, 255, 0.08)",
          color: BLUE,
          fontFamily: "monospace",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: isMobile ? "14px" : "18px",
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "999px",
            background: BLUE,
            boxShadow: `0 0 8px ${BLUE}`,
          }}
        />
        {CATALOG_TYPE_LABELS[item.type]}
      </div>

      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-display), sans-serif",
          fontSize: isMobile ? "18px" : "20px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          color: hovered ? "#ffffff" : "rgba(255, 255, 255, 0.92)",
          transition: "color 0.3s ease",
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          margin: isMobile ? "10px 0 0" : "12px 0 0",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "rgba(255, 255, 255, 0.55)",
          fontWeight: 300,
          flex: 1,
          ...(isMobile && !expanded
            ? {
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : {}),
        }}
      >
        {item.summary}
      </p>

      {item.tags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginTop: isMobile ? "12px" : "16px",
          }}
        >
          {item.tags.slice(0, isMobile ? 3 : 4).map((tag) => (
            <span
              key={tag}
              style={{
                padding: "3px 10px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "rgba(255, 255, 255, 0.45)",
                fontFamily: "monospace",
                fontSize: "9px",
                letterSpacing: "0.05em",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {isMobile ? (
        <a
          href={item.filePath}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
            padding: "8px 16px",
            border: "1px solid rgba(54, 184, 255, 0.5)",
            background: "rgba(54, 184, 255, 0.1)",
            color: "#ffffff",
            fontFamily: "monospace",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: "0px",
            fontWeight: 500,
            textDecoration: "none",
            alignSelf: "flex-start",
            cursor: "pointer",
          }}
        >
          <span>Open document</span>
          <ArrowUpRight style={{ width: 13, height: 13 }} />
        </a>
      ) : (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "18px",
            padding: "8px 16px",
            border: hovered
              ? "1px solid #36b8ff"
              : "1px solid rgba(255, 255, 255, 0.2)",
            background: hovered ? "#36b8ff" : "transparent",
            color: hovered ? "#000000" : "#ffffff",
            fontFamily: "monospace",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: "0px",
            fontWeight: hovered ? 700 : 500,
            transition: "all 0.3s ease",
            alignSelf: "flex-start",
          }}
        >
          <span>Open document</span>
          <ArrowUpRight
            style={{
              width: 13,
              height: 13,
              transform: hovered ? "translate(2px, -2px)" : "none",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <div
        style={containerStyle}
        onClick={() => setExpanded((value) => !value)}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={item.filePath}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={containerStyle}
    >
      {content}
    </a>
  );
}
