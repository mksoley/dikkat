export interface RppgResult {
  timestampMs: number;
  hrBpm: number | null;
  hrvProxy: number | null;
  sqi: number;
  motionArtifactIndex: number;
}

export class RppgWorkerClient {
  private listeners: ((result: RppgResult) => void)[] = [];

  onResult(listener: (result: RppgResult) => void) {
    this.listeners.push(listener);
  }

  start() {
    // TODO: Wire to Web Worker implementing POS/CHROM algorithm.
    setInterval(() => {
      const now = performance.now();
      this.emit({
        timestampMs: now,
        hrBpm: 72,
        hrvProxy: 38,
        sqi: 0.74,
        motionArtifactIndex: 0.12
      });
    }, 2000);
  }

  private emit(result: RppgResult) {
    this.listeners.forEach((listener) => listener(result));
  }
}
