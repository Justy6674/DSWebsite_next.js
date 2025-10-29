import { Metadata } from 'next';
import ActivityGuidesClient from './ActivityGuidesClient';

export const metadata: Metadata = {
  title: 'Guides | Activity | Downscale',
  description: 'step-by-step educational guides and instructions.',
  robots: { index: false, follow: false },
};

export default function ActivityGuidesPage() {
  return <ActivityGuidesClient />;
}
