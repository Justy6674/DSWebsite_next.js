import { Metadata } from 'next';
import NutritionGuidesClient from './NutritionGuidesClient';

export const metadata: Metadata = {
  title: 'Nutrition Guides | Meal Plans & Dietary Resources | Downscale',
  description: 'Step-by-step nutrition guides, meal planning resources, and dietary protocols.',
  robots: { index: false, follow: false },
};

export default function NutritionGuidesPage() {
  return <NutritionGuidesClient />;
}

