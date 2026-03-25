import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import TechnologiesInteractive from './components/TechnologiesInteractive';

export const metadata: Metadata = {
  title: 'Technologies - GreenBoy Industrial',
  description: 'Advanced emission control systems, hybrid power solutions, AI-powered monitoring, and industrial automation technologies. Explore our R&D capabilities, testing facilities, and engineering innovations in sustainable power generation.',
};

export default function TechnologiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <TechnologiesInteractive />
      </div>
    </main>
  );
}