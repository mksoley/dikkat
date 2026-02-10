import { z } from "zod";

export const SensorFeatureSchema = z.object({
  timestampMs: z.number(),
  facePresentProb: z.number(),
  headPose: z.object({
    yaw: z.number(),
    pitch: z.number(),
    roll: z.number()
  }),
  gazePoint: z.object({
    x: z.number(),
    y: z.number(),
    confidence: z.number()
  }),
  blinkCount: z.number(),
  blinkDurationMs: z.number(),
  eyeOpenness: z.number(),
  rppg: z.object({
    hrBpm: z.number().nullable(),
    hrvProxy: z.number().nullable(),
    sqi: z.number(),
    motionArtifactIndex: z.number()
  }),
  audio: z.object({
    ambientLevel: z.number(),
    clippingFlag: z.boolean()
  })
});

export type SensorFeature = z.infer<typeof SensorFeatureSchema>;
