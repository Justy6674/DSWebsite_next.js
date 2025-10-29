import { Metadata } from 'next';
import MentalHealthGoalSettingOtherClient from './MentalHealthGoalSettingOtherClient';

export const metadata: Metadata = {
  title: 'Other | Mental Health / Goal Setting | Downscale',
  description: 'additional resources.',
  robots: { index: false, follow: false },
};

export default function MentalHealthGoalSettingOtherPage() {
  return <MentalHealthGoalSettingOtherClient />;
}
