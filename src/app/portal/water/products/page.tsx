import { Metadata } from 'next';
import WaterProductsClient from './WaterProductsClient';

export const metadata: Metadata = {
  title: 'Product Information | Water | Downscale',
  description: 'product details and recommendations.',
  robots: { index: false, follow: false },
};

export default function WaterProductsPage() {
  return <WaterProductsClient />;
}
