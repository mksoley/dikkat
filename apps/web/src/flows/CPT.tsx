import { useAppStore } from "../store";

export const CPT = () => {
  const advance = useAppStore((state) => state.advance);

  return (
    <section className="card p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Block A — Next-Gen Multimodal CPT</h2>
        <p className="text-white/70">
          Stimuli are presented with adaptive timing. Use the <strong>Space</strong> key for targets, withhold
          for non-targets. Audio and visual distractors will adjust in real time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm font-semibold">Targets</p>
          <p className="text-xs text-white/60">10–20% probability with jittered ISI.</p>
        </div>
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm font-semibold">Distractors</p>
          <p className="text-xs text-white/60">Audio + peripheral visual events.</p>
        </div>
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm font-semibold">Quality Guardrails</p>
          <p className="text-xs text-white/60">Frame drops and face loss reduce difficulty.</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => advance("break")}
          className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-500 transition"
        >
          Complete Block A
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition">
          Pause & Emergency Stop
        </button>
      </div>
    </section>
  );
};
