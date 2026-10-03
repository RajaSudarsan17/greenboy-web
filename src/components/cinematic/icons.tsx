import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;
const base = { width: 24, height: 24, viewBox: '0 0 24 24', 'aria-hidden': true } as const;
const stroke = { ...base, fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const ArrowUpRight = (p: IconProps) => (
  <svg {...stroke} strokeWidth={2} {...p}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export const Play = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...stroke} strokeWidth={1.5} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <svg {...stroke} strokeWidth={1.5} {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const GlobeIcon = (p: IconProps) => (
  <svg {...stroke} strokeWidth={1.5} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...stroke} strokeWidth={1.5} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...stroke} strokeWidth={1.5} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...stroke} strokeWidth={1.5} {...p}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const GridIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

export const SphereIcon = (p: IconProps) => (
  <svg {...stroke} strokeWidth={1.5} {...p}>
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
    <path d="M3.5 9h17M3.5 15h17" />
  </svg>
);

/* Material-style filled icons for the product lines */
export const EngineIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M7 4v2h3v2H7l-2 2v3H3v-3H1v8h2v-3h2v3h3l2 2h8v-4h2v3h3V9h-3v3h-2V8h-6V6h3V4H7z" />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M6.05 8.05a7.007 7.007 0 0 0-.02 9.88c1.47-3.4 4.09-6.24 7.36-7.93-2.77 2.34-4.71 5.61-5.39 9.32 2.6 1.23 5.8.78 7.95-1.37C19.43 14.47 20 4 20 4S9.53 4.57 6.05 8.05z" />
  </svg>
);

export const LINE_ICONS = { engine: EngineIcon, bolt: BoltIcon, leaf: LeafIcon };
