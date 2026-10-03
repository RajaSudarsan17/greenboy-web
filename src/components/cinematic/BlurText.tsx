'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  justify?: 'center' | 'flex-start';
}

export default function BlurText({ text, className, as: Tag = 'p', delay = 0, justify = 'center' }: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = { filter: 'blur(10px)', opacity: 0, y: 50 };
  const shown = { filter: 'blur(0px)', opacity: 1, y: 0 };

  return (
    <Tag ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: justify, rowGap: '0.1em' }}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={hidden}
          animate={inView ? shown : hidden}
          transition={{ duration: 0.7, delay: delay + i * 0.1, ease: 'easeOut' }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
