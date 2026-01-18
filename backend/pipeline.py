import { preprocess } from './preprocessing';
import { detectCosmicRays } from './detection';
import { denoise } from './denoising';
import { ImageBuffer, ProcessingResult } from '../../types';

export const runPipeline = async (imageData: ImageData, detectionThreshold: number = 0.15): Promise<ProcessingResult> => {
  const startTime = performance.now();
  
  // 1. Preprocessing
  const buffer = preprocess(imageData);
  
  // 2. Detection
  const mask = detectCosmicRays(buffer, detectionThreshold);
  const noiseCount = mask.filter(m => m).length;
  
  // 3. Denoising
  const cleanBuffer = denoise(buffer, mask);
  
  const endTime = performance.now();
  
  // Conversion back to visual formats for UI
  const originalB64 = imageDataToBase64(imageData);
  const maskB64 = maskToImageBase64(mask, buffer.width, buffer.height);
  const denoisedB64 = bufferToImageBase64(cleanBuffer);
  
  return {
    original: originalB64,
    mask: maskB64,
    denoised: denoisedB64,
    stats: {
      noisePixels: noiseCount,
      reductionRatio: noiseCount / (buffer.width * buffer.height),
      processingTimeMs: endTime - startTime
    }
  };
};

// Helper: Convert ImageData to Base64
function imageDataToBase64(imageData: ImageData): string {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d')!;
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

// Helper: Convert Noise Mask to Base64 (White on Black)
function maskToImageBase64(mask: boolean[], width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.createImageData(width, height);
  for (let i = 0; i < mask.length; i++) {
    const val = mask[i] ? 255 : 0;
    imgData.data[i * 4] = val;
    imgData.data[i * 4 + 1] = val;
    imgData.data[i * 4 + 2] = val;
    imgData.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL();
}

// Helper: Convert Float32 Buffer back to Visual Image
function bufferToImageBase64(buffer: ImageBuffer): string {
  const { data, width, height } = buffer;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.createImageData(width, height);
  for (let i = 0; i < data.length; i++) {
    const val = Math.min(255, Math.max(0, data[i] * 255));
    imgData.data[i * 4] = val;
    imgData.data[i * 4 + 1] = val;
    imgData.data[i * 4 + 2] = val;
    imgData.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL();
}