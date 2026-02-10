export interface FaceFrame {
  timestampMs: number;
  facePresentProb: number;
  headPose: { yaw: number; pitch: number; roll: number };
  landmarks: Array<{ x: number; y: number; z: number; confidence: number }>;
}

export interface FaceTrackerOptions {
  video: HTMLVideoElement;
  onFrame: (frame: FaceFrame) => void;
}

export class FaceTracker {
  private options: FaceTrackerOptions;
  private isRunning = false;

  constructor(options: FaceTrackerOptions) {
    this.options = options;
  }

  async start() {
    // TODO: Integrate MediaPipe Face Landmarker for robust landmarks + head pose.
    this.isRunning = true;
    this.tick();
  }

  stop() {
    this.isRunning = false;
  }

  private tick() {
    if (!this.isRunning) return;
    const now = performance.now();

    this.options.onFrame({
      timestampMs: now,
      facePresentProb: 0.98,
      headPose: { yaw: 0.1, pitch: 0.02, roll: 0.01 },
      landmarks: []
    });

    requestAnimationFrame(() => this.tick());
  }
}
