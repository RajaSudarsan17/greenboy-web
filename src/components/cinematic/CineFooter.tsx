import Link from 'next/link';
import { COMPANY, LOGO, MENU_LINKS } from './data';

export default function CineFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050906] px-6 md:px-16 lg:px-20 pt-16 pb-10 font-barlow">
      <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Green Boy India logo" className="h-12 w-12 object-contain" />
            <span className="font-instrument italic text-3xl tracking-[-1px]">Green Boy India</span>
          </div>
          <p className="max-w-[40ch] text-sm font-light leading-relaxed text-white/70">
            CPCB-compliant diesel engines, generator sets and retrofit emission control devices, designed and built in Tamil Nadu.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-white/45">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/80">
            {MENU_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#9ed27f] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-white/80 leading-relaxed">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-white/45">Plant</p>
          <p className="max-w-[36ch] text-white/70">{COMPANY.address}</p>
          <p className="mt-3">
            <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-[#9ed27f] transition-colors">
              {COMPANY.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${COMPANY.email}`} className="hover:text-[#9ed27f] transition-colors">
              {COMPANY.email}
            </a>
          </p>
        </div>
      </div>
      <div className="mt-14 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
        <p>ISO 9001:2015 · CPCB · ARAI · ICAT</p>
      </div>
    </footer>
  );
}
