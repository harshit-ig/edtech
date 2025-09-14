import React, { Suspense, lazy } from 'react';
import { Canvas } from "@react-three/fiber";

// Lazy load the globe component
const Globe = lazy(() => import('../globe'));

interface LazyGlobeProps {
  className?: string;
}

const LazyGlobe: React.FC<LazyGlobeProps> = ({ className }) => {
  return (
    <div className={className}>
      <Suspense fallback={<div></div>}>
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Globe />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default LazyGlobe;