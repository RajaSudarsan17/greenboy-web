'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import EnergyField from '@/components/cinematic/EnergyField';
import { blurInView } from '@/components/cinematic/motion';
import { ArrowUpRight, LINE_ICONS } from '@/components/cinematic/icons';
import { PRODUCT_LINES } from '@/components/cinematic/data';

export default function ProductLines() {
  return (
    <section id="products" className="relative min-h-screen overflow-hidden">
      <EnergyField variant="calm" className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-t from-transparent to-[#060b08] z-0" aria-hidden="true" />

      <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-24 pb-16 flex flex-col min-h-screen">
        <motion.header {...blurInView()} className="mb-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-sm font-barlow text-white/80 mb-6">// Product Lines</p>
            <h2 className="font-instrument italic text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
              Power systems,
              <br />
              built end to end
            </h2>
          </div>
          <Link href="/products" className="liquid-glass-strong self-start md:self-auto rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium font-barlow">
            Full catalogue
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.header>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCT_LINES.map(({ title, icon, tags, image, alt, model, body }, i) => {
            const Icon = LINE_ICONS[icon];
            return (
              <motion.article key={title} {...blurInView(0.15 * i)} className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="liquid-glass h-11 w-11 shrink-0 rounded-[0.75rem] flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#9ed27f]" />
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-barlow whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/products" className="flex-1 my-6 group relative overflow-hidden rounded-[0.9rem] min-h-[190px] bg-gradient-to-br from-[#12251a] to-[#0a120d]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={alt}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                    className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <span className="absolute left-3 bottom-3 text-[11px] font-barlow tracking-wide text-white/90">{model}</span>
                </Link>

                <h3 className="font-instrument italic text-3xl md:text-4xl tracking-[-1px] leading-none">{title}</h3>
                <p className="mt-3 text-sm text-white/85 font-barlow font-light leading-snug max-w-[34ch]">{body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
