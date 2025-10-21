import { Metadata } from 'next';
import WeightLossClinicMelbourne from '@/components/locations/WeightLossClinicMelbourne';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Melbourne',
  description: 'Weight Loss Clinic Melbourne page - Access and manage your content',
};

export default function WeightLossClinicMelbournePage() {
  return <WeightLossClinicMelbourne />;
}