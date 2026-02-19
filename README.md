🌌 Cosmic Ray Noise Reduction

A web-based computer vision application for detecting and removing cosmic ray artifacts from astronomical images using deterministic image processing techniques.

This project focuses on robust local statistics to identify impulse noise caused by high-energy particle strikes on CCD sensors during long-exposure astrophotography.



✨ Features

1.📷 Upload astronomical images directly in the browser

2.🧠 Deterministic cosmic ray detection using local median statistics

3.🧹 Noise removal via median-based interpolation

4.📊 Real-time execution statistics (noise pixels, processing time, corruption ratio)

5.🖥️ Interactive UI built with React + TypeScript + Tailwind CSS

6.⚡ Fully client-side (no backend server required)



🧠 Algorithm Overview:

1️⃣ Preprocessing

1.Converts RGB images to grayscale

2.Normalizes intensity values to [0, 1]

4.Prepares data for statistical analysis


2️⃣ Detection (Local Median Statistics)

* A 3×3 neighborhood is evaluated for each pixel

* The local median of surrounding pixels is computed

* A pixel is flagged as a cosmic ray if:
pixel_intensity − local_median > threshold

This approach is robust against stars and extended objects, which do not form isolated impulse spikes.


3️⃣ Denoising (Median-Based Restoration)

1.Detected artifact pixels are discarded

2.Replacement is performed using the median of valid neighboring pixels

3.Preserves underlying astronomical structures while removing noise



🖼️ Application Screens

1.Processing Pipeline
Upload image → adjust sensitivity → run denoising

2.Noise Artifact Mask
Visualizes isolated cosmic ray detections

3.Execution Stats:
     *Noise pixels detected
     *Processing time
     *Corruption percentage



     🧩 Project Structure
     cosmic-ray-noise-reduction
cosmic-ray-noise-reduction/
│
├── frontend/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── ProcessingDashboard.tsx
│   │   └── Documentation.tsx
│   │
│   ├── services/
│   │   └── backend/
│   │       ├── preprocessing.ts
│   │       ├── detection.ts
│   │       ├── denoising.ts
│   │       └── pipeline.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.html
│
├── data/        # (ignored – datasets)
├── results/     # (ignored – generated outputs)
├── README.md
└── .gitignore






🚀 Getting Started

Prerequisites:

   *Modern web browser (Chrome / Edge / Firefox)
   *No server or database required



   🎛️ Detection Sensitivity Guide:

   | Threshold   | Behavior               |
| ----------- | ---------------------- |
| 0.05 – 0.10 | Aggressive detection   |
| 0.10 – 0.20 | Balanced (recommended) |
| 0.30+       | Conservative           |


If no cosmic rays are detected, lower the threshold — this is expected for clean images.



📌 Notes

1.The algorithm is deterministic (no ML / training required)
2.Designed specifically for isolated impulse noise
3.Stars and galaxies are intentionally preserved
4.Performance depends on image resolution



📈 Future Improvements 

1.Adaptive thresholding
2.Multi-scale detection
3.Batch image processing
4.PSNR / SSIM quantitative evaluation
5.GPU acceleration via WebGL / WebGPU



👨‍💻 Author

Developed as a Computer Vision & Image Processing Project
Focused on practical, explainable algorithms for scientific imaging.



📄 License

This project is open for academic and educational use.

