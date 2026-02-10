import { useAppStore } from "../store";

export const Consent = () => {
  const advance = useAppStore((state) => state.advance);

  return (
    <section className="card p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Consent & Data Controls</h2>
      <ul className="list-disc list-inside space-y-2 text-white/70">
        <li>No raw video/audio is stored by default; only derived features and anonymized event logs.</li>
        <li>You may export CSV/JSON data and a PDF report after completion.</li>
        <li>Session validity will be computed from face presence, gaze confidence, SQI, and timing quality.</li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
          <input type="checkbox" className="mt-1" defaultChecked />
          <span className="text-sm text-white/70">Allow derived sensor feature storage (default recommended).</span>
        </label>
        <label className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm text-white/70">Enable optional voice onset micro-task ("da").</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => advance("environment")}
          className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-500 transition"
        >
          I Consent, Continue
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition">
          Review Privacy Policy
        </button>
      </div>
    </section>
  );
};
