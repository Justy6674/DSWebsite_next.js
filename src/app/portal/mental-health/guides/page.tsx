import { Metadata } from 'next';
import MentalHealthGoalSettingGuidesClient from './MentalHealthGoalSettingGuidesClient';

export const metadata: Metadata = {
  title: 'Guides | Mental Health / Goal Setting | Downscale',
  description: 'step-by-step educational guides and instructions.',
  robots: { index: false, follow: false },
};

export default function MentalHealthGoalSettingGuidesPage() {
  return <MentalHealthGoalSettingGuidesClient />;
}
