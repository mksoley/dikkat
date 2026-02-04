import demoNorms from "./norms-demo.json";

export interface NormsDataset {
  version: string;
  deviceCategory: string;
  ageBrackets: Record<string, { meanRt: number; rtStd: number; rtv: number }>;
  note: string;
}

export const loadNorms = () => demoNorms as NormsDataset;
