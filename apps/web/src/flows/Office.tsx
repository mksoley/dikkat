import { useAppStore } from "../store";

export const Office = () => {
  const advance = useAppStore((state) => state.advance);

  return (
    <section className="card p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Block C — Virtual Office Task</h2>
        <p className="text-white/70">
          Triage inbox items while monitoring intermittent priority tones. Popups and audio distractors will
          simulate real-world office conditions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm font-semibold">Primary Task</p>
          <p className="text-xs text-white/60">Star billing or [ACTION] items. Archive newsletters.</p>
        </div>
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm font-semibold">Secondary Task</p>
          <p className="text-xs text-white/60">Respond within 800ms to high-priority tones.</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => advance("cooldown")}
          className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-500 transition"
        >
          Complete Virtual Office
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition">
          Pause & Emergency Stop
        </button>
      </div>
    </section>
  );
};
