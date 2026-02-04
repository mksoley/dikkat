import { z } from "zod";

export const AgeBracketSchema = z.enum(["17-20", "21-30", "31-40"]);

export const SessionMetadataSchema = z.object({
  sessionId: z.string(),
  protocolVersion: z.string(),
  startedAt: z.string(),
  ageBracket: AgeBracketSchema,
  handedness: z.enum(["left", "right", "ambidextrous"]).optional(),
  device: z.object({
    userAgent: z.string(),
    platform: z.string(),
    fpsEstimate: z.number()
  }),
  consent: z.object({
    allowDerivedStorage: z.boolean(),
    enableVoiceTask: z.boolean()
  })
});

export type SessionMetadata = z.infer<typeof SessionMetadataSchema>;
