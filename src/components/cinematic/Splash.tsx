'use client';

import { useEffect, useRef, useState } from 'react';

const KEY = 'gb-splash-seen';

/* Design-1 splash: wordmark, load bar, tagline. Shown once per browser session. */
export default function Splash() {
  const [state, setState] = useState<'show' | 'out' | 'gone'>('show');
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {}
    if (seen) {
      setState('gone');
      return;
    }

    const born = performance.now();
    const imgs = Array.from(document.images);
    const total = imgs.length + 1;
    let loaded = 0;
    let done = false;
    const setBar = (v: number) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, v)})`;
    };
    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, 1150 - (performance.now() - born));
      setTimeout(() => {
        setBar(1);
        setTimeout(() => {
          setState('out');
          try {
            sessionStorage.setItem(KEY, '1');
          } catch {}
          setTimeout(() => setState('gone'), 950);
        }, 420);
      }, wait);
    };
    const tick = () => {
      loaded++;
      setBar(loaded / total);
      if (loaded >= total) finish();
    };

    imgs.forEach((img) => {
      if (img.complete) tick();
      else {
        img.addEventListener('load', tick, { once: true });
        img.addEventListener('error', tick, { once: true });
      }
    });
    if (document.fonts?.ready) document.fonts.ready.then(tick, tick);
    else tick();
    const backstop = setTimeout(finish, 4500);
    return () => clearTimeout(backstop);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = state === 'show' ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [state]);

  if (state === 'gone') return null;
  return (
    <div className={`cine-splash ${state === 'out' ? 'out' : ''}`} aria-hidden="true">
      <div className="mark font-instrument">
        Green<em>Boy</em>
      </div>
      <div className="bar">
        <span ref={barRef} />
      </div>
      <div className="tag font-barlow">Industrial Power Systems · India</div>
    </div>
  );
}
