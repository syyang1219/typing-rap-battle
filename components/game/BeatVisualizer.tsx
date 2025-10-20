"use client";

import { useEffect, useRef, useCallback } from "react";

interface BeatVisualizerProps {
  bpm: number;
  isPlaying: boolean;
}

export default function BeatVisualizer({ bpm, isPlaying }: BeatVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const barsRef = useRef<number[]>([]);
  const lastBeatTimeRef = useRef<number>(0);

  // Calculate beat interval in milliseconds
  const beatInterval = (60 / bpm) * 1000;

  // Initialize bars with random heights
  const initializeBars = useCallback(() => {
    const barCount = 12;
    barsRef.current = Array.from({ length: barCount }, () => Math.random() * 0.3 + 0.1);
  }, []);

  // Helper function to draw rounded rectangle
  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Animate bars
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const barCount = barsRef.current.length;
    const barWidth = width / barCount;
    const maxBarHeight = height * 0.8;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate time since last beat
    const now = performance.now();
    const timeSinceLastBeat = now - lastBeatTimeRef.current;
    const beatProgress = Math.min(timeSinceLastBeat / beatInterval, 1);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#8B5CF6"); // purple-500
    gradient.addColorStop(0.5, "#A855F7"); // purple-600
    gradient.addColorStop(1, "#EC4899"); // pink-500

    // Draw bars
    barsRef.current.forEach((baseHeight, index) => {
      let barHeight = baseHeight;

      if (isPlaying) {
        // Calculate animation based on beat progress and bar position
        const barPhase = (index / barCount) * Math.PI * 2;
        const beatIntensity = Math.sin(beatProgress * Math.PI) * 0.5 + 0.5;
        const waveIntensity = Math.sin(beatProgress * Math.PI * 4 + barPhase) * 0.3 + 0.7;

        // Add some randomness for more organic feel
        const randomFactor = 0.8 + Math.random() * 0.4;

        barHeight = baseHeight * beatIntensity * waveIntensity * randomFactor;
      }

      const x = index * barWidth + barWidth * 0.1;
      const barWidthActual = barWidth * 0.8;
      const y = height - barHeight * maxBarHeight;
      const barHeightActual = barHeight * maxBarHeight;

      // Draw bar with rounded corners
      ctx.fillStyle = gradient;
      drawRoundedRect(ctx, x, y, barWidthActual, barHeightActual, 4);
      ctx.fill();

      // Add subtle glow effect
      ctx.shadowColor = "#EC4899";
      ctx.shadowBlur = 8;
      ctx.fillStyle = gradient;
      drawRoundedRect(ctx, x, y, barWidthActual, barHeightActual, 4);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Check if it's time for a new beat
    if (isPlaying && timeSinceLastBeat >= beatInterval) {
      lastBeatTimeRef.current = now;
      // Slightly randomize bar heights on each beat
      barsRef.current = barsRef.current.map(() => Math.random() * 0.4 + 0.2);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying, beatInterval]);

  // Start/stop animation
  useEffect(() => {
    if (isPlaying) {
      lastBeatTimeRef.current = performance.now();
      initializeBars();
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Reset bars to low height when not playing
      barsRef.current = barsRef.current.map(() => 0.1);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate, initializeBars]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: "transparent",
          filter: "drop-shadow(0 0 10px rgba(236, 72, 153, 0.3))",
        }}
      />
    </div>
  );
}
