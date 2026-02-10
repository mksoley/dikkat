export interface GazeSample {
  timestampMs: number;
  x: number;
  y: number;
  confidence: number;
}

export interface GazeCalibrationPoint {
  screenX: number;
  screenY: number;
  eyeFeatures: number[];
}

export class GazeProxy {
  private coefficients: number[] | null = null;

  calibrate(points: GazeCalibrationPoint[]) {
    // TODO: Replace with regression using eye/iris landmarks + head pose.
    this.coefficients = points.length ? [1, 0, 0, 1, 0, 0] : null;
  }

  estimate(eyeFeatures: number[], timestampMs: number): GazeSample {
    const confidence = this.coefficients ? 0.85 : 0.2;
    return {
      timestampMs,
      x: 0.5,
      y: 0.5,
      confidence
    };
  }
}
