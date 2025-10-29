import { Metadata } from 'next';
import NutritionOtherClient from './NutritionOtherClient';

export const metadata: Metadata = {
  title: 'Other Nutrition Resources | Downscale',
  description: 'Additional resources and tools for nutrition support and management.',
  robots: { index: false, follow: false },
};

export default function NutritionOtherPage() {
  return <NutritionOtherClient />;
}

