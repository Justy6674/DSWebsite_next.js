import { Metadata } from 'next';
import WeightLossClinicPerth from '@/components/locations/WeightLossClinicPerth';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Perth',
  description: 'Weight Loss Clinic Perth page - Access and manage your content',
};

export default function WeightLossClinicPerthPage() {
  return <WeightLossClinicPerth />;
}