import { FlowStep, useAppStore } from "../store";

const steps: { id: FlowStep; title: string; detail: string }[] = [
  { id: "landing", title: "Landing", detail: "Overview + protocol selection" },
  { id: "consent", title: "Consent", detail: "Privacy + data retention" },
  { id: "environment", title: "Environment Check", detail: "Camera, mic, latency, lighting" },
  { id: "calibration", title: "Calibration", detail: "Gaze, blink, rPPG baselines" },
  { id: "cpt", title: "Multi-modal CPT", detail: "Sustained attention + inhibition" },
  { id: "break", title: "Micro Break", detail: "Neutral reset + baseline" },
  { id: "office", title: "Virtual Office", detail: "Ecological multitasking" },
  { id: "cooldown", title: "Cooldown", detail: "Stabilize + summary" },
  { id: "results", title: "Results", detail: "Report + exports" }
];

export const StepCard = () => {
  const current = useAppStore((state) => state.step);
  const advance = useAppStore((state) => state.advance);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Protocol Timeline</h3>
      <div className="space-y-3">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => advance(step.id)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition ${
              current === step.id
                ? "bg-white/15 border-white/30"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="text-xs text-white/60">{step.detail}</p>
              </div>
              <span className="text-xs text-white/50">{current === step.id ? "Active" : ""}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
