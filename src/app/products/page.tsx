import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProductsInteractive from './components/ProductsInteractive';

export const metadata: Metadata = {
  title: 'Products - GreenBoy Industrial',
  description: 'Explore our comprehensive product engineering catalog featuring Engines, Gensets, RECD, and Custom solutions with detailed technical specifications, compliance mapping, and comparison tools for industrial power generation needs.',
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProductsInteractive />
    </main>
  );
}