import { Metadata } from 'next';
import SleepProductsClient from './SleepProductsClient';

export const metadata: Metadata = {
  title: 'Product Information | Sleep | Downscale',
  description: 'product details and recommendations.',
  robots: { index: false, follow: false },
};

export default function SleepProductsPage() {
  return <SleepProductsClient />;
}
