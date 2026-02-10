import { useAppStore } from "../store";

export const Header = () => {
  const demoMode = useAppStore((state) => state.demoMode);
  const toggleDemo = useAppStore((state) => state.toggleDemo);

  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">Dikkat</p>
        <h1 className="text-3xl font-semibold">Multimodal Attention Assessment</h1>
        <p className="text-white/70 text-sm">Decision-support screening — non-diagnostic performance assessment.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-white/60">Demo Mode</p>
          <p className="text-sm">{demoMode ? "Enabled" : "Disabled"}</p>
        </div>
        <button
          onClick={toggleDemo}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Toggle
        </button>
      </div>
    </header>
  );
};
