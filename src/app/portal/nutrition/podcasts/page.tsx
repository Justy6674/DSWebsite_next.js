import { Metadata } from 'next';
import NutritionPodcastsClient from './NutritionPodcastsClient';

export const metadata: Metadata = {
  title: 'Podcast Links | Nutrition Education | Downscale',
  description: 'Expert interviews and educational podcasts on nutrition and dietary management.',
  robots: { index: false, follow: false },
};

export default function NutritionPodcastsPage() {
  return <NutritionPodcastsClient />;
}

