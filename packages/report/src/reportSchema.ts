import { z } from "zod";

export const ReportJsonSchema = z.object({
  executiveSummary: z.string(),
  methodology: z.string(),
  results: z.object({
    cpt: z.record(z.string(), z.unknown()),
    virtualOffice: z.record(z.string(), z.unknown()),
    multimodal: z.record(z.string(), z.unknown()),
    validity: z.record(z.string(), z.unknown())
  }),
  interpretation: z.string(),
  limitations: z.string(),
  recommendations: z.string(),
  redFlags: z.array(z.string())
});

export type ReportJson = z.infer<typeof ReportJsonSchema>;
