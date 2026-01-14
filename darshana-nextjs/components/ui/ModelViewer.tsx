'use client';

import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, useProgress, Html } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

interface ModelProps {
  modelPath: string;
  autoRotate?: boolean;
}

function Model({ modelPath, autoRotate = true }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      modelPath,
      (gltf) => {
        setModel(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    return () => {
      dracoLoader.dispose();
    };
  }, [modelPath]);

  // Auto-rotate the model slowly
  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  if (!model) return null;

  return (
    <Center>
      <group ref={modelRef}>
        <primitive object={model} scale={1.8} />
      </group>
    </Center>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="model-loading-content">
        <div className="model-loading-spinner"></div>
        <p>Loading 3D Model... {progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

// Component to handle WebGL context loss
function ContextHandler() {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.log('WebGL context lost, attempting to restore...');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);

  return null;
}

interface ModelViewerProps {
  modelPath: string;
  autoRotate?: boolean;
}

export default function ModelViewer({ modelPath, autoRotate = true }: ModelViewerProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="model-viewer-error">
        <p>Unable to load 3D model. Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="model-viewer-container">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
        }}
        onError={() => setHasError(true)}
      >
        <ContextHandler />

        {/* Lighting setup for museum-style display */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          color="#ffffff"
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.5}
          color="#f0f0f0"
        />
        <pointLight position={[0, 10, 0]} intensity={0.3} color="#ffffff" />

        {/* The 3D Model */}
        <Suspense fallback={<Loader />}>
          <Model modelPath={modelPath} autoRotate={autoRotate} />
        </Suspense>

        {/* Ground plane for context */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0a0a0a" transparent opacity={0.5} />
        </mesh>

        {/* User controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={12}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Interaction hint */}
      <div className="model-viewer-hint">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>Drag to rotate • Scroll to zoom</span>
      </div>
    </div>
  );
}
