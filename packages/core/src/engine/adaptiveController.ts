import type { AdaptiveConfig, AdaptiveInput } from "../schemas/adaptive";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const createAdaptiveConfig = (input: AdaptiveInput): AdaptiveConfig => {
  const accuracyBand = clamp(input.accuracy, 0.4, 0.98);
  const rtvBand = clamp(input.rtv, 0.08, 0.35);
  const gazePenalty = input.gazeOffscreenRate > 0.18 ? 0.08 : 0;
  const qualityPenalty = input.sqi < 0.65 || input.frameDrops > 0.03 ? 0.1 : 0;

  const baseIsiMin = 900 + (1 - accuracyBand) * 180;
  const baseIsiMax = 1400 + (1 - accuracyBand) * 220;
  const isiMin = clamp(baseIsiMin + gazePenalty * 200 + qualityPenalty * 250, 800, 1500);
  const isiMax = clamp(baseIsiMax + gazePenalty * 240 + qualityPenalty * 280, 1000, 1600);

  const stimDurationMs = clamp(150 + (1 - accuracyBand) * 40, 140, 220);

  const targetProbability = clamp(0.12 + rtvBand * 0.08, 0.1, 0.22);

  const distractorLevel =
    accuracyBand > 0.9 && rtvBand < 0.18 && input.gazeOffscreenRate < 0.1 ? "high" : "mod";

  const downgrade = input.sqi < 0.6 || input.frameDrops > 0.05;

  return {
    isiMs: [Math.round(isiMin), Math.round(isiMax)],
    stimDurationMs: Math.round(stimDurationMs),
    targetProbability,
    audioDistractorLevel: downgrade ? "low" : distractorLevel,
    visualDistractorLevel: downgrade ? "low" : distractorLevel,
    notesForLog: downgrade
      ? "Reduced distractors due to quality guardrail trigger."
      : "Adaptive configuration within optimal performance band."
  };
};
