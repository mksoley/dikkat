import { useAppStore } from "../store";

export const Break = () => {
  const advance = useAppStore((state) => state.advance);

  return (
    <section className="card p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Micro Break</h2>
      <p className="text-white/70">
        Maintain a neutral fixation. A gentle breathing pace is shown to reduce fatigue confounds while
        keeping physiological tracking stable.
      </p>
      <div className="h-32 rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center">
        <span className="text-sm text-white/80">Breathing Guide · 4-4-4 (non-therapeutic)</span>
      </div>
      <button
        onClick={() => advance("office")}
        className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-500 transition"
      >
        Begin Virtual Office
      </button>
    </section>
  );
};
