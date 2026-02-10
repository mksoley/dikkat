import { useAppStore } from "../store";

const checklist = [
  "Camera permission and face landmark confidence",
  "Microphone permission + ambient noise check",
  "Audio output test + safe volume calibration",
  "FPS + event loop lag detection",
  "Lighting and backlight detection"
];

export const EnvironmentCheck = () => {
  const advance = useAppStore((state) => state.advance);

  return (
    <section className="card p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Environment Check (2 min)</h2>
        <p className="text-white/70">
          We verify device readiness, lighting, noise, and timing stability. If quality is low, we will
          recommend adjustments or reduce distractor intensity.
        </p>
      </div>
      <div className="space-y-3">
        {checklist.map((item) => (
          <div key={item} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-sm font-semibold">{item}</p>
              <p className="text-xs text-white/60">Pending…</p>
            </div>
            <span className="text-xs text-amber-300">Waiting</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => advance("calibration")}
          className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-500 transition"
        >
          Continue to Calibration
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition">
          Re-run Checks
        </button>
      </div>
    </section>
  );
};
