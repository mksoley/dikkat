import { useAppStore } from "../store";

export const Results = () => {
  const sessionValidity = useAppStore((state) => state.sessionValidity);

  return (
    <section className="card p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Results & Report</h2>
        <p className="text-white/70">
          Your session validity score, multimodal metrics, and the scientific narrative report are ready. This
          is an assessment only and is not a medical diagnosis.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          `Validity Score: ${sessionValidity}/100`,
          "Attention Stability Index: 0.78",
          "rPPG SQI Coverage: 72%"
        ].map((item) => (
          <div key={item} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-white/80">{item}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        <button className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-500 transition">
          Download Clinician PDF
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition">
          View User Summary
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition">
          Export JSON/CSV
        </button>
      </div>
    </section>
  );
};
