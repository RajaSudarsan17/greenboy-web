'use client';

import { useEffect, useRef } from 'react';

/* Design-1 cursor dot: lerped follower that widens over interactive targets */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const dot = ref.current;
    if (!dot) return;
    let mx = -100;
    let my = -100;
    let x = -100;
    let y = -100;
    let seen = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      mx = e.clientX;
      my = e.clientY;
      if (!seen) {
        seen = true;
        x = mx;
        y = my;
        dot.classList.add('on');
      }
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      dot.classList.toggle('wide', !!t?.closest?.('a, button, [data-cursor], input, select, textarea, label'));
    };
    const onLeave = () => {
      seen = false;
      dot.classList.remove('on');
    };
    const loop = () => {
      x += (mx - x) * 0.2;
      y += (my - y) * 0.2;
      dot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="cine-dot" aria-hidden="true" />;
}
