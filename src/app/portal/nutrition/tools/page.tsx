import { Metadata } from 'next';
import NutritionToolsClient from './NutritionToolsClient';

export const metadata: Metadata = {
  title: 'Nutrition Tools | Calculators & Assessments | Downscale',
  description: 'Interactive calculators, meal planners, and nutrition tracking tools.',
  robots: { index: false, follow: false },
};

export default function NutritionToolsPage() {
  return <NutritionToolsClient />;
}

