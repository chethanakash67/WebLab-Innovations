"use client";

import { useEffect, useState } from "react";
import { Smartphone, Laptop } from "lucide-react";

export default function DeviceNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isDismissed = sessionStorage.getItem("mobile_notice_dismissed");
      const isDesktopOrTablet = window.innerWidth >= 768;

      if (isDesktopOrTablet && !isDismissed) {
        setShowNotice(true);
      } else {
        setShowNotice(false);
      }
    };

    checkDevice();

    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("mobile_notice_dismissed", "true");
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(2, 3, 3, 0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          overflow: "hidden",
          borderRadius: "6px",
          border: "1px solid rgba(54, 184, 255, 0.25)",
          backgroundColor: "rgba(11, 13, 15, 0.96)",
          padding: "32px 28px",
          color: "#ffffff",
          boxShadow:
            "0 15px 35px rgba(0, 0, 0, 0.9), 0 0 15px rgba(54, 184, 255, 0.12)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          fontFamily:
            "var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Minimal theme blue ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: "rgba(54, 184, 255, 0.12)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        {/* Device Graphic */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            marginBottom: "24px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              height: "52px",
              width: "52px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid #20252b",
              color: "#9ca3aa",
            }}
          >
            <Laptop size={24} />
          </div>

          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#36b8ff",
              letterSpacing: "2px",
            }}
          >
            →
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              height: "56px",
              width: "56px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              background: "linear-gradient(135deg, #087ad8 0%, #36b8ff 100%)",
              color: "#ffffff",
              border: "1px solid rgba(54, 184, 255, 0.4)",
              boxShadow: "0 4px 14px rgba(8, 122, 216, 0.3)",
            }}
          >
            <Smartphone size={28} />
          </div>
        </div>

        {/* Text Content */}
        <div
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "3px",
              border: "1px solid rgba(54, 184, 255, 0.35)",
              backgroundColor: "rgba(54, 184, 255, 0.1)",
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: 600,
              color: "#36b8ff",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            <Smartphone size={13} />
            <span>Mobile-First Experience</span>
          </div>

          <h3
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#ffffff",
              marginBottom: "12px",
              lineHeight: "1.3",
            }}
          >
            Best Viewed on Mobile
          </h3>

          <p
            style={{
              fontSize: "13.5px",
              lineHeight: "1.6",
              color: "#9ca3aa",
              marginBottom: "24px",
            }}
          >
            We noticed you are visiting on a laptop or tablet. For the most immersive visual experience and optimized layout, please open this link on your smartphone.
          </p>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleDismiss}
            style={{
              width: "100%",
              borderRadius: "4px",
              background: "linear-gradient(135deg, #087ad8 0%, #36b8ff 100%)",
              padding: "13px 20px",
              fontSize: "13.5px",
              fontWeight: 600,
              color: "#ffffff",
              border: "1px solid rgba(54, 184, 255, 0.3)",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(8, 122, 216, 0.3)",
              transition: "all 0.15s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #0561ae 0%, #087ad8 100%)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(8, 122, 216, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #087ad8 0%, #36b8ff 100%)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(8, 122, 216, 0.3)";
            }}
          >
            Continue on Desktop
          </button>
        </div>
      </div>
    </div>
  );
}
