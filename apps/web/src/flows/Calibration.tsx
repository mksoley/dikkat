import { useAppStore } from "../store";

export const Calibration = () => {
  const advance = useAppStore((state) => state.advance);

  return (
    <section className="card p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Calibration (2 min)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm font-semibold">Gaze Proxy</p>
          <p className="text-xs text-white/60">5 or 9 point calibration target sequence.</p>
        </div>
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm font-semibold">Blink Baseline</p>
          <p className="text-xs text-white/60">30s fixation to model blink burst patterns.</p>
        </div>
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm font-semibold">rPPG Baseline</p>
          <p className="text-xs text-white/60">45–60s face ROI capture and SQI gating.</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => advance("cpt")}
          className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-500 transition"
        >
          Begin CPT Block
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition">
          Restart Calibration
        </button>
      </div>
    </section>
  );
};
