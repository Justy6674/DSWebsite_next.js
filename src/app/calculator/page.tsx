import { Metadata } from 'next';
import Calculator from '@/components/Calculator';

export const metadata: Metadata = {
  title: 'Calculator',
  description: 'Calculator page - Access and manage your content',
};

export default function CalculatorPage() {
  return <Calculator />;
}