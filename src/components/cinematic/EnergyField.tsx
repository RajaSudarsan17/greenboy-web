'use client';

import { useEffect, useRef } from 'react';

interface EnergyFieldProps {
  className?: string;
  /** 'hero' = brighter, denser flow; 'calm' = quieter background */
  variant?: 'hero' | 'calm';
}

/*
 * Generated background animation in the GreenBoy palette.
 * Sinuous "power lines" flow across the frame while sparks ride along them,
 * like current moving through a busbar. Fades in on first paint (500ms),
 * pauses offscreen, and renders one still frame under reduced motion.
 */
export default function EnergyField({ className = '', variant = 'hero' }: EnergyFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = variant === 'hero';
    const LINES = hero ? 26 : 16;
    const SPARKS = hero ? 70 : 36;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let shown = false;
    const start = performance.now();

    const sparks = Array.from({ length: SPARKS }, () => ({
      line: Math.floor(Math.random() * LINES),
      x: Math.random(),
      speed: 0.02 + Math.random() * 0.05,
      size: 0.6 + Math.random() * 1.6,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const lineY = (k: number, x: number, t: number) => {
      const band = hero ? 0.58 : 0.5;
      const spread = (k / LINES - 0.5) * (hero ? 0.5 : 0.7);
      return (
        h *
        (band +
          spread +
          0.09 * Math.sin(x * 0.0021 + t * 0.32 + k * 0.33) +
          0.05 * Math.sin(x * 0.0057 - t * 0.51 + k * 0.9) +
          0.025 * Math.sin(x * 0.011 + t * 0.8 + k * 1.7))
      );
    };

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);

      // drifting glows: brand green and charcoal-blue
      const gx = w * (0.5 + 0.22 * Math.sin(t * 0.11));
      const gy = h * (hero ? 0.62 : 0.5) + h * 0.06 * Math.cos(t * 0.17);
      const g1 = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.55);
      g1.addColorStop(0, hero ? 'rgba(107,174,75,0.30)' : 'rgba(107,174,75,0.18)');
      g1.addColorStop(0.45, 'rgba(39,174,96,0.07)');
      g1.addColorStop(1, 'rgba(6,11,8,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const hx = w * (0.2 + 0.1 * Math.cos(t * 0.09));
      const g2 = ctx.createRadialGradient(hx, h * 0.15, 0, hx, h * 0.15, Math.max(w, h) * 0.5);
      g2.addColorStop(0, 'rgba(52,73,94,0.35)');
      g2.addColorStop(1, 'rgba(6,11,8,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // power lines
      ctx.globalCompositeOperation = 'lighter';
      const step = Math.max(8, w / 140);
      for (let k = 0; k < LINES; k++) {
        const centre = 1 - Math.abs(k / (LINES - 1) - 0.5) * 2;
        const alpha = (hero ? 0.05 : 0.035) + centre * (hero ? 0.16 : 0.09);
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const y = lineY(k, x, t);
          if (x < 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${k % 5 === 0 ? '170,220,140' : '107,174,75'},${alpha.toFixed(3)})`;
        ctx.lineWidth = k % 5 === 0 ? 1.3 : 0.8;
        ctx.stroke();
      }

      // sparks travelling along the lines
      for (const s of sparks) {
        s.x += s.speed * (reduce ? 0 : 0.016);
        if (s.x > 1.05) {
          s.x = -0.05;
          s.line = Math.floor(Math.random() * LINES);
        }
        const x = s.x * w;
        const y = lineY(s.line, x, t);
        const r = s.size * 5;
        const sg = ctx.createRadialGradient(x, y, 0, x, y, r);
        sg.addColorStop(0, 'rgba(225,255,205,0.9)');
        sg.addColorStop(0.3, 'rgba(107,174,75,0.35)');
        sg.addColorStop(1, 'rgba(107,174,75,0)');
        ctx.fillStyle = sg;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }

      if (!shown) {
        shown = true;
        canvas.style.opacity = '1';
      }
      if (running && !reduce) raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) requestAnimationFrame(frame);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [variant]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ opacity: 0, transition: 'opacity 500ms ease-out' }}
    />
  );
}
