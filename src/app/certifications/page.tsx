import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CertificationsInteractive from './components/CertificationsInteractive';

export const metadata: Metadata = {
  title: 'Certifications & Compliance - GreenBoy Industrial',
  description: 'Comprehensive regulatory compliance documentation with verified certifications from CPCB, ICAT, ARAI, and international standards. Transparent proof of quality systems and manufacturing excellence for power generation equipment.',
};

export default function CertificationsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <CertificationsInteractive />
      </main>
    </>
  );
}