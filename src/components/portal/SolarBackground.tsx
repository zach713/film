import React, { useEffect, useRef } from 'react';
import { ThemePalette } from '../../themePalettes';

interface SolarBackgroundProps {
  currentTheme: ThemePalette;
}

export const SolarBackground: React.FC<SolarBackgroundProps> = ({ currentTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      // Deep dark canvas
      ctx.fillStyle = '#07080C';
      ctx.fillRect(0, 0, w, h);

      // Ambient solar corona glow in center
      const centerX = w / 2;
      const centerY = Math.min(h * 0.35, 320);

      // Radial atmosphere using theme primary & secondary
      const grad = ctx.createRadialGradient(centerX, centerY, 80, centerX, centerY, 520);
      grad.addColorStop(0, `${currentTheme.primary}25`);
      grad.addColorStop(0.5, `${currentTheme.secondary}15`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Floating solar flare particles
      for (let i = 0; i < 40; i++) {
        const x = (i * 97 + Math.sin(frame * 0.015 + i) * 40) % w;
        const y = (h - ((frame * 0.8 + i * 45) % h));
        const r = (Math.sin(frame * 0.02 + i) + 1.2) * 1.2;

        ctx.fillStyle =
          i % 3 === 0
            ? `${currentTheme.primary}66`
            : i % 3 === 1
            ? `${currentTheme.secondary}55`
            : 'rgba(251, 191, 36, 0.3)';

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentTheme]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10 w-full h-full" />;
};
