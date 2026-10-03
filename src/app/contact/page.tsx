import type { Metadata } from 'next';
import '@/styles/cinematic.css';
import { cineFontVars } from '@/components/cinematic/fonts';
import CustomCursor from '@/components/cinematic/CustomCursor';
import CineNav from '@/components/cinematic/CineNav';
import CineFooter from '@/components/cinematic/CineFooter';
import ContactCine from './cine/ContactCine';

export const metadata: Metadata = {
  title: 'Contact - Green Boy India',
  description:
    'Reach Green Boy India sales, compliance, operations, engineering, support and export teams. Plant at SIPCOT Industrial Park, Sriperumbudur, Chennai.',
};

export default function ContactPage() {
  return (
    <div className={`cine ${cineFontVars}`}>
      <CustomCursor />
      <CineNav />
      <main className="font-barlow">
        <ContactCine />
      </main>
      <CineFooter />
    </div>
  );
}
