import { Metadata } from 'next';
import SleepGuidesClient from './SleepGuidesClient';

export const metadata: Metadata = {
  title: 'Guides | Sleep | Downscale',
  description: 'step-by-step educational guides and instructions.',
  robots: { index: false, follow: false },
};

export default function SleepGuidesPage() {
  return <SleepGuidesClient />;
}
