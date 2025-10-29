import { Metadata } from 'next';
import SleepPodcastsClient from './SleepPodcastsClient';

export const metadata: Metadata = {
  title: 'Podcast Links | Sleep | Downscale',
  description: 'expert interviews and educational podcasts.',
  robots: { index: false, follow: false },
};

export default function SleepPodcastsPage() {
  return <SleepPodcastsClient />;
}
