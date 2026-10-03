'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import BlurText from '@/components/cinematic/BlurText';
import { blurInView } from '@/components/cinematic/motion';
import { ArrowUpRight, PhoneIcon } from '@/components/cinematic/icons';
import { COMPANY } from '@/components/cinematic/data';

const CERTS = [
  { mark: 'CPCB', title: 'Type Approval', body: 'Central Pollution Control Board approval for engines and gensets.' },
  { mark: 'ARAI', title: 'Homologation', body: 'Automotive Research Association of India performance and emission validation.' },
  { mark: 'ICAT', title: 'Certification', body: 'International Centre for Automotive Technology test certification.' },
  { mark: 'ISO 9001', title: 'Quality System', body: 'ISO 9001:2015 quality management from design to after-sales.' },
];

export default function ComplianceCTA() {
  return (
    <section className="relative overflow-hidden px-6 md:px-16 lg:px-20 py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(107,174,75,0.22) 0%, rgba(6,11,8,0) 70%)' }}
      />
      <div className="relative z-10">
        <motion.div {...blurInView()}>
          <p className="text-sm font-barlow text-white/80 mb-6">// Compliance</p>
          <h2 className="font-instrument italic text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.92] tracking-[-2px] max-w-[14ch]">
            Certified before it ever ships
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTS.map((c, i) => (
            <motion.div key={c.mark} {...blurInView(0.1 * i)} className="liquid-glass rounded-[1.25rem] p-6 flex flex-col gap-6">
              <span className="font-instrument italic text-4xl tracking-[-1px] leading-none text-[#9ed27f]">{c.mark}</span>
              <div>
                <p className="font-barlow font-medium text-white">{c.title}</p>
                <p className="mt-1 text-sm font-barlow font-light text-white/75 leading-snug">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-28 flex flex-col items-center text-center">
          <BlurText
            as="h2"
            text="Tell us the load. We will engineer the power."
            className="font-instrument italic text-5xl md:text-6xl lg:text-[5rem] leading-[0.9] tracking-[-2px] md:tracking-[-3px] max-w-4xl"
          />
          <motion.div {...blurInView(0.4)} className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <Link href="/contact" className="rounded-full bg-[#6BAE4B] px-6 py-3 flex items-center gap-2 text-sm font-semibold text-[#06120a] font-barlow hover:bg-[#7cc25a] transition-colors">
              Request a Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="liquid-glass-strong rounded-full px-5 py-3 flex items-center gap-2 text-sm font-medium font-barlow">
              <PhoneIcon className="h-4 w-4 text-[#9ed27f]" />
              {COMPANY.phone}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
