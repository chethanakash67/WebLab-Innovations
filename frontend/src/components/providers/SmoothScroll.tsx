"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Force start at the very top on fresh mount
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor link clicks for smooth scrolling on the same page
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const anchor = target.closest("a");
      if (anchor?.hash) {
        const currentPath = window.location.pathname;
        const targetPath = anchor.pathname;
        
        // If target path is same as current path, handle smooth scrolling
        if (targetPath === currentPath || targetPath === "" || (targetPath === "/" && currentPath === "/")) {
          e.preventDefault();
          const el = document.querySelector(anchor.hash);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -80 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Scroll back down to where the user left off
    const savedScroll = sessionStorage.getItem("scrollPosition");
    const savedHash = sessionStorage.getItem("scrollHash") || window.location.hash;

    // Clear saved values so they don't persist on subsequent fresh reloads
    sessionStorage.removeItem("scrollPosition");
    sessionStorage.removeItem("scrollHash");

    if (savedScroll || savedHash) {
      setTimeout(() => {
        if (savedHash) {
          const el = document.querySelector(savedHash);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { 
              duration: 3.5,
              offset: -80,
              onComplete: () => {
                // Restore the hash in URL once scrolling is complete
                history.replaceState(null, "", window.location.pathname + window.location.search + savedHash);
              }
            });
            return;
          }
        }
        if (savedScroll) {
          const y = parseInt(savedScroll, 10);
          if (y > 50) {
            lenis.scrollTo(y, { duration: 3.5 });
          }
        }
      }, 150); // Small buffer to ensure mounting, then scroll immediately
    }

    // Save scroll position and hash before reload/unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
      if (window.location.hash) {
        sessionStorage.setItem("scrollHash", window.location.hash);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      lenis.destroy();
    };
  }, []);

  // Reset scroll to top on route change and handle hash client-side navigations
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);

    // If a hash is present on route change (client-side transition)
    if (window.location.hash) {
      const hash = window.location.hash;
      // Temporarily strip the hash so the browser doesn't try to jump
      history.replaceState(null, "", window.location.pathname + window.location.search);
      
      setTimeout(() => {
        if (lenisRef.current) {
          const el = document.querySelector(hash);
          if (el) {
            lenisRef.current.scrollTo(el as HTMLElement, { 
              duration: 3.5,
              offset: -80,
              onComplete: () => {
                history.replaceState(null, "", window.location.pathname + window.location.search + hash);
              }
            });
          }
        }
      }, 150);
    }
  }, [pathname]);

  return <>{children}</>;
}
