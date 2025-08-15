import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

type FloatingDotsProps = {
  numDots?: number;
  colors?: string[];
  maxRadius?: number;
  className?: string;
};

export default function FloatingDots({
  numDots = 60, // Reduced for better mobile performance
  colors = ["#2B2B8E", "#D5DE24", "#EF552C"],
  maxRadius = 7, // Increased max for more variety
  className = "",
}: FloatingDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let dots: Dot[] = [];

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      dots = Array.from({ length: numDots }).map(() => ({
        x: rand(0, canvas.clientWidth || container.clientWidth),
        y: rand(0, canvas.clientHeight || container.clientHeight),
        vx: rand(-0.2, 0.2), // Slightly reduced speed for smoother mobile performance
        vy: rand(-0.2, 0.2),
        radius: rand(1, maxRadius), // Increased minimum for better visibility and 3D effect
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const step = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        // Update position
        d.x += d.vx;
        d.y += d.vy;

        // Gentle friction for natural movement
        d.vx *= 0.998;
        d.vy *= 0.998;

        // Wrap around edges
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;

        // Draw dot with varying opacity based on radius for 3D effect
        ctx.beginPath();
        const alpha = 0.3 + (d.radius / maxRadius) * 0.7; // Larger dots are more opaque
        ctx.fillStyle = d.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(step);
    };

    resize();
    init();
    animationFrameId = requestAnimationFrame(step);
    
    const handleResize = () => { 
      resize(); 
      init(); 
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [colors, maxRadius, numDots]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
    </div>
  );
}

