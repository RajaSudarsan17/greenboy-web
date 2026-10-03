'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from './icons';
import { COMPANY, LOGO, MENU_LINKS, NAV_LINKS } from './data';

export default function CineNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-16">
        <Link href="/homepage" aria-label="Green Boy India home" className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="" className="h-9 w-9 object-contain" />
        </Link>

        <div className="liquid-glass rounded-full px-1.5 py-1.5 hidden md:flex items-center">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-white/90 font-barlow hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-1 flex items-center gap-1.5 rounded-full bg-[#6BAE4B] px-4 py-2 text-sm font-semibold text-[#06120a] font-barlow hover:bg-[#7cc25a] transition-colors"
          >
            {pathname === '/contact' ? 'Call Sales' : 'Request a Quote'}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="cine-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`cine-menu-btn liquid-glass h-12 w-12 rounded-full flex items-center justify-center ${open ? 'is-open' : ''}`}
        >
          <span className="bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </nav>

      <div id="cine-menu" className={`cine-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="flex flex-col items-center gap-1 text-center">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={`font-instrument italic text-[clamp(30px,7vw,72px)] leading-[1.08] tracking-[-1px] transition-[opacity,letter-spacing] duration-500 hover:opacity-100 hover:tracking-[0px] ${
                pathname === link.href ? 'opacity-100 text-[#9ed27f]' : 'opacity-55'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="absolute left-6 right-6 bottom-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-[12.5px] leading-[1.7] text-white/55 font-barlow">
          <span className="max-w-[46ch]">{COMPANY.address}</span>
          <span>
            {COMPANY.email} · {COMPANY.phone}
          </span>
        </div>
      </div>
    </>
  );
}
