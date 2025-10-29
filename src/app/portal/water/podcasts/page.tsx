import { Metadata } from 'next';
import WaterPodcastsClient from './WaterPodcastsClient';

export const metadata: Metadata = {
  title: 'Podcast Links | Water | Downscale',
  description: 'expert interviews and educational podcasts.',
  robots: { index: false, follow: false },
};

export default function WaterPodcastsPage() {
  return <WaterPodcastsClient />;
}
