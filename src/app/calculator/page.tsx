import { Metadata } from 'next';
import Calculator from '@/components/medical/Calculator';

export const metadata: Metadata = {
  title: 'Calculator',
  description: 'Calculator page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/calculator',
  },
};

export default function CalculatorPage() {
  return <Calculator />;
}