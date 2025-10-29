import { Metadata } from 'next';
import MentalHealthGoalSettingVideosClient from './MentalHealthGoalSettingVideosClient';

export const metadata: Metadata = {
  title: 'Videos and Video Links | Mental Health / Goal Setting | Downscale',
  description: 'educational videos and tutorials.',
  robots: { index: false, follow: false },
};

export default function MentalHealthGoalSettingVideosPage() {
  return <MentalHealthGoalSettingVideosClient />;
}
