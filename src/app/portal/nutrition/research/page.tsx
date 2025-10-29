import { Metadata } from 'next';
import NutritionResearchClient from './NutritionResearchClient';

export const metadata: Metadata = {
  title: 'Research & Journal Articles | Nutrition Studies | Downscale',
  description: 'Evidence-based research papers and journal articles on nutrition, meal planning, and dietary interventions.',
  robots: { index: false, follow: false },
};

export default function NutritionResearchPage() {
  return <NutritionResearchClient />;
}
