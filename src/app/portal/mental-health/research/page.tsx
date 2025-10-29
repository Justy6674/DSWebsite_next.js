import { Metadata } from 'next';
import MentalHealthGoalSettingResearchClient from './MentalHealthGoalSettingResearchClient';

export const metadata: Metadata = {
  title: 'Research & Journal Articles | Mental Health / Goal Setting | Downscale',
  description: 'evidence-based research papers and peer-reviewed studies.',
  robots: { index: false, follow: false },
};

export default function MentalHealthGoalSettingResearchPage() {
  return <MentalHealthGoalSettingResearchClient />;
}
