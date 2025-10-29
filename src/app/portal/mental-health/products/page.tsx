import { Metadata } from 'next';
import MentalHealthGoalSettingProductsClient from './MentalHealthGoalSettingProductsClient';

export const metadata: Metadata = {
  title: 'Product Information | Mental Health / Goal Setting | Downscale',
  description: 'product details and recommendations.',
  robots: { index: false, follow: false },
};

export default function MentalHealthGoalSettingProductsPage() {
  return <MentalHealthGoalSettingProductsClient />;
}
