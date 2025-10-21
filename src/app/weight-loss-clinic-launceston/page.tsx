import { Metadata } from 'next';
import WeightLossClinicLaunceston from '@/components/WeightLossClinicLaunceston';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Launceston',
  description: 'Weight Loss Clinic Launceston page - Access and manage your content',
};

export default function WeightLossClinicLauncestonPage() {
  return <WeightLossClinicLaunceston />;
}