import type { EventLog } from "../schemas/events";

export interface MetricSummary {
  meanRt: number | null;
  rtStdDev: number | null;
  omissionCount: number;
  commissionCount: number;
  dPrime: number | null;
  criterion: number | null;
  validityScore: number;
}

export const summarizeMetrics = (events: EventLog[]): MetricSummary => {
  // TODO: Replace with full CPT + Virtual Office metrics, bootstrap CI, and time-on-task slopes.
  const responses = events.filter((event) => event.type === "response");
  const meanRt = responses.length
    ? responses.reduce((sum, event) => sum + event.timestampMs, 0) / responses.length
    : null;

  return {
    meanRt,
    rtStdDev: null,
    omissionCount: 0,
    commissionCount: 0,
    dPrime: null,
    criterion: null,
    validityScore: 82
  };
};
