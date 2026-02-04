import { useEffect } from "react";
import { useAppStore } from "../store";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const useDemoSensors = (enabled: boolean) => {
  const updateSignals = useAppStore((state) => state.updateSignals);
  const updateValidity = useAppStore((state) => state.updateValidity);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      const drift = Math.sin(frame / 8) * 0.02;
      const facePresence = clamp(0.95 + drift, 0.86, 0.99);
      const gazeStability = clamp(0.8 + Math.cos(frame / 12) * 0.05, 0.68, 0.9);
      const rppgSqi = clamp(0.72 + Math.sin(frame / 10) * 0.08, 0.55, 0.85);
      const ambientDb = clamp(32 + Math.sin(frame / 6) * 6, 24, 48);
      const frameDrops = clamp(0.012 + Math.cos(frame / 5) * 0.004, 0.002, 0.03);
      updateSignals({ facePresence, gazeStability, rppgSqi, ambientDb, frameDrops });

      const validityScore = Math.round(
        100 *
          (0.35 * facePresence +
            0.25 * gazeStability +
            0.2 * rppgSqi +
            0.1 * (1 - frameDrops) +
            0.1 * (ambientDb < 40 ? 1 : 0.7))
      );
      updateValidity(validityScore);
    }, 1200);

    return () => window.clearInterval(interval);
  }, [enabled, updateSignals, updateValidity]);
};
