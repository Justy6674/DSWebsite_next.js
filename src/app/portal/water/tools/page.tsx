import { Metadata } from 'next';
import WaterToolsClient from './WaterToolsClient';

export const metadata: Metadata = {
  title: 'Tools | Water | Downscale',
  description: 'interactive calculators and assessments.',
  robots: { index: false, follow: false },
};

export default function WaterToolsPage() {
  return <WaterToolsClient />;
}
