"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useRegion, Region } from "@/components/providers/RegionContext";

export default function RegionSelector({ compact = false }: { compact?: boolean }) {
  const { region, setRegion } = useRegion();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { id: Region; label: string; flag: string; symbol: string }[] = [
    { id: "IN", label: "India", flag: "🇮🇳", symbol: "₹ INR" },
    { id: "OTHERS", label: "Others", flag: "🌍", symbol: "$ USD" },
  ];

  const activeOption = options.find((o) => o.id === region) || options[0];

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block", zIndex: 100 }}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        title="Select Region / Currency"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: compact ? "4px 10px" : "6px 14px",
          borderRadius: "20px",
          backgroundColor: open ? "rgba(54, 184, 255, 0.16)" : "rgba(255, 255, 255, 0.05)",
          border: open ? "1px solid #36b8ff" : "1px solid rgba(255, 255, 255, 0.18)",
          color: "#ffffff",
          fontSize: compact ? "11px" : "12px",
          fontFamily: "monospace",
          fontWeight: 600,
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: open ? "0 0 20px rgba(54, 184, 255, 0.25)" : "none",
          transition: "all 0.25s ease",
        }}
      >
        <span style={{ fontSize: compact ? "13px" : "14px" }}>{activeOption.flag}</span>
        <span>{activeOption.label}</span>
        <span style={{ color: "#36b8ff", fontSize: "10.5px" }}>({activeOption.symbol})</span>
        <ChevronDown
          style={{
            width: "12px",
            height: "12px",
            color: "#36b8ff",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: "160px",
            backgroundColor: "#0b0d0f",
            border: "1px solid rgba(54, 184, 255, 0.35)",
            borderRadius: "14px",
            padding: "5px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(54, 184, 255, 0.2)",
            zIndex: 101,
          }}
        >
          {options.map((opt) => {
            const isSelected = region === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setRegion(opt.id);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  backgroundColor: isSelected ? "rgba(54, 184, 255, 0.18)" : "transparent",
                  color: isSelected ? "#36b8ff" : "#d1d5db",
                  fontWeight: isSelected ? 700 : 500,
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{opt.flag}</span>
                  <span>{opt.label}</span>
                </div>
                <span style={{ fontSize: "11px", color: isSelected ? "#ffffff" : "rgba(255,255,255,0.5)" }}>
                  {opt.symbol}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
