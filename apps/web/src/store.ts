import { create } from "zustand";

export type FlowStep =
  | "landing"
  | "consent"
  | "environment"
  | "calibration"
  | "cpt"
  | "break"
  | "office"
  | "cooldown"
  | "results";

interface AppState {
  step: FlowStep;
  demoMode: boolean;
  advance: (next: FlowStep) => void;
  toggleDemo: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  step: "landing",
  demoMode: false,
  advance: (next) => set({ step: next }),
  toggleDemo: () => set((state) => ({ demoMode: !state.demoMode }))
}));
