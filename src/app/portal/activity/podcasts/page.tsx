import { Metadata } from 'next';
import ActivityPodcastsClient from './ActivityPodcastsClient';

export const metadata: Metadata = {
  title: 'Podcast Links | Activity | Downscale',
  description: 'expert interviews and educational podcasts.',
  robots: { index: false, follow: false },
};

export default function ActivityPodcastsPage() {
  return <ActivityPodcastsClient />;
}
