"use client";

import { useEffect } from "react";

export default function ServerWarmup() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const hasWarmedUp = sessionStorage.getItem("server_warmup_done");
      if (hasWarmedUp) return;

      sessionStorage.setItem("server_warmup_done", "true");

      // Silently wake up backend server without interrupting UX
      fetch("/api/health", { method: "GET", cache: "no-store" }).catch(() => {
        // Ignore any errors silently
      });
    } catch {
      // Ignore sessionStorage/fetch errors silently
    }
  }, []);

  return null;
}
