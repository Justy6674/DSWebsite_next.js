import { Metadata } from 'next';
import SleepToolsClient from './SleepToolsClient';

export const metadata: Metadata = {
  title: 'Tools | Sleep | Downscale',
  description: 'interactive calculators and assessments.',
  robots: { index: false, follow: false },
};

export default function SleepToolsPage() {
  return <SleepToolsClient />;
}
