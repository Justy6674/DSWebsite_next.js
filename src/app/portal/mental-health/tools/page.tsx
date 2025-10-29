import { Metadata } from 'next';
import MentalHealthGoalSettingToolsClient from './MentalHealthGoalSettingToolsClient';

export const metadata: Metadata = {
  title: 'Tools | Mental Health / Goal Setting | Downscale',
  description: 'interactive calculators and assessments.',
  robots: { index: false, follow: false },
};

export default function MentalHealthGoalSettingToolsPage() {
  return <MentalHealthGoalSettingToolsClient />;
}
