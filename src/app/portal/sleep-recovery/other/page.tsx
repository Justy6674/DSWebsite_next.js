import { Metadata } from 'next';
import SleepOtherClient from './SleepOtherClient';

export const metadata: Metadata = {
  title: 'Other | Sleep | Downscale',
  description: 'additional resources.',
  robots: { index: false, follow: false },
};

export default function SleepOtherPage() {
  return <SleepOtherClient />;
}
