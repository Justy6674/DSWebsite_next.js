import { Metadata } from 'next';
import ActivityProductsClient from './ActivityProductsClient';

export const metadata: Metadata = {
  title: 'Product Information | Activity | Downscale',
  description: 'product details and recommendations.',
  robots: { index: false, follow: false },
};

export default function ActivityProductsPage() {
  return <ActivityProductsClient />;
}
