import { Metadata } from 'next';
import WeightLossClinicAdelaide from '@/components/WeightLossClinicAdelaide';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Adelaide',
  description: 'Weight Loss Clinic Adelaide page - Access and manage your content',
};

export default function WeightLossClinicAdelaidePage() {
  return <WeightLossClinicAdelaide />;
}