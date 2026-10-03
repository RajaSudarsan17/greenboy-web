export const EASE_OUT = 'easeOut' as const;

/** Shared blur-in used by every hero element */
export const blurIn = (delay = 0) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
});

/** Same blur-in, triggered when scrolled into view */
export const blurInView = (delay = 0) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
});
