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
  baseAlpha: number;
  alpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id = 'tsparticles',
  className = '',
  background = 'transparent',
  minSize = 0.6,
  maxSize = 1.6,
  particleDensity = 80,
  particleColor = '#FFFFFF',
  particleColors,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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

      // Re-seed particles proportionally to canvas surface area
      const area = (rect.width * rect.height) / 10000;
      const targetCount = Math.max(15, Math.floor((area * particleDensity) / 10));

      particles = [];
      for (let i = 0; i < targetCount; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          baseAlpha: Math.random() * 0.7 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          alphaSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1) * speed,
          vx: (Math.random() - 0.5) * 0.35 * speed,
          vy: (Math.random() * -0.4 - 0.1) * speed, // gently float upward
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

      // Clear or paint background
      if (background === 'transparent') {
        ctx.clearRect(0, 0, rect.width, rect.height);
      } else {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      // Draw each sparkle particle with soft radial glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Animate alpha (twinkle)
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.95 || p.alpha < 0.15) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Drift motion
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = rect.width;
        if (p.x > rect.width) p.x = 0;
        if (p.y < 0) p.y = rect.height;
        if (p.y > rect.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra twinkle cross on larger particles for premium diamond/sparkle effect
        if (p.size > 1.2 && p.alpha > 0.6) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 2, p.y);
          ctx.lineTo(p.x + p.size * 2, p.y);
          ctx.moveTo(p.x, p.y - p.size * 2);
          ctx.lineTo(p.x, p.y + p.size * 2);
          ctx.stroke();
        }

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
