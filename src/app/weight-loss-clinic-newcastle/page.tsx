import { Metadata } from 'next';
import WeightLossClinicNewcastle from '@/components/locations/WeightLossClinicNewcastle';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Newcastle',
  description: 'Weight Loss Clinic Newcastle page - Access and manage your content',
};

export default function WeightLossClinicNewcastlePage() {
  return <WeightLossClinicNewcastle />;
}