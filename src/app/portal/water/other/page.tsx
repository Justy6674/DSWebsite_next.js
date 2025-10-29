import { Metadata } from 'next';
import WaterOtherClient from './WaterOtherClient';

export const metadata: Metadata = {
  title: 'Other | Water | Downscale',
  description: 'additional resources.',
  robots: { index: false, follow: false },
};

export default function WaterOtherPage() {
  return <WaterOtherClient />;
}
