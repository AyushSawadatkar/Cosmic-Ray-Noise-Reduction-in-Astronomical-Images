import { ImageBuffer } from '../../types';

/**
 * Enhancement Engine
 * 1. Performs 2x Bicubic-like upscaling
 * 2. Applies an Unsharp Mask (Laplacian Sharpening)
 * 3. Normalizes local contrast for astronomical clarity
 */
export const enhanceImage = (buffer: ImageBuffer): ImageBuffer => {
  const { data, width, height } = buffer;
  const newWidth = width * 2;
  const newHeight = height * 2;
  const enhancedData = new Float32Array(newWidth * newHeight);

  // Step 1: 2x Linear Interpolation (Efficient Upscaling)
  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const gx = (x / (newWidth - 1)) * (width - 1);
      const gy = (y / (newHeight - 1)) * (height - 1);
      const gxi = Math.floor(gx);
      const gyi = Math.floor(gy);
      
      const x_diff = gx - gxi;
      const y_diff = gy - gyi;
      
      const a = data[gyi * width + gxi];
      const b = data[gyi * width + (gxi + 1)] || a;
      const c = data[(gyi + 1) * width + gxi] || a;
      const d = data[(gyi + 1) * width + (gxi + 1)] || a;

      enhancedData[y * newWidth + x] = 
        a * (1 - x_diff) * (1 - y_diff) +
        b * x_diff * (1 - y_diff) +
        c * y_diff * (1 - x_diff) +
        d * x_diff * y_diff;
    }
  }

  // Step 2: Unsharp Masking / Laplacian Sharpening
  // Kernel: [0, -1, 0, -1, 5, -1, 0, -1, 0]
  const finalData = new Float32Array(enhancedData);
  const strength = 0.45; // Sharpening factor for 2x clarity

  for (let y = 1; y < newHeight - 1; y++) {
    for (let x = 1; x < newWidth - 1; x++) {
      const idx = y * newWidth + x;
      const center = enhancedData[idx];
      const laplacian = 
        -enhancedData[(y-1) * newWidth + x] 
        -enhancedData[(y+1) * newWidth + x]
        -enhancedData[y * newWidth + (x-1)]
        -enhancedData[y * newWidth + (x+1)]
        + 4 * center;
      
      finalData[idx] = Math.min(1.0, Math.max(0.0, center + laplacian * strength));
    }
  }

  return { data: finalData, width: newWidth, height: newHeight };
};
