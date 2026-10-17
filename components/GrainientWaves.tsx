"use client";

import { useEffect, useRef } from "react";

interface GrainientWavesProps {
  speed?: number;
  lineCount?: number;
  amplitude?: number;
  interactive?: boolean;
  className?: string;
}

export default function GrainientWaves({
  speed = 0.7,
  lineCount = 20,
  amplitude = 32,
  interactive = true,
  className = "",
}: GrainientWavesProps) {
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
      time += 0.012 * speed;

      // Mouse interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------
      // 1. GRAINIENT: Flowing ambient glowing gradient nodes
      // Light Radium Neon Blue: #00e5ff / rgb(0, 229, 255)
      // -----------------------------------------------------------
      const baseRadius = Math.max(width, height) * 0.42;

      // Drift Node 1 (Upper central)
      const n1X = width * 0.3 + Math.sin(time * 0.45) * 80;
      const n1Y = height * 0.28 + Math.cos(time * 0.35) * 60;
      const g1 = ctx.createRadialGradient(n1X, n1Y, 0, n1X, n1Y, baseRadius);
      g1.addColorStop(0, "rgba(0, 229, 255, 0.085)");
      g1.addColorStop(0.45, "rgba(0, 190, 250, 0.03)");
      g1.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Drift Node 2 (Lower right)
      const n2X = width * 0.72 + Math.cos(time * 0.4) * 90;
      const n2Y = height * 0.68 + Math.sin(time * 0.3) * 70;
      const g2 = ctx.createRadialGradient(n2X, n2Y, 0, n2X, n2Y, baseRadius * 1.1);
      g2.addColorStop(0, "rgba(0, 210, 255, 0.07)");
      g2.addColorStop(0.5, "rgba(0, 150, 230, 0.025)");
      g2.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Interactive cursor glow node (Stirs smoothly with mouse)
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        mouseGlow.addColorStop(0, "rgba(0, 235, 255, 0.12)");
        mouseGlow.addColorStop(0.5, "rgba(0, 195, 245, 0.035)");
        mouseGlow.addColorStop(1, "rgba(5, 5, 5, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // -----------------------------------------------------------
      // 2. WAVES: Silky undulating wave contours across the viewport
      // -----------------------------------------------------------
      const xStep = Math.max(14, Math.floor(width / 75)); // smooth curve resolution
      const startY = height * 0.14;
      const endY = height * 0.86;
      const verticalGap = (endY - startY) / (lineCount - 1);

      // Shared horizontal gradient to fade wave edges seamlessly
      const lineGradient = ctx.createLinearGradient(0, 0, width, 0);
      lineGradient.addColorStop(0, "rgba(0, 210, 255, 0)");
      lineGradient.addColorStop(0.12, "rgba(0, 215, 255, 0.4)");
      lineGradient.addColorStop(0.5, "rgba(0, 235, 255, 0.85)");
      lineGradient.addColorStop(0.88, "rgba(0, 215, 255, 0.4)");
      lineGradient.addColorStop(1, "rgba(0, 210, 255, 0)");

      for (let i = 0; i < lineCount; i++) {
        const baseY = startY + i * verticalGap;
        const linePhase = i * 0.28;
        const isAccentLine = i % 4 === 1;

        ctx.beginPath();

        let prevX = 0;
        let prevY = baseY;

        for (let x = 0; x <= width + xStep; x += xStep) {
          // Multi-harmonic sine / cosine wave oscillation
          const w1 = Math.sin(x * 0.0032 + time * 1.1 + linePhase) * (amplitude * 0.85);
          const w2 = Math.cos(x * 0.0058 - time * 0.75 + linePhase * 1.3) * (amplitude * 0.42);
          const w3 = Math.sin((x + baseY) * 0.0018 + time * 0.5) * (amplitude * 0.22);
          let currentY = baseY + w1 + w2 + w3;

          // Interactive cursor bend & ripple physics
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = currentY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influenceRadius = 210;

            if (dist < influenceRadius) {
              const factor = 1 - dist / influenceRadius;
              // Smooth Gaussian deflection + subtle concentric ripple
              const deflection = (dy / (dist + 1)) * 36 * factor;
              const ripple = Math.sin(dist * 0.055 - time * 3.5) * 12 * factor;
              currentY += deflection + ripple;
            }
          }

          if (x === 0) {
            ctx.moveTo(x, currentY);
          } else {
            // Smooth cubic/quadratic curve segment
            const midX = (prevX + x) / 2;
            const midY = (prevY + currentY) / 2;
            ctx.quadraticCurveTo(prevX, prevY, midX, midY);
          }

          prevX = x;
          prevY = currentY;
        }

        // Draw last segment
        ctx.lineTo(prevX, prevY);

        if (isAccentLine) {
          // Glowing light radium neon blue line
          ctx.strokeStyle = lineGradient;
          ctx.lineWidth = 1.4;
          ctx.shadowColor = "rgba(0, 235, 255, 0.45)";
          ctx.shadowBlur = 8;
        } else {
          // Subtle, elegant ambient wave line
          ctx.strokeStyle = "rgba(160, 215, 245, 0.11)";
          ctx.lineWidth = 0.85;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
      }

      // Reset shadow for next frame
      ctx.shadowBlur = 0;

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
  }, [speed, lineCount, amplitude, interactive]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Interactive Waves & Grainient Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Tactile film grain overlay (Authentic Grainient texture) */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.038] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="grainient-film-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainient-film-noise)" />
      </svg>
    </div>
  );
}
