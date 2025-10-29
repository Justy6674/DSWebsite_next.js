import { Metadata } from 'next';
import SleepResearchClient from './SleepResearchClient';

export const metadata: Metadata = {
  title: 'Research & Journal Articles | Sleep | Downscale',
  description: 'evidence-based research papers and peer-reviewed studies.',
  robots: { index: false, follow: false },
};

export default function SleepResearchPage() {
  return <SleepResearchClient />;
}
