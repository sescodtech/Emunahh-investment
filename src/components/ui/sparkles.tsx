import React, { useEffect, useRef } from 'react';

export interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  particleColors?: string[];
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id = 'tsparticles-subtle',
  className = '',
  background = 'transparent',
  minSize = 0.5,
  maxSize = 1.2,
  particleDensity = 25,
  particleColor = '#087A5A',
  particleColors,
  speed = 0.6,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = particleColors && particleColors.length > 0 ? particleColors : [particleColor];

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Controlled low-density particle count to prevent visual clutter
      const area = (rect.width * rect.height) / 10000;
      const targetCount = Math.max(8, Math.floor((area * particleDensity) / 12));

      particles = [];
      for (let i = 0; i < targetCount; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          alpha: Math.random() * 0.35 + 0.1, // Subtle financial opacity (0.1 to 0.45 max)
          alphaSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1) * speed,
          vx: (Math.random() - 0.5) * 0.15 * speed,
          vy: (Math.random() * -0.2 - 0.05) * speed, // extremely gentle floating
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);
    resizeCanvas();

    const render = () => {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();

      // Clear background
      if (background === 'transparent') {
        ctx.clearRect(0, 0, rect.width, rect.height);
      } else {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Soft breathing twinkle
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.45 || p.alpha < 0.08) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = rect.width;
        if (p.x > rect.width) p.x = 0;
        if (p.y < 0) p.y = rect.height;
        if (p.y > rect.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(0.5, p.alpha));
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [background, minSize, maxSize, particleDensity, particleColor, particleColors, speed]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={`pointer-events-none block ${className}`}
      style={{ background: background === 'transparent' ? 'transparent' : background }}
    />
  );
};
