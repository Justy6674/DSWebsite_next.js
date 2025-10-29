import { Metadata } from 'next';
import WaterGuidesClient from './WaterGuidesClient';

export const metadata: Metadata = {
  title: 'Guides | Water | Downscale',
  description: 'step-by-step educational guides and instructions.',
  robots: { index: false, follow: false },
};

export default function WaterGuidesPage() {
  return <WaterGuidesClient />;
}
