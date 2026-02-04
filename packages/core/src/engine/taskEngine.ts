export interface Stimulus {
  id: string;
  isTarget: boolean;
  onsetMs: number;
  durationMs: number;
}

export interface TaskEngineOptions {
  isiRangeMs: [number, number];
  stimulusDurationMs: number;
  targetProbability: number;
  now: () => number;
}

export interface TaskEvent {
  id: string;
  type: "stimulus_on" | "stimulus_off" | "response";
  timestampMs: number;
  payload?: Record<string, unknown>;
}

export class TaskEngine {
  private options: TaskEngineOptions;
  private schedule: Stimulus[] = [];
  private listeners: ((event: TaskEvent) => void)[] = [];

  constructor(options: TaskEngineOptions) {
    this.options = options;
  }

  onEvent(listener: (event: TaskEvent) => void) {
    this.listeners.push(listener);
  }

  buildSchedule(totalCount: number) {
    const now = this.options.now();
    let cursor = now + 500;
    this.schedule = Array.from({ length: totalCount }, (_, index) => {
      const jitter = this.randomInRange(this.options.isiRangeMs);
      cursor += jitter;
      return {
        id: `stim-${index + 1}`,
        isTarget: Math.random() < this.options.targetProbability,
        onsetMs: cursor,
        durationMs: this.options.stimulusDurationMs
      };
    });
    return this.schedule;
  }

  tick(currentTime: number) {
    for (const stimulus of this.schedule) {
      if (Math.abs(currentTime - stimulus.onsetMs) < 5) {
        this.emit({
          id: stimulus.id,
          type: "stimulus_on",
          timestampMs: currentTime,
          payload: { isTarget: stimulus.isTarget }
        });
      }
      if (Math.abs(currentTime - (stimulus.onsetMs + stimulus.durationMs)) < 5) {
        this.emit({
          id: stimulus.id,
          type: "stimulus_off",
          timestampMs: currentTime,
          payload: { isTarget: stimulus.isTarget }
        });
      }
    }
  }

  recordResponse(stimulusId: string, responseTime: number) {
    this.emit({
      id: stimulusId,
      type: "response",
      timestampMs: responseTime
    });
  }

  private emit(event: TaskEvent) {
    this.listeners.forEach((listener) => listener(event));
  }

  private randomInRange(range: [number, number]) {
    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  }
}
