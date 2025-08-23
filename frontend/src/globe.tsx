// App.tsx
import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { getHighlightedCountriesData } from "./utils/dataAdapter";
import geoGlobeData from "./data/world.geojson?url";

function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ countriesResult] = await Promise.all([
          getHighlightedCountriesData()
        ]);
        setHighlightedCountries(countriesResult);
      } catch (error) {
        console.error('Error loading globe data:', error);
        // Fallback to loading geojson file directly if API fails
        try {
          setHighlightedCountries(['India', 'United States', 'Germany']); // fallback countries
        } catch (fallbackError) {
          console.error('Fallback geojson loading failed:', fallbackError);
        }
      }
    };
    fetch(geoGlobeData)
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch(() => setGeoData(null));

    loadData();
  }, []);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
    }
  });

  // Mirror the world horizontally across the vertical axis
  const MIRROR_HORIZONTAL = true;

  const buildMaskTexture = useMemo(() => {
    return (features: any[], width = 2048, height = 1024) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 1;

      const drawRing = (ring: number[][]) => {
        if (!Array.isArray(ring) || ring.length === 0) return;
        ctx.beginPath();
        ring.forEach(([lon, lat], i) => {
          const u = (((MIRROR_HORIZONTAL ? lon + 180 : 180 - lon)) / 360) * width;
          const v = ((90 - lat) / 180) * height; // matches SphereGeometry UVs
          if (i === 0) ctx.moveTo(u, v);
          else ctx.lineTo(u, v);
        });
        ctx.closePath();
        ctx.fill();
      };

      for (const feature of features) {
        const geom = feature?.geometry;
        if (!geom) continue;
        if (geom.type === "Polygon") {
          for (const ring of geom.coordinates) drawRing(ring);
        } else if (geom.type === "MultiPolygon") {
          for (const polygon of geom.coordinates) for (const ring of polygon) drawRing(ring);
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };
  }, []);

  const buildStrokeTexture = useMemo(() => {
    return (features: any[], width = 2048, height = 1024, lineWidth = 1.5) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      const strokeRing = (ring: number[][]) => {
        if (!Array.isArray(ring) || ring.length === 0) return;
        ctx.beginPath();
        ring.forEach(([lon, lat], i) => {
          const u = (((MIRROR_HORIZONTAL ? lon + 180 : 180 - lon)) / 360) * width;
          const v = ((90 - lat) / 180) * height;
          if (i === 0) ctx.moveTo(u, v);
          else ctx.lineTo(u, v);
        });
        ctx.stroke();
      };

      for (const feature of features) {
        const geom = feature?.geometry;
        if (!geom) continue;
        if (geom.type === "Polygon") {
          for (const ring of geom.coordinates) strokeRing(ring);
        } else if (geom.type === "MultiPolygon") {
          for (const polygon of geom.coordinates) for (const ring of polygon) strokeRing(ring);
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };
  }, [MIRROR_HORIZONTAL]);

  // Build continent highlights (Americas + Europe) and base land alpha when data is ready
  const { landAlphaTexture, highlightedTexture, bordersTexture } = useMemo(() => {
    if (!geoData || !Array.isArray(geoData.features)) return { landAlphaTexture: null as THREE.Texture | null, highlightedTexture: null as THREE.Texture | null, bordersTexture: null as THREE.Texture | null };
    const getName = (f: any) => f?.properties?.name ?? "";
    const getISO3 = (f: any) => f?.id ?? f?.properties?.iso_a3 ?? "";

    const isHighlighted = (f: any) => {
      const name = getName(f);
      
      // Only highlight countries that are in the highlighted countries list
      return highlightedCountries.includes(name);
    };

    const highlightedFeatures = geoData.features.filter((f: any) => isHighlighted(f));

    return {
      landAlphaTexture: buildMaskTexture(geoData.features),
      highlightedTexture: buildMaskTexture(highlightedFeatures),
      bordersTexture: buildStrokeTexture(geoData.features, 2048, 1024, 0.2),
    };
  }, [geoData, buildMaskTexture, buildStrokeTexture]);

  return (
    <group ref={globeRef} rotation={[0.4, 0, 0]}>
      {/* Ocean sphere */}
      <Sphere args={[1, 128, 128]}>
        <meshStandardMaterial color="#20286B" flatShading />
      </Sphere>

      {/* Base land layer (non-highlighted countries visible with very low opacity) */}
      {landAlphaTexture && (
        <Sphere args={[1.002, 128, 128]}>
          <meshStandardMaterial
            transparent
            color="#394a85"
            opacity={0.15}
            roughness={1}
            metalness={0}
            alphaMap={landAlphaTexture}
            alphaTest={0.01}
            depthWrite
          />
        </Sphere>
      )}

      {/* Country borders (double layer: dark base + bright additive glow) */}
      {bordersTexture && (
        <>
          <Sphere args={[1.002, 128, 128]} renderOrder={999}>
            <meshBasicMaterial
              transparent
              color="#0B0B0B"
              alphaMap={bordersTexture}
              opacity={1}
              depthWrite={false}
              depthTest={false}
            />
          </Sphere>
          <Sphere args={[1.003, 128, 128]} renderOrder={1000}>
            <meshBasicMaterial
              transparent
              color="#FFFFFF"
              alphaMap={bordersTexture}
              opacity={1}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
              depthWrite={false}
              depthTest={false}
            />
          </Sphere>
        </>
      )}

      {/* Neon highlight for highlighted countries (Americas + Europe) */}
      {highlightedTexture && (
        <Sphere args={[1.004, 128, 128]}>
          <meshStandardMaterial
            transparent
            color="#000000"
            opacity={1}
            emissive="#D5DE24"
            emissiveIntensity={2.2}
            emissiveMap={highlightedTexture}
            alphaMap={highlightedTexture}
            depthWrite={false}
            toneMapped={false}
          />
        </Sphere>
      )}
    </group>
  );
}

export default Globe;

