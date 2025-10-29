import { Metadata } from 'next';
import ActivityResearchClient from './ActivityResearchClient';

export const metadata: Metadata = {
  title: 'Research & Journal Articles | Activity | Downscale',
  description: 'evidence-based research papers and peer-reviewed studies.',
  robots: { index: false, follow: false },
};

export default function ActivityResearchPage() {
  return <ActivityResearchClient />;
}
