export interface ImageBuffer {
  data: Float32Array;
  width: number;
  height: number;
}

export interface ProcessingResult {
  original: string; // Base64
  noisy?: string;   // Base64
  mask?: string;    // Base64
  denoised?: string; // Base64
  enhanced?: string; // Base64 (2x Visual Clarity)
  stats: {
    noisePixels: number;
    reductionRatio: number;
    processingTimeMs: number;
  }
}

export enum PipelineStep {
  IDLE = 'IDLE',
  PREPROCESSING = 'PREPROCESSING',
  DETECTION = 'DETECTION',
  DENOISING = 'DENOISING',
  ENHANCEMENT = 'ENHANCEMENT',
  COMPLETE = 'COMPLETE'
}