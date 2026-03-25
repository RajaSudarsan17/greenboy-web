import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ContactInteractive from './components/ContactInteractive';

export const metadata: Metadata = {
  title: 'Contact - Green Boy India',
  description: 'Professional inquiry routing for Government Procurement, OEM Partnerships, Export Relations, and Technical Consultations. Multi-channel communication hub with department-specific contact channels for Sales, Compliance, Operations, Technical Engineering, After-Sales Support, and Export services.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <ContactInteractive />
      </div>
    </main>
  );
}