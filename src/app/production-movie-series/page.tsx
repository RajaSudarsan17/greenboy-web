import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProductionSeriesInteractive from './components/ProductionSeriesInteractive';

export const metadata: Metadata = {
  title: 'Production Movie Series - GreenBoy Industrial',
  description: 'Experience unprecedented transparency in industrial manufacturing through our cinematic production documentation series. Watch complete manufacturing processes from raw materials to certified engines with season-based episodes covering machining, assembly, testing, and quality control.',
};

export default function ProductionMovieSeriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <ProductionSeriesInteractive />
      </main>
    </div>
  );
}