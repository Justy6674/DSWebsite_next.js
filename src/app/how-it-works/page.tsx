import { Metadata } from 'next';
import HowItWorks from '@/components/HowItWorks';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'How It Works page - Access and manage your content',
};

export default function HowItWorksPage() {
  return <HowItWorks />;
}