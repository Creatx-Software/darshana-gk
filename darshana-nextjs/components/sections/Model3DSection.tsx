'use client';

import dynamic from 'next/dynamic';

// Dynamically import ModelViewer to avoid SSR issues with Three.js
const ModelViewer = dynamic(() => import('@/components/ui/ModelViewer'), {
  ssr: false,
  loading: () => (
    <div className="model-viewer-loading">
      <div className="model-loading-spinner"></div>
      <p>Loading 3D Model...</p>
    </div>
  ),
});

export default function Model3DSection() {
  return (
    <section className="model-3d-section" id="3d-showcase">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title no-underline" data-aos="fade-up">
            Interactive 3D Showcase
          </h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Explore Our Craftsmanship in 360°
          </p>
        </div>

        <div className="model-3d-wrapper" data-aos="zoom-in" data-aos-delay="200">
          <ModelViewer modelPath="/models/pavilion-optimized.glb" autoRotate={true} />
        </div>

        <div className="model-3d-info" data-aos="fade-up" data-aos-delay="300">
          <p>
            Experience the intricate details of our stone craftsmanship.
            Rotate and zoom to appreciate every angle of this masterpiece.
          </p>
        </div>
      </div>
    </section>
  );
}
