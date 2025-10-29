import { Metadata } from 'next';
import NutritionVideosClient from './NutritionVideosClient';

export const metadata: Metadata = {
  title: 'Videos | Nutrition Education | Downscale',
  description: 'Educational videos on nutrition, meal preparation, and dietary strategies.',
  robots: { index: false, follow: false },
};

export default function NutritionVideosPage() {
  return <NutritionVideosClient />;
}

