const ROCKET = 'https://img.rocket.new/generatedImages/';
const UNSPLASH = 'https://images.unsplash.com/';

export interface ArchiveShot {
  src: string;
  title: string;
  tag: string;
  note: string;
  tall?: boolean;
}

/* Product, plant and certification imagery already used across greenboy.co.in */
export const ARCHIVE: ArchiveShot[] = [
  { src: ROCKET + 'rocket_gen_img_1ffcc489c-1766472398367.png', title: 'GB-DG750 Diesel Engine', tag: 'Engines · 750 kW', note: 'Common-rail, 12.5 L six-cylinder engine for industrial duty, built to CPCB IV+ and certified by ICAT.' },
  { src: ROCKET + 'rocket_gen_img_1b5dddc0b-1767120189646.png', title: 'GB-GS500 Genset', tag: 'Gensets · 500 kVA', note: 'Continuous industrial power with integrated emission control and live monitoring of every run hour.' },
  { src: ROCKET + 'rocket_gen_img_1c89268f4-1767097185182.png', title: 'GB-RECD-300 Retrofit Kit', tag: 'RECD · up to 300 kW', note: 'Brings existing diesel engines up to current emission norms without replacing the engine.' },
  { src: UNSPLASH + 'photo-1655103955676-c9fbc4b65525', title: 'GB-DG1000 Heavy Duty', tag: 'Engines · 1000 kW', note: 'Turbocharged heavy-duty platform with extended service intervals for demanding sites.' },
  { src: ROCKET + 'rocket_gen_img_1f096dab0-1764900225012.png', title: 'GB-GS1250 Prime Genset', tag: 'Gensets · 1250 kVA', note: 'Prime power for critical loads, with advanced load management and remote monitoring.' },
  { src: ROCKET + 'rocket_gen_img_1da356e10-1764701642630.png', title: 'Custom Hybrid System', tag: 'Custom · 500 kW + 250 kWh', note: 'Diesel generation paired with solar and battery storage, engineered around the site load profile.' },
  { src: ROCKET + 'rocket_gen_img_1c20823ba-1767354682797.png', title: 'CPCB IV+ Engine Series', tag: 'Engines · 10–100 HP', note: 'Advanced fuel injection and optimised combustion for the latest emission norms.' },
  { src: ROCKET + 'rocket_gen_img_13f130338-1765517574985.png', title: 'Industrial Genset Line', tag: 'Gensets · 25–500 kVA', note: 'Digital control panels, automatic load management and emission monitoring as standard.' },
  { src: ROCKET + 'rocket_gen_img_17d56a47d-1769176508016.png', title: 'RECD Emission Control', tag: 'Retrofit · up to 90% reduction', note: 'Catalytic after-treatment with digital sensors, installed in four to six hours.' },
  { src: ROCKET + 'rocket_gen_img_1b3af06b7-1767945942748.png', title: 'Production Floor', tag: 'Plant · Sriperumbudur', note: 'Automated assembly lines at the SIPCOT Industrial Park facility near Chennai.', tall: true },
  { src: ROCKET + 'rocket_gen_img_12ca42259-1768404767489.png', title: 'Emission Control Systems', tag: 'Technology', note: 'After-treatment pipework and sensors engineered in-house for every engine family.' },
  { src: ROCKET + 'rocket_gen_img_188781ca2-1765292778598.png', title: 'Control Room', tag: 'Technology · Automation', note: 'Real-time production data and automation across every line on the plant floor.' },
  { src: ROCKET + 'rocket_gen_img_10c2d1099-1766856637004.png', title: 'Predictive Maintenance', tag: 'Technology · Analytics', note: 'Analytics that flag wear before it becomes downtime for gensets in the field.' },
  { src: ROCKET + 'rocket_gen_img_12c690231-1768279670922.png', title: 'Emission Test Lab', tag: 'Testing', note: 'Gas analysers verify every engine family against CPCB and BS-VI limits.' },
  { src: ROCKET + 'rocket_gen_img_11166b009-1768404767834.png', title: 'Dynamometer Bay', tag: 'Testing · Performance', note: 'Full-load performance runs on the dynamometer before any unit leaves the plant.' },
  { src: ROCKET + 'rocket_gen_img_1cb63d6e1-1766488665776.png', title: 'Emission Analysis', tag: 'Services · Testing', note: 'Independent emission testing for customer fleets and retrofit verification.' },
  { src: ROCKET + 'rocket_gen_img_1a8b829ff-1769176507481.png', title: 'Load Bank Testing', tag: 'Services · Performance', note: 'Load banks prove genset capacity and transient response under real conditions.' },
  { src: UNSPLASH + 'photo-1700257908436-058738972cd9', title: 'Acoustic Chamber', tag: 'Services · Noise', note: 'Acoustic enclosures are validated to keep gensets under 75 dB.' },
  { src: ROCKET + 'rocket_gen_img_1778e6054-1767923841535.png', title: 'CPCB Certification', tag: 'Compliance', note: 'Central Pollution Control Board type approval across our engine and genset ranges.' },
  { src: ROCKET + 'rocket_gen_img_15316b97b-1764664880203.png', title: 'ISO 9001:2015', tag: 'Compliance · Quality', note: 'Certified quality management across design, manufacturing and after-sales.' },
  { src: ROCKET + 'rocket_gen_img_1b19cf8a1-1766573063668.png', title: 'BS-VI Compliance', tag: 'Compliance · Emissions', note: 'Emission compliance documented for every unit we ship.' },
];

export const PRODUCT_LINES = [
  {
    title: 'Diesel Engines',
    icon: 'engine' as const,
    tags: ['10–1000 kW', 'CPCB IV+', 'Common Rail', 'ICAT'],
    image: ROCKET + 'rocket_gen_img_1ffcc489c-1766472398367.png',
    alt: 'GB-DG750 industrial diesel engine with silver metallic finish',
    model: 'GB-DG750 · GB-DG1000',
    body: 'High-output industrial engines with advanced fuel injection and optimised combustion, built for emission compliance, fuel economy and long service intervals.',
  },
  {
    title: 'Generator Sets',
    icon: 'bolt' as const,
    tags: ['25–1250 kVA', '24/7 Prime', 'Remote Monitoring', 'ARAI'],
    image: ROCKET + 'rocket_gen_img_1b5dddc0b-1767120189646.png',
    alt: 'GB-GS500 industrial generator set with green housing and control panel',
    model: 'GB-GS500 · GB-GS1250',
    body: 'Continuous and standby power with integrated emission control, automatic load management and live telemetry for plants that cannot go dark.',
  },
  {
    title: 'Retrofit RECD',
    icon: 'leaf' as const,
    tags: ['Up to 90% Cut', 'Universal Fit', '4–6 hr Install', 'CPCB'],
    image: ROCKET + 'rocket_gen_img_1c89268f4-1767097185182.png',
    alt: 'GB-RECD-300 stainless steel retrofit emission control device',
    model: 'GB-RECD-300',
    body: 'Retrofit emission control devices that bring existing diesel fleets up to current norms with no engine replacement and minimal downtime.',
  },
];

export const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
];

export const MENU_LINKS = [
  { label: 'Home', href: '/homepage' },
  { label: 'Products', href: '/products' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Services', href: '/services' },
  { label: 'Production Series', href: '/production-movie-series' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const TRUST_MARKS = ['CPCB', 'ARAI', 'ICAT', 'ISO 9001', 'BS-VI'];

export const COMPANY = {
  name: 'Green Boy India Private Limited',
  address: 'Plot No. 45, SIPCOT Industrial Park, Phase II, Sriperumbudur, Chennai - 602105, Tamil Nadu, India',
  phone: '+91 99528 23148',
  email: 'sales@greenboy.co.in',
  mapUrl: 'https://www.google.com/maps?q=12.9716,80.2595',
};

export const LOGO = '/assets/images/ChatGPT_Image_Dec_21__2025__01_54_30_PM-removebg-preview-1769177051122.png';
