export interface ValidityInputs {
  facePresence: number;
  gazeConfidence: number;
  rppgSqi: number;
  frameDrops: number;
  ambientNoiseDb: number;
}

export const computeValidityScore = ({
  facePresence,
  gazeConfidence,
  rppgSqi,
  frameDrops,
  ambientNoiseDb
}: ValidityInputs) => {
  const noiseScore = ambientNoiseDb < 40 ? 1 : ambientNoiseDb < 55 ? 0.8 : 0.6;
  const frameScore = frameDrops < 0.02 ? 1 : frameDrops < 0.05 ? 0.75 : 0.5;
  const score =
    0.35 * facePresence +
    0.25 * gazeConfidence +
    0.2 * rppgSqi +
    0.1 * noiseScore +
    0.1 * frameScore;
  return Math.round(score * 100);
};
