import Plot from "plotly.js-dist-min";
import { useEffect, useRef } from "react";
import { useAppStore } from "../store";

export const LiveCharts = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const signalQuality = useAppStore((state) => state.signalQuality);

  useEffect(() => {
    if (!ref.current) return;
    const data = [
      {
        x: ["Face", "Gaze", "rPPG", "Noise", "Frames"],
        y: [
          signalQuality.facePresence * 100,
          signalQuality.gazeStability * 100,
          signalQuality.rppgSqi * 100,
          100 - signalQuality.ambientDb,
          (1 - signalQuality.frameDrops) * 100
        ],
        type: "bar",
        marker: {
          color: ["#22c55e", "#38bdf8", "#a855f7", "#f97316", "#eab308"]
        }
      }
    ];

    Plot.newPlot(ref.current, data, {
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: "#e2e8f0" },
      margin: { t: 20, r: 10, l: 30, b: 30 },
      yaxis: { range: [0, 100], title: "Quality %" },
      xaxis: { tickfont: { size: 10 } }
    }, { displayModeBar: false, responsive: true });
  }, [signalQuality]);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-3">Quality Signals (Live)</h3>
      <div ref={ref} className="h-56" />
    </div>
  );
};
