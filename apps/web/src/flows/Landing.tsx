import { useAppStore } from "../store";

export const Landing = () => {
  const advance = useAppStore((state) => state.advance);

  return (
    <section className="card p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Ultra-Scientific Multimodal Assessment</h2>
        <p className="text-white/70">
          This performance-based assessment combines sustained attention, inhibitory control, and ecological
          multitasking with multimodal sensor-derived metrics. It is <strong>not</strong> a medical diagnosis.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          "18–22 min protocol (full)",
          "8–10 min protocol (short)",
          "Adaptive difficulty + guardrails"
        ].map((item) => (
          <div key={item} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-white/80">{item}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => advance("consent")}
          className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-500 transition"
        >
          Begin Assessment
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition">
          View Protocol PDF
        </button>
      </div>
    </section>
  );
};
