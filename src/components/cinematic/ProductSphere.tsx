'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ARCHIVE } from './data';
import { GridIcon, SphereIcon } from './icons';

const N = ARCHIVE.length;
const GA = Math.PI * (3 - Math.sqrt(5));
const DEG = Math.PI / 180;
const HEADLINE = ['See', 'How', 'Power', 'Gets', 'Made'];

/* Fibonacci-sphere unit vectors, computed once */
const POINTS = ARCHIVE.map((_, i) => {
  const y = 1 - (i / (N - 1)) * 2;
  const rad = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = i * GA;
  const x = Math.cos(theta) * rad;
  const z = Math.sin(theta) * rad;
  return { x, y, z, lat: (Math.asin(y) * 180) / Math.PI, lon: (Math.atan2(x, z) * 180) / Math.PI };
});

type Source = { el: HTMLElement; idx: number };

export default function ProductSphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const plateRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<Source | null>(null);

  const [visible, setVisible] = useState(false);
  const [grid, setGrid] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);

  const cam = useRef({ R: 280, persp: 1100, spin: 0, tilt: -4, dragX: 0, dragY: 0, velX: 0, velY: 0, camZ: 0, dragging: false, focused: -1, kicked: false });
  const cache = useRef(ARCHIVE.map(() => ({ o: -1, d: -1 })));

  /* ---------- layout ---------- */
  const layout = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const w = section.clientWidth;
    const h = section.clientHeight;
    const hr = w <= 380 ? 0.36 : w <= 640 ? 0.4 : 0.44;
    const wr = w <= 380 ? 0.46 : w <= 640 ? 0.5 : 0.56;
    const floor = w <= 380 ? 108 : w <= 640 ? 120 : 155;
    const R = Math.max(floor, Math.min(460, h * hr, w * wr));
    const scale = w <= 380 ? 0.44 : w <= 640 ? 0.46 : 0.47;
    const cw = Math.round(Math.max(72, R * scale));
    const persp = w <= 380 ? 620 : w <= 640 ? 760 : w <= 900 ? 920 : 1150;
    cam.current.R = R;
    cam.current.persp = persp;
    section.style.setProperty('--persp', `${persp}px`);
    section.style.setProperty('--cw', `${cw}px`);
    POINTS.forEach((p, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      el.style.transform = `translate3d(${(p.x * R).toFixed(2)}px, ${(-p.y * R).toFixed(2)}px, ${(p.z * R).toFixed(2)}px) rotateY(${p.lon.toFixed(3)}deg) rotateX(${p.lat.toFixed(3)}deg)`;
    });
  }, []);

  useEffect(() => {
    layout();
    const section = sectionRef.current;
    if (!section) return;
    const ro = new ResizeObserver(() => layout());
    ro.observe(section);
    return () => ro.disconnect();
  }, [layout]);

  /* ---------- visibility ---------- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  /* ---------- camera loop (only while on screen) ---------- */
  useEffect(() => {
    if (!visible) return;
    const c = cam.current;
    if (!c.kicked) {
      c.kicked = true;
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) c.velX = 1.6;
    }
    let raf = 0;
    const frame = () => {
      const section = sectionRef.current;
      const world = worldRef.current;
      if (!section || !world) return;

      if (!c.dragging && c.focused < 0) {
        c.dragX += c.velX;
        c.dragY += c.velY;
        c.velX *= 0.94;
        c.velY *= 0.94;
        if (Math.abs(c.velX) < 0.002) c.velX = 0;
        if (Math.abs(c.velY) < 0.002) c.velY = 0;
      }
      const t = c.tilt + c.dragY;
      if (t > 32) c.dragY = 32 - c.tilt;
      else if (t < -32) c.dragY = -32 - c.tilt;

      // scroll dolly: forward as the section settles into view
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(0, Math.min(1, 1 - Math.abs(rect.top) / (vh * 0.5)));
      const target = p * Math.min(64, c.R * 0.12);
      c.camZ += (target - c.camZ) * 0.075;

      const sx = c.tilt + c.dragY;
      const sy = c.spin + c.dragX;
      world.style.transform = `translateZ(${c.camZ.toFixed(2)}px) rotateY(${sy.toFixed(3)}deg) rotateX(${sx.toFixed(3)}deg)`;

      const ca = Math.cos(sx * DEG);
      const sa = Math.sin(sx * DEG);
      const cb = Math.cos(sy * DEG);
      const sb = Math.sin(sy * DEG);
      const near = c.persp * 0.66;
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const pt = POINTS[i];
        const z1 = -pt.y * sa + pt.z * ca;
        const zf = -pt.x * sb + z1 * cb;
        const base = 0.14 + 0.86 * Math.pow((zf + 1) / 2, 0.85);
        let dim = 1 - base;
        const absZ = zf * c.R + c.camZ;
        let fade = absZ > near ? Math.max(0, 1 - (absZ - near) / 190) : 1;
        if (c.focused >= 0) {
          dim = Math.min(1, dim + 0.78);
          if (i === c.focused) fade = 0;
        }
        const o = Math.round(fade * 1000) / 1000;
        const d = Math.round(dim * 1000) / 1000;
        const prev = cache.current[i];
        if (o !== prev.o) {
          el.style.opacity = String(o);
          prev.o = o;
        }
        if (d !== prev.d) {
          el.style.setProperty('--d', String(d));
          prev.d = d;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  /* ---------- drag ---------- */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const c = cam.current;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const SLOP = coarse ? 14 : 6;
    let ptr: null | {
      id: number;
      card: HTMLElement | null;
      sx: number;
      sy: number;
      lx: number;
      ly: number;
      t: number;
      moved: number;
      captured: boolean;
      cancelled: boolean;
    } = null;

    const down = (e: PointerEvent) => {
      if (c.focused >= 0 || ptr) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const card = (e.target as Element).closest<HTMLElement>('.sphere-card');
      ptr = { id: e.pointerId, card, sx: e.clientX, sy: e.clientY, lx: e.clientX, ly: e.clientY, t: performance.now(), moved: 0, captured: false, cancelled: false };
      c.velX = c.velY = 0;
      if (e.pointerType !== 'touch') {
        try {
          stage.setPointerCapture(e.pointerId);
        } catch {}
        ptr.captured = true;
        c.dragging = true;
      }
    };
    const move = (e: PointerEvent) => {
      if (!ptr || e.pointerId !== ptr.id || ptr.cancelled) return;
      const tx = e.clientX - ptr.sx;
      const ty = e.clientY - ptr.sy;
      ptr.moved = Math.max(ptr.moved, Math.hypot(tx, ty));
      if (!c.dragging) {
        if (Math.hypot(tx, ty) < 10) return;
        if (Math.abs(ty) > Math.abs(tx) * 1.15) {
          ptr.cancelled = true;
          return;
        }
        try {
          stage.setPointerCapture(e.pointerId);
        } catch {}
        ptr.captured = true;
        c.dragging = true;
        ptr.lx = e.clientX;
        ptr.ly = e.clientY;
      }
      const dx = e.clientX - ptr.lx;
      const dy = e.clientY - ptr.ly;
      ptr.lx = e.clientX;
      ptr.ly = e.clientY;
      c.dragX += dx * 0.13;
      c.dragY -= dy * 0.13;
      c.velX = dx * 0.13;
      c.velY = -dy * 0.13;
      ptr.t = performance.now();
    };
    const end = (e: PointerEvent, cancel: boolean) => {
      if (!ptr || e.pointerId !== ptr.id) return;
      const p = ptr;
      ptr = null;
      if (performance.now() - p.t > 80) c.velX = c.velY = 0;
      c.dragging = false;
      if (p.captured) {
        try {
          stage.releasePointerCapture(e.pointerId);
        } catch {}
      }
      if (!cancel && !p.cancelled && p.moved < SLOP && p.card) {
        c.velX = c.velY = 0;
        openShot(Number(p.card.dataset.idx), p.card);
      }
    };
    const up = (e: PointerEvent) => end(e, false);
    const cancelFn = (e: PointerEvent) => end(e, true);
    const noDrag = (e: Event) => e.preventDefault();

    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', cancelFn);
    stage.addEventListener('dragstart', noDrag);
    return () => {
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerup', up);
      stage.removeEventListener('pointercancel', cancelFn);
      stage.removeEventListener('dragstart', noDrag);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- lightbox (FLIP from the clicked card) ---------- */
  const openShot = (idx: number, el: HTMLElement) => {
    sourceRef.current = { el, idx };
    cam.current.focused = idx;
    setClosing(false);
    setActive(idx);
  };

  const flipTransform = (from: HTMLElement | null) => {
    const plate = plateRef.current;
    if (!plate || !from) return null;
    const shot = plate.querySelector<HTMLElement>('.lb-shot');
    const src = from.getBoundingClientRect();
    if (!shot || !src.width) return null;
    const P = plate.getBoundingClientRect();
    const S = shot.getBoundingClientRect();
    plate.style.transformOrigin = `${P.width / 2}px ${S.top - P.top + S.height / 2}px`;
    const dx = src.left + src.width / 2 - (S.left + S.width / 2);
    const dy = src.top + src.height / 2 - (S.top + S.height / 2);
    const k = Math.max(0.04, src.width / S.width);
    return `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${k.toFixed(4)})`;
  };

  useLayoutEffect(() => {
    if (active === null || closing) return;
    const plate = plateRef.current;
    const from = flipTransform(sourceRef.current?.el ?? null);
    if (plate && from) {
      plate.animate([{ transform: from, opacity: 0 }, { transform: 'none', opacity: 1 }], {
        duration: 620,
        easing: 'cubic-bezier(.22,.61,.36,1)',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const closeShot = useCallback(() => {
    if (active === null || closing) return;
    const idx = active;
    cam.current.focused = -1;
    setClosing(true);
    const target = grid ? gridRefs.current[idx] : cardRefs.current[idx];
    const plate = plateRef.current;
    const to = flipTransform(target ?? null);
    const finish = () => {
      setActive(null);
      setClosing(false);
    };
    if (plate && to) {
      const anim = plate.animate([{ transform: 'none', opacity: 1 }, { transform: to, opacity: 0 }], {
        duration: 560,
        easing: 'cubic-bezier(.22,.61,.36,1)',
        fill: 'forwards',
      });
      anim.onfinish = finish;
    } else finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, closing, grid]);

  useEffect(() => {
    if (active === null) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeShot();
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [active, closeShot]);

  const shot = active !== null ? ARCHIVE[active] : null;

  return (
    <section
      ref={sectionRef}
      id="inside"
      aria-label="Inside Green Boy India: products, plant and certifications"
      className={`sphere-section ${visible ? 'is-visible' : ''} ${grid ? 'is-grid' : ''} ${active !== null && !closing ? 'is-lit' : ''}`}
    >
      <div ref={stageRef} className="sphere-stage">
        <div ref={worldRef} className="sphere-world">
          <div className="sphere-orb">
            {ARCHIVE.map((s, i) => (
              <div
                key={s.src}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-idx={i}
                data-cursor
                className={`sphere-card ${s.tall ? 'tall' : ''}`}
              >
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={s.title}
                    draggable={false}
                    decoding="async"
                    onLoad={(e) => e.currentTarget.classList.add('in')}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
        <h2 ref={headRef} className="sphere-headline font-instrument">
          <span className="inner">
            {HEADLINE.map((w, i) => (
              <span key={w} style={{ ['--i' as string]: i }}>
                {w}
              </span>
            ))}
          </span>
        </h2>
      </div>
      <div className="sphere-vig" aria-hidden="true" />

      <div className="pointer-events-none absolute top-24 left-6 md:left-16 lg:left-20 z-20 font-barlow">
        <p className="text-sm text-white/80">// Inside Green Boy</p>
        <p className="mt-1 text-xs text-white/50">{N} frames · products, plant, testing, compliance</p>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-16 lg:px-20 font-barlow">
        <span className={`sphere-cue hidden sm:flex ${grid ? 'opacity-0' : ''}`} aria-hidden="true">
          <s />
          Drag to rotate · tap a frame
        </span>
        <button
          type="button"
          onClick={() => setGrid((g) => !g)}
          className="liquid-glass ml-auto whitespace-nowrap rounded-full px-4 py-2.5 flex items-center gap-2 text-sm text-white/90 hover:text-white"
          aria-pressed={grid}
        >
          {grid ? <SphereIcon className="h-4 w-4" /> : <GridIcon className="h-4 w-4" />}
          {grid ? 'Back to sphere' : 'View as grid'}
        </button>
      </div>

      <div className="sphere-grid" aria-hidden={!grid}>
        <div className="rows">
          {ARCHIVE.map((s, i) => (
            <button
              type="button"
              key={s.src}
              tabIndex={grid ? 0 : -1}
              ref={(el) => {
                gridRefs.current[i] = el;
              }}
              onClick={(e) => openShot(i, e.currentTarget)}
              className="grid-fig"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.title} loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <span className="cap font-instrument">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {shot && (
        <div className={`sphere-lit ${closing ? 'closing' : ''}`} role="dialog" aria-modal="true" aria-label={shot.title}>
          <div className="scrim" onClick={closeShot} />
          <div ref={plateRef} className="plate">
            <div className="lb-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={shot.title} onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
              <button type="button" onClick={closeShot} className="lb-close font-barlow">
                Close
              </button>
            </div>
            <div className="lb-meta font-barlow">
              <div>
                <h3 className="font-instrument italic text-[clamp(22px,2.15vw,32px)] leading-[1.08] tracking-[-0.01em] mb-1.5">{shot.title}</h3>
                <p className="text-[13px] text-white/60">{shot.tag}</p>
              </div>
              <p className="text-[13.5px] leading-[1.55] text-white/90 font-light">{shot.note}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
