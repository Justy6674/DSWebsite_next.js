import { Metadata } from 'next';
import PricingPage from '@/components/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pricing page - Access and manage your content',
};

export default function PricingPagePage() {
  return <PricingPage />;
}