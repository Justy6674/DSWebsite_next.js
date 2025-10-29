import { Metadata } from 'next';
import WaterResearchClient from './WaterResearchClient';

export const metadata: Metadata = {
  title: 'Research & Journal Articles | Water | Downscale',
  description: 'evidence-based research papers and peer-reviewed studies.',
  robots: { index: false, follow: false },
};

export default function WaterResearchPage() {
  return <WaterResearchClient />;
}
