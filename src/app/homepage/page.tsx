'use client';

import Header from '@/components/common/Header';
import { motion, useScroll, useTransform } from 'framer-motion';
import Homepage3D from './components/Homepage3D';

function Section({
  title,
  eyebrow,
  body,
}: {
  title: string;
  eyebrow: string;
  body: string;
}) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-28 md:py-32">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-[11px] uppercase tracking-[0.22em] text-text-secondary">{eyebrow}</div>
          <h2 className="mt-4 font-headline text-3xl md:text-4xl">{title}</h2>
        </div>
        <div className="md:col-span-7">
          <p className="max-w-prose text-sm leading-7 text-text-secondary">{body}</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-card/60 p-5 shadow-glow">
              <div className="text-xs text-text-secondary">Scroll</div>
              <div className="mt-1 text-sm">Drives the 3D camera + lights</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-card/60 p-5 shadow-glow">
              <div className="text-xs text-text-secondary">WebGL</div>
              <div className="mt-1 text-sm">Real-time 3D, lightweight geometry</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Homepage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="relative">
        <div className="pointer-events-none fixed inset-0 z-0">
          <Homepage3D scrollYProgress={scrollYProgress} />
        </div>

        <motion.section
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 mx-auto flex min-h-[100vh] max-w-6xl flex-col justify-center px-4 pt-16"
        >
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-text-secondary">
              Scroll-driven 3D website base
            </div>
            <h1 className="mt-5 font-headline text-4xl leading-tight md:text-6xl">
              Industrial storytelling with a real-time 3D layer.
            </h1>
            <p className="mt-6 max-w-prose text-sm leading-7 text-text-secondary">
              This is the foundation: smooth scroll sections + a WebGL scene that responds to scroll
              position. When you provide images later, we’ll replace the placeholder content and
              tune the scene to match your brand visuals.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#section-1"
                className="rounded-full border border-white/15 bg-card/70 px-5 py-2 text-xs text-text-primary backdrop-blur hover:border-white/25 transition-colors"
              >
                Explore
              </a>
              <a
                href="#section-3"
                className="rounded-full border border-white/10 px-5 py-2 text-xs text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors"
              >
                See scroll effects
              </a>
            </div>
          </div>
        </motion.section>

        <div className="relative z-10">
          <div id="section-1" />
          <Section
            eyebrow="Section 01"
            title="Parallax + depth"
            body="As you scroll, the 3D objects rotate and the camera subtly shifts to create a depth-driven parallax effect. This stays performant and works well as a background layer behind your content."
          />
          <div className="mx-auto max-w-6xl px-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div id="section-2" />
          <Section
            eyebrow="Section 02"
            title="Scroll-reveal motion"
            body="We can add per-section reveals (fade/slide), sticky moments, and timeline-based transitions. For now, the hero fades away and the 3D scene keeps evolving underneath."
          />
          <div className="mx-auto max-w-6xl px-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div id="section-3" />
          <Section
            eyebrow="Section 03"
            title="Ready for your assets"
            body="When you send images/models later, we’ll swap in your real media, match lighting/colors to your branding, and tune the scroll choreography so it feels premium and intentional."
          />

          <footer className="mx-auto max-w-6xl px-4 pb-20 pt-10 text-xs text-text-secondary">
            © {new Date().getFullYear()} GreenBoy Industrial
          </footer>
        </div>
      </div>
    </main>
  );
}

