import { Metadata } from 'next';
import WaterVideosClient from './WaterVideosClient';

export const metadata: Metadata = {
  title: 'Videos and Video Links | Water | Downscale',
  description: 'educational videos and tutorials.',
  robots: { index: false, follow: false },
};

export default function WaterVideosPage() {
  return <WaterVideosClient />;
}
