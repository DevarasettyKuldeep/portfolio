"use client";

import { useEffect, useRef } from "react";

interface ShapeWavesProps {
  dotSize?: number; // 0.46 by default
  cellSize?: number; // Grid spacing in px
  speed?: number; // Wave speed multiplier
  shapes?: "mixed" | "circles" | "squares" | "triangles";
  interactive?: boolean;
  className?: string;
}

export default function ShapeWaves({
  dotSize = 0.46,
  cellSize = 26,
  speed = 0.7,
  shapes = "mixed",
  interactive = true,
  className = "",
}: ShapeWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("resize", handleResize);
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    handleResize();

    const render = () => {
      time += 0.016 * speed;

      // Smooth mouse interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;
      const offsetX = (width % cellSize) / 2;
      const offsetY = (height % cellSize) / 2;

      // Base radius calculation derived from dotSize
      const baseRadius = (cellSize * dotSize * 0.5);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * cellSize;
          const y = offsetY + r * cellSize;

          // Multi-harmonic undulating wave simulation (Perlin/Sine wave approximation)
          const wave1 = Math.sin(x * 0.0055 + y * 0.0035 + time * 1.1);
          const wave2 = Math.cos(x * 0.0032 - y * 0.0048 + time * 0.85);
          const wave3 = Math.sin((x + y) * 0.004 - time * 0.6);
          const wave = (wave1 * 0.5 + wave2 * 0.35 + wave3 * 0.15); // -1 to 1

          let normalizedWave = (wave + 1) * 0.5; // 0 to 1

          // Interactive mouse wave / ripple
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 180;
            if (dist < radius) {
              const mouseInfluence = (1 - dist / radius);
              const ripple = Math.sin(dist * 0.06 - time * 4) * 0.35 * mouseInfluence;
              normalizedWave = Math.min(1, Math.max(0, normalizedWave + ripple + mouseInfluence * 0.3));
            }
          }

          // Subtle, simple and clean scaling & opacity
          // Quiet valley: small and dim | Crest of wave: expands and illuminates
          const scale = 0.55 + normalizedWave * 0.85;
          const currentRadius = Math.max(0.6, baseRadius * scale);
          const alpha = 0.04 + normalizedWave * 0.22; // very subtle, never distracting

          // Color: Gentle transition from dark silver to subtle mint/cyan accent (#00d4aa)
          const isAccent = normalizedWave > 0.55;
          if (isAccent) {
            ctx.fillStyle = `rgba(0, 212, 170, ${alpha * 1.4})`;
          } else {
            ctx.fillStyle = `rgba(180, 190, 195, ${alpha})`;
          }

          // Shape selection: mixed (alternating circle, square, triangle) or single shape
          let shapeType: number;
          if (shapes === "circles") shapeType = 0;
          else if (shapes === "squares") shapeType = 1;
          else if (shapes === "triangles") shapeType = 2;
          else {
            // Mixed deterministic pattern based on grid coords
            shapeType = (c * 3 + r * 5) % 3;
          }

          ctx.beginPath();
          if (shapeType === 0) {
            // Circle
            ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
            ctx.fill();
          } else if (shapeType === 1) {
            // Square (subtly rounded corners or clean micro-square)
            const s = currentRadius * 0.95;
            ctx.rect(x - s, y - s, s * 2, s * 2);
            ctx.fill();
          } else {
            // Equilateral Triangle
            const h = currentRadius * 1.15;
            ctx.moveTo(x, y - h);
            ctx.lineTo(x + currentRadius, y + h * 0.65);
            ctx.lineTo(x - currentRadius, y + h * 0.65);
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [dotSize, cellSize, speed, shapes, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
