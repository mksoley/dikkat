import { z } from "zod";

export const AdaptiveConfigSchema = z.object({
  isiMs: z.tuple([z.number().min(700).max(1600), z.number().min(700).max(1600)]),
  stimDurationMs: z.number().min(120).max(250),
  targetProbability: z.number().min(0.08).max(0.25),
  audioDistractorLevel: z.enum(["low", "mod", "high"]),
  visualDistractorLevel: z.enum(["low", "mod", "high"]),
  notesForLog: z.string()
});

export type AdaptiveConfig = z.infer<typeof AdaptiveConfigSchema>;

export const AdaptiveInputSchema = z.object({
  accuracy: z.number(),
  meanRt: z.number(),
  rtv: z.number(),
  gazeOffscreenRate: z.number(),
  sqi: z.number(),
  frameDrops: z.number()
});

export type AdaptiveInput = z.infer<typeof AdaptiveInputSchema>;
