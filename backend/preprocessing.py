import { ImageBuffer } from '../../types';

export const preprocess = (imageData: ImageData): ImageBuffer => {
  const { width, height, data } = imageData;
  const buffer = new Float32Array(width * height);
  
  // Convert to grayscale and normalize to [0, 1]
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Standard luminance weights
    const gray = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;
    buffer[i / 4] = gray;
  }
  
  return { data: buffer, width, height };
};