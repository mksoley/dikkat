export interface AudioQualitySample {
  timestampMs: number;
  ambientLevel: number;
  clipping: boolean;
}

export class AudioGuard {
  private context: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private listeners: ((sample: AudioQualitySample) => void)[] = [];

  async init() {
    this.context = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = this.context.createMediaStreamSource(stream);
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 1024;
    source.connect(this.analyser);
    this.sample();
  }

  onSample(listener: (sample: AudioQualitySample) => void) {
    this.listeners.push(listener);
  }

  private sample() {
    if (!this.analyser) return;
    const data = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(data);
    const rms = Math.sqrt(
      data.reduce((sum, value) => sum + Math.pow(value - 128, 2), 0) / data.length
    );
    const clipping = data.some((value) => value < 2 || value > 253);
    const ambientLevel = Math.min(100, Math.max(0, (rms / 128) * 100));

    this.listeners.forEach((listener) =>
      listener({ timestampMs: performance.now(), ambientLevel, clipping })
    );

    requestAnimationFrame(() => this.sample());
  }
}
