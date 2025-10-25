import { Metadata } from 'next';
import FactsPage from '@/components/FactsPage';

export const metadata: Metadata = {
  title: 'Facts',
  description: 'Facts page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/facts',
  },
};

export default function FactsPagePage() {
  return <FactsPage />;
}