import { Metadata } from 'next';
import MentalHealthGoalSettingPodcastsClient from './MentalHealthGoalSettingPodcastsClient';

export const metadata: Metadata = {
  title: 'Podcast Links | Mental Health / Goal Setting | Downscale',
  description: 'expert interviews and educational podcasts.',
  robots: { index: false, follow: false },
};

export default function MentalHealthGoalSettingPodcastsPage() {
  return <MentalHealthGoalSettingPodcastsClient />;
}
