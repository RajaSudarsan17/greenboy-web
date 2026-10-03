'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import EnergyField from '@/components/cinematic/EnergyField';
import BlurText from '@/components/cinematic/BlurText';
import { blurIn } from '@/components/cinematic/motion';
import { ArrowUpRight, ClockIcon, Play, ShieldCheckIcon } from '@/components/cinematic/icons';
import { TRUST_MARKS } from '@/components/cinematic/data';

const STATS = [
  { Icon: ClockIcon, value: '48 hrs', label: 'Average Lead Time on Standard Units' },
  { Icon: ShieldCheckIcon, value: '99.8%', label: 'Quality Pass Rate Across Every Line' },
];

export default function CineHero() {
  return (
    <section className="relative min-h-[100svh] md:h-screen md:min-h-[720px] overflow-hidden">
      <EnergyField variant="hero" className="absolute inset-0 h-full w-full z-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#060b08] z-0" aria-hidden="true" />

      <div className="relative z-10 flex flex-col min-h-[100svh] md:h-full">
        <div className="flex-1 flex flex-col items-center justify-center pt-28 px-4 text-center">
          <motion.div {...blurIn(0.4)} className="liquid-glass rounded-full flex items-center gap-2.5 pl-1.5 pr-4 py-1.5">
            <span className="rounded-full bg-[#6BAE4B] px-2.5 py-0.5 text-xs font-semibold text-[#06120a] font-barlow">New</span>
            <span className="text-sm text-white/90 font-barlow">CPCB IV+ engine series now shipping across India</span>
          </motion.div>

          <div className="mt-6 max-w-3xl">
            <BlurText
              as="h1"
              text="Certified Power Engineered to Outlast Every Load"
              className="text-[3.4rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-instrument italic text-white leading-[0.85] tracking-[-3px] md:tracking-[-4px]"
            />
          </div>

          <motion.p {...blurIn(0.8)} className="mt-5 text-sm md:text-base text-white/90 max-w-2xl font-barlow font-light leading-snug">
            Green Boy India designs and builds diesel engines, generator sets and retrofit emission control systems.
            Government-approved, OEM-trusted and tested to run around the clock.
          </motion.p>

          <motion.div {...blurIn(1.1)} className="mt-7 flex flex-wrap items-center justify-center gap-6">
            <Link href="/contact" className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium font-barlow hover:text-[#c9ecb4] transition-colors">
              Request a Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a href="#inside" className="flex items-center gap-2 text-sm font-medium font-barlow text-white/90 hover:text-white transition-colors">
              <Play className="h-3.5 w-3.5 text-[#9ed27f]" />
              Step Inside the Plant
            </a>
          </motion.div>

          <motion.div {...blurIn(1.3)} className="mt-9 flex justify-center gap-4">
            {STATS.map(({ Icon, value, label }) => (
              <div key={value} className="liquid-glass p-5 w-[calc(50vw-2rem)] max-w-[220px] md:w-[220px] rounded-[1.25rem] text-left">
                <Icon className="h-6 w-6 text-[#9ed27f]" />
                <div className="text-4xl font-instrument italic tracking-[-1px] leading-none mt-4">{value}</div>
                <div className="mt-2 text-xs text-white/75 font-barlow leading-snug">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div {...blurIn(1.4)} className="flex flex-col items-center gap-4 pt-8 pb-8 px-4">
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs md:text-sm text-white/90 font-barlow text-center">
            Certified by India&apos;s testing authorities and trusted by OEMs nationwide
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 sm:gap-12 md:gap-16">
            {TRUST_MARKS.map((mark) => (
              <span key={mark} className="font-instrument italic text-2xl md:text-3xl tracking-tight text-white/85">
                {mark}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
