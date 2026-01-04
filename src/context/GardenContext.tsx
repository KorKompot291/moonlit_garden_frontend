import React, { createContext, useContext, useEffect, useState } from "react";
import { GardenState } from "../types/garden";
import { getGardenState } from "../api/clients";

type GardenContextValue = {
  garden: GardenState | null;
  loading: boolean;
  refreshGarden: () => Promise<void>;
};

const GardenContext = createContext<GardenContextValue | null>(null);

export function GardenProvider({ children }: { children: React.ReactNode }) {
  const [garden, setGarden] = useState<GardenState | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshGarden = async () => {
    setLoading(true);
    const data = await getGardenState();
    setGarden(data);
    setLoading(false);
  };

  useEffect(() => {
    refreshGarden();
  }, []);

  return (
    <GardenContext.Provider value={{ garden, loading, refreshGarden }}>
      {children}
    </GardenContext.Provider>
  );
}

export function useGarden() {
  const ctx = useContext(GardenContext);
  if (!ctx) {
    throw new Error("useGarden must be used inside GardenProvider");
  }
  return ctx;
}
