import Link from 'next/link';

const nav = [
  { href: '/homepage', label: 'Home' },
  { href: '/technologies', label: 'Technologies' },
  { href: '/products', label: 'Products' },
  { href: '/production-movie-series', label: 'Production' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/homepage" className="font-headline text-sm tracking-wide">
          <span className="text-text-primary">GreenBoy</span>
          <span className="text-text-secondary"> Industrial</span>
        </Link>

        <nav className="hidden gap-5 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

