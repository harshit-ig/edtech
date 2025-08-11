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
  numDots = 90,
  colors = ["#EF552C", "#CBD514", "#2B2B8E"],
  maxRadius = 2.2,
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
    const mouse = { x: -9999, y: -9999 };

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
        vx: rand(-0.3, 0.3),
        vy: rand(-0.3, 0.3),
        radius: rand(0.8, maxRadius),
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const step = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        // Mouse interaction: slight repulsion
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const influenceRadius = 140;
        if (distSq < influenceRadius * influenceRadius) {
          const dist = Math.sqrt(Math.max(distSq, 0.0001));
          const force = (influenceRadius - dist) / influenceRadius;
          d.vx += (dx / dist) * force * 0.08;
          d.vy += (dy / dist) * force * 0.08;
        }

        // Update
        d.x += d.vx;
        d.y += d.vy;

        // Gentle friction
        d.vx *= 0.995;
        d.vy *= 0.995;

        // Wrap around edges
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;

        // Draw
        ctx.beginPath();
        ctx.fillStyle = d.color + "cc"; // add alpha
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 70) {
            const alpha = 1 - dist / 70;
            ctx.strokeStyle = `rgba(255,255,255,${0.12 * alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    init();
    animationFrameId = requestAnimationFrame(step);
    window.addEventListener("resize", () => { resize(); init(); });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [colors, maxRadius, numDots]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
    </div>
  );
}

