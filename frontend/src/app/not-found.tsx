import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./globals.css";
import "./bento.css";

export default function NotFound() {
  const themeTitleFont = "var(--font-syne), var(--font-display), sans-serif";

  return (
    <main
      style={{
        minHeight: "100dvh",
        backgroundColor: "#020303",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center"
      }}
    >
      {/* Subtle background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "300px",
          backgroundColor: "rgba(0, 136, 255, 0.07)",
          filter: "blur(140px)",
          borderRadius: "9999px",
          pointerEvents: "none"
        }}
      />

      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* Large Minimal Slim 404 Display */}
        <h1
          style={{
            fontFamily: themeTitleFont,
            fontSize: "clamp(5.5rem, 18vw, 11rem)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#ffffff",
            marginBottom: "12px",
            opacity: 0.95
          }}
        >
          404
        </h1>

        {/* Minimal Subtitle Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#36b8ff",
            backgroundColor: "rgba(54, 184, 255, 0.08)",
            border: "1px solid rgba(54, 184, 255, 0.25)",
            borderRadius: "9999px",
            padding: "6px 16px",
            marginBottom: "24px"
          }}
        >
          <span>Error 404</span>
        </div>

        {/* Quote Statement */}
        <p
          style={{
            fontFamily: themeTitleFont,
            fontSize: "clamp(1.15rem, 3.5vw, 1.5rem)",
            fontWeight: 400,
            color: "#cbd5e1",
            lineHeight: 1.5,
            marginBottom: "36px",
            maxWidth: "460px"
          }}
        >
          "You've lost your way, page doesn't exist."
        </p>

        {/* Get Back to Home Button (Edged 0px border radius, transparent white text -> Blue background + Black text on hover/click, diagonal top-right arrow on right) */}
        <Link
          href="/"
          className="bento-cta-btn"
          style={{
            borderRadius: "0px",
            fontFamily: themeTitleFont
          }}
        >
          <span>Get back to Home</span>
          <ArrowUpRight style={{ width: "16px", height: "16px" }} />
        </Link>
      </div>
    </main>
  );
}
