const metrics = [
  { label: "Face Presence", value: "98%", status: "good" },
  { label: "Gaze Stability", value: "0.82", status: "good" },
  { label: "rPPG SQI", value: "0.76", status: "warn" },
  { label: "Ambient dB", value: "34 dB", status: "good" },
  { label: "Frame Drops", value: "1.2%", status: "good" }
];

export const SignalPanel = () => {
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
