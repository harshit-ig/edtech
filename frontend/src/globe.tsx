// App.tsx
import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch(() => setGeoData(null));
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
  const { landAlphaTexture, americasTexture, europeTexture, bordersTexture } = useMemo(() => {
    if (!geoData || !Array.isArray(geoData.features)) return { usaTexture: null as THREE.Texture | null, europeTexture: null as THREE.Texture | null };
    const getName = (f: any) => f?.properties?.name ?? "";
    const getISO3 = (f: any) => f?.id ?? f?.properties?.iso_a3 ?? "";
    const getContinent = (f: any) => (f?.properties?.continent ?? "").toLowerCase();
    const europeCountries = [
      "France",
      "Germany",
      "Italy",
      "Spain",
      "United Kingdom",
      "Poland",
      "Portugal",
      "Belgium",
      "Netherlands",
      "Switzerland",
      "Austria",
      "Czech Republic",
      "Denmark",
      "Norway",
      "Sweden",
      "Finland",
      "Ireland",
      "Greece",
      "Hungary",
      "Romania",
      "Bulgaria",
      "Slovakia",
      "Slovenia",
      "Croatia",
      "Estonia",
      "Latvia",
      "Lithuania",
    ];

    const americasCountries = [
      "Canada",
      "United States of America",
      "United States",
      "Mexico",
      "Guatemala",
      "Belize",
      "Honduras",
      "El Salvador",
      "Nicaragua",
      "Costa Rica",
      "Panama",
      "Bahamas",
      "Cuba",
      "Jamaica",
      "Haiti",
      "Dominican Republic",
      "Trinidad and Tobago",
      "Barbados",
      "Saint Lucia",
      "Saint Vincent and the Grenadines",
      "Grenada",
      "Antigua and Barbuda",
      "Dominica",
      "Saint Kitts and Nevis",
      "Bermuda",
      "Greenland",
      "Colombia",
      "Venezuela",
      "Guyana",
      "Suriname",
      "Ecuador",
      "Peru",
      "Bolivia",
      "Chile",
      "Argentina",
      "Uruguay",
      "Paraguay",
      "Brazil",
    ];

    const isAmericas = (f: any) => {
      const continent = getContinent(f);
      if (continent === "north america" || continent === "south america") return true;
      const name = getName(f);
      const iso3 = getISO3(f);
      if (iso3 === "USA") return true; // ensure USA included
      return americasCountries.includes(name);
    };

    const isEurope = (f: any) => {
      const continent = getContinent(f);
      if (continent === "europe") return true;
      return europeCountries.includes(getName(f));
    };

    const americasFeatures = geoData.features.filter((f: any) => isAmericas(f));
    const europeFeatures = geoData.features.filter((f: any) => isEurope(f));

    return {
      landAlphaTexture: buildMaskTexture(geoData.features),
      americasTexture: buildMaskTexture(americasFeatures),
      europeTexture: buildMaskTexture(europeFeatures),
      bordersTexture: buildStrokeTexture(geoData.features, 2048, 1024, 0.2),
    };
  }, [geoData, buildMaskTexture, buildStrokeTexture]);

  return (
    <group ref={globeRef}>
      {/* Ocean sphere */}
      <Sphere args={[1, 128, 128]}>
        <meshStandardMaterial color="#20286B" flatShading />
      </Sphere>

      {/* Base land layer (non-highlighted countries visible) */}
      {landAlphaTexture && (
        <Sphere args={[1.002, 128, 128]}>
          <meshStandardMaterial
            transparent
            color="#72770f"
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

      {/* Neon highlight for Americas */}
      {americasTexture && (
        <Sphere args={[1.004, 128, 128]}>
          <meshStandardMaterial
            transparent
            color="#000000"
            opacity={1}
            emissive="#EF552C"
            emissiveIntensity={2.2}
            emissiveMap={americasTexture}
            alphaMap={americasTexture}
            depthWrite={false}
            toneMapped={false}
          />
        </Sphere>
      )}

      {/* Neon highlight for Europe */}
      {europeTexture && (
        <Sphere args={[1.006, 128, 128]}>
          <meshStandardMaterial
            transparent
            color="#000000"
            opacity={1}
            emissive="#EF552C"
            emissiveIntensity={2.2}
            emissiveMap={europeTexture}
            alphaMap={europeTexture}
            depthWrite={false}
            toneMapped={false}
          />
        </Sphere>
      )}

      {/* <OrbitControls enablePan={false} enableZoom minDistance={2} maxDistance={6} /> */}
    </group>
  );
}

export default Globe;

