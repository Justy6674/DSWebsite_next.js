import { Metadata } from 'next';
import WeightLossClinicBunbury from '@/components/locations/WeightLossClinicBunbury';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Bunbury',
  description: 'Weight Loss Clinic Bunbury page - Access and manage your content',
};

export default function WeightLossClinicBunburyPage() {
  return <WeightLossClinicBunbury />;
}