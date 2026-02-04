import { useAppStore } from "../store";

export const Cooldown = () => {
  const advance = useAppStore((state) => state.advance);

  return (
    <section className="card p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Cooldown & Data Integrity</h2>
      <p className="text-white/70">
        We finalize metrics, compute validity scores, and generate the scientific report. Please remain still
        for a moment to complete signal processing.
      </p>
      <div className="h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <span className="text-xs text-white/60">Processing rPPG and gaze stability…</span>
      </div>
      <button
        onClick={() => advance("results")}
        className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-500 transition"
      >
        View Results
      </button>
    </section>
  );
};
