import { Metadata } from 'next';
import WeightLossClinicAliceSprings from '@/components/WeightLossClinicAliceSprings';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Alice Springs',
  description: 'Weight Loss Clinic Alice Springs page - Access and manage your content',
};

export default function WeightLossClinicAliceSpringsPage() {
  return <WeightLossClinicAliceSprings />;
}