import { Metadata } from 'next';
import NutritionProductsClient from './NutritionProductsClient';

export const metadata: Metadata = {
  title: 'Product Information | Nutrition Products | Downscale',
  description: 'Product details and recommendations for nutritional supplements and meal replacement products.',
  robots: { index: false, follow: false },
};

export default function NutritionProductsPage() {
  return <NutritionProductsClient />;
}

