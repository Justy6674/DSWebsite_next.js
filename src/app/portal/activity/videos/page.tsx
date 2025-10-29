import { Metadata } from 'next';
import ActivityVideosClient from './ActivityVideosClient';

export const metadata: Metadata = {
  title: 'Videos and Video Links | Activity | Downscale',
  description: 'educational videos and tutorials.',
  robots: { index: false, follow: false },
};

export default function ActivityVideosPage() {
  return <ActivityVideosClient />;
}
