import { Metadata } from 'next';
import WeightLossClinicDarwin from '@/components/locations/WeightLossClinicDarwin';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Darwin',
  description: 'Weight Loss Clinic Darwin page - Access and manage your content',
};

export default function WeightLossClinicDarwinPage() {
  return <WeightLossClinicDarwin />;
}