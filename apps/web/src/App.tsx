import { Header } from "./components/Header";
import { SignalPanel } from "./components/SignalPanel";
import { StepCard } from "./components/StepCard";
import { useAppStore } from "./store";
import { Landing } from "./flows/Landing";
import { Consent } from "./flows/Consent";
import { EnvironmentCheck } from "./flows/EnvironmentCheck";
import { Calibration } from "./flows/Calibration";
import { CPT } from "./flows/CPT";
import { Break } from "./flows/Break";
import { Office } from "./flows/Office";
import { Cooldown } from "./flows/Cooldown";
import { Results } from "./flows/Results";
import { useDemoSensors } from "./hooks/useDemoSensors";
import { LiveCharts } from "./components/LiveCharts";

const flowMap = {
  landing: Landing,
  consent: Consent,
  environment: EnvironmentCheck,
  calibration: Calibration,
  cpt: CPT,
  break: Break,
  office: Office,
  cooldown: Cooldown,
  results: Results
} as const;

export const App = () => {
  const step = useAppStore((state) => state.step);
  const demoMode = useAppStore((state) => state.demoMode);
  const StepComponent = flowMap[step];

  useDemoSensors(demoMode);

  return (
    <div className="min-h-screen gradient-shell">
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <StepComponent />
            <SignalPanel />
          </div>
          <div className="space-y-6">
            <StepCard />
            <LiveCharts />
            <div className="card p-6 space-y-3">
              <h3 className="text-lg font-semibold">Session Controls</h3>
              <button className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
                Emergency Stop
              </button>
              <button className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
                Reduce Distractors
              </button>
              <button className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
                Export Interim Logs
              </button>
              <p className="text-xs text-white/50">
                Timing guardrails and session validity scoring are continuously updated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
