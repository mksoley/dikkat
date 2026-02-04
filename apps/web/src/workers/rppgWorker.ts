// TODO: Implement POS/CHROM rPPG algorithm in a Web Worker.
self.onmessage = (event) => {
  const { type } = event.data;
  if (type === "ping") {
    self.postMessage({ type: "pong", timestampMs: performance.now() });
  }
};
