import type { Metadata } from 'next';
import '@/styles/cinematic.css';
import { cineFontVars } from '@/components/cinematic/fonts';
import Splash from '@/components/cinematic/Splash';
import CustomCursor from '@/components/cinematic/CustomCursor';
import CineNav from '@/components/cinematic/CineNav';
import CineFooter from '@/components/cinematic/CineFooter';
import ProductSphere from '@/components/cinematic/ProductSphere';
import CineHero from './cine/CineHero';
import ProductLines from './cine/ProductLines';
import ComplianceCTA from './cine/ComplianceCTA';

export const metadata: Metadata = {
  title: 'Green Boy India — Certified Power, Engineered to Endure',
  description:
    'CPCB IV+ diesel engines, generator sets and retrofit emission control devices. Government-approved, OEM-trusted manufacturing from Sriperumbudur, Tamil Nadu.',
};

export default function Homepage() {
  return (
    <div className={`cine ${cineFontVars}`}>
      <Splash />
      <CustomCursor />
      <CineNav />
      <main>
        <CineHero />
        <ProductSphere />
        <ProductLines />
        <ComplianceCTA />
      </main>
      <CineFooter />
    </div>
  );
}
