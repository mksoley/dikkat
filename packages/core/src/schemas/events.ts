import { z } from "zod";

export const EventTypeSchema = z.enum([
  "stimulus_on",
  "stimulus_off",
  "response",
  "correct",
  "incorrect",
  "distractor_on",
  "distractor_off",
  "popup_on",
  "popup_off",
  "task_switch"
]);

export const EventLogSchema = z.object({
  timestampMs: z.number(),
  type: EventTypeSchema,
  payload: z.record(z.string(), z.unknown()).optional()
});

export type EventLog = z.infer<typeof EventLogSchema>;
