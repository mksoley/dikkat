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
  sessionValidity: number;
  signalQuality: {
    facePresence: number;
    gazeStability: number;
    rppgSqi: number;
    ambientDb: number;
    frameDrops: number;
  };
  advance: (next: FlowStep) => void;
  toggleDemo: () => void;
  updateSignals: (partial: Partial<AppState["signalQuality"]>) => void;
  updateValidity: (score: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  step: "landing",
  demoMode: false,
  sessionValidity: 86,
  signalQuality: {
    facePresence: 0.98,
    gazeStability: 0.82,
    rppgSqi: 0.76,
    ambientDb: 34,
    frameDrops: 0.012
  },
  advance: (next) => set({ step: next }),
  toggleDemo: () => set((state) => ({ demoMode: !state.demoMode })),
  updateSignals: (partial) =>
    set((state) => ({ signalQuality: { ...state.signalQuality, ...partial } })),
  updateValidity: (score) => set({ sessionValidity: score })
}));
