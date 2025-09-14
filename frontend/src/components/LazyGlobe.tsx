import React, { Suspense, lazy, useState, useEffect } from 'react';

// Lazy load Three.js components only when ready
const Canvas = lazy(() => import("@react-three/fiber").then(module => ({ default: module.Canvas })));
const Globe = lazy(() => import('../globe'));

interface LazyGlobeProps {
  className?: string;
}

const LazyGlobe: React.FC<LazyGlobeProps> = ({ className }) => {
  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);

  useEffect(() => {
    // Delay loading the heavy Three.js components until after initial render
    const loadGlobe = () => {
      setShouldLoadGlobe(true);
    };

    // Use requestIdleCallback for better performance, fallback to setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadGlobe, { timeout: 2000 });
    } else {
      setTimeout(loadGlobe, 1000);
    }
  }, []);

  // Return empty div initially, then progressively load globe
  if (!shouldLoadGlobe) {
    return <div className={className}></div>;
  }

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