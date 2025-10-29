import { Metadata } from 'next';
import SleepVideosClient from './SleepVideosClient';

export const metadata: Metadata = {
  title: 'Videos and Video Links | Sleep | Downscale',
  description: 'educational videos and tutorials.',
  robots: { index: false, follow: false },
};

export default function SleepVideosPage() {
  return <SleepVideosClient />;
}
