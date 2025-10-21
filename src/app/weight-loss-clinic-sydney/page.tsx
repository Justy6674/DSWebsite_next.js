import { Metadata } from 'next';
import WeightLossClinicSydney from '@/components/WeightLossClinicSydney';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Sydney',
  description: 'Weight Loss Clinic Sydney page - Access and manage your content',
};

export default function WeightLossClinicSydneyPage() {
  return <WeightLossClinicSydney />;
}