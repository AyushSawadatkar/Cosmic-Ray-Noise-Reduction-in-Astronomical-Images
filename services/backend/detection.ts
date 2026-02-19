import { ImageBuffer } from '../../types';

export const detectCosmicRays = (buffer: ImageBuffer, threshold: number = 0.15): boolean[] => {
  const { data, width, height } = buffer;
  const mask = new Array(data.length).fill(false);
  
  // Deterministic detection using 3x3 median comparison
  // Cosmic rays are typically sharp spikes significantly brighter than local median
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const neighbors = [];
      
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          neighbors.push(data[(y + dy) * width + (x + dx)]);
        }
      }
      
      neighbors.sort((a, b) => a - b);
      const median = neighbors[4];
      const val = data[idx];
      
      // If pixel is significantly brighter than neighbors and exceeds threshold
      if (val > median + threshold) {
        mask[idx] = true;
      }
    }
  }
  
  return mask;
};
