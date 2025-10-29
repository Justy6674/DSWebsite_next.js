import { Metadata } from 'next';
import ActivityToolsClient from './ActivityToolsClient';

export const metadata: Metadata = {
  title: 'Tools | Activity | Downscale',
  description: 'interactive calculators and assessments.',
  robots: { index: false, follow: false },
};

export default function ActivityToolsPage() {
  return <ActivityToolsClient />;
}
