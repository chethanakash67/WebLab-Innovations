"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Region = "IN" | "OTHERS";

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextType>({
  region: "IN",
  setRegion: () => {},
});

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>("IN");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aigleon_region") as Region;
      if (saved === "IN" || saved === "OTHERS") {
        setRegionState(saved);
      }
    } catch (_e) {
      // Ignore localStorage errors
    }
  }, []);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    try {
      localStorage.setItem("aigleon_region", newRegion);
    } catch (_e) {
      // Ignore localStorage errors
    }
  };

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}
