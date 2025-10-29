import { Metadata } from 'next';
import ActivityOtherClient from './ActivityOtherClient';

export const metadata: Metadata = {
  title: 'Other | Activity | Downscale',
  description: 'additional resources.',
  robots: { index: false, follow: false },
};

export default function ActivityOtherPage() {
  return <ActivityOtherClient />;
}
