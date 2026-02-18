import { ImageBuffer } from '../../types';

export const denoise = (buffer: ImageBuffer, mask: boolean[]): ImageBuffer => {
  const { data, width, height } = buffer;
  const output = new Float32Array(data);
  
  for (let i = 0; i < mask.length; i++) {
    if (mask[i]) {
      const y = Math.floor(i / width);
      const x = i % width;
      
      // Replace with local 3x3 median of non-noisy pixels
      const cleanNeighbors = [];
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nIdx = ny * width + nx;
            if (!mask[nIdx]) {
              cleanNeighbors.push(data[nIdx]);
            }
          }
        }
      }
      
      if (cleanNeighbors.length > 0) {
        cleanNeighbors.sort((a, b) => a - b);
        output[i] = cleanNeighbors[Math.floor(cleanNeighbors.length / 2)];
      }
    }
  }
  
  return { data: output, width, height };
};
