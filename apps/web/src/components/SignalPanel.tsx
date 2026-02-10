import { useAppStore } from "../store";

export const SignalPanel = () => {
  const signalQuality = useAppStore((state) => state.signalQuality);

  const metrics = [
    {
      label: "Face Presence",
      value: `${Math.round(signalQuality.facePresence * 100)}%`,
      status: signalQuality.facePresence > 0.9 ? "good" : "warn"
    },
    {
      label: "Gaze Stability",
      value: signalQuality.gazeStability.toFixed(2),
      status: signalQuality.gazeStability > 0.75 ? "good" : "warn"
    },
    {
      label: "rPPG SQI",
      value: signalQuality.rppgSqi.toFixed(2),
      status: signalQuality.rppgSqi > 0.7 ? "good" : "warn"
    },
    {
      label: "Ambient dB",
      value: `${signalQuality.ambientDb.toFixed(0)} dB`,
      status: signalQuality.ambientDb < 45 ? "good" : "warn"
    },
    {
      label: "Frame Drops",
      value: `${(signalQuality.frameDrops * 100).toFixed(1)}%`,
      status: signalQuality.frameDrops < 0.02 ? "good" : "warn"
    }
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-white/60">Live Signal Dashboard</p>
          <h2 className="text-xl font-semibold">Quality & Validity Snapshot</h2>
        </div>
        <button className="text-xs uppercase tracking-[0.3em] text-white/60">
          View Details
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-xs text-white/60">{metric.label}</p>
              <p className="text-lg font-semibold">{metric.value}</p>
            </div>
            <span
              className={`h-2 w-2 rounded-full ${
                metric.status === "good" ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/50">
        Metrics update every 2s. If quality drops below thresholds, adaptive guardrails will reduce distractors.
      </p>
    </div>
  );
};
