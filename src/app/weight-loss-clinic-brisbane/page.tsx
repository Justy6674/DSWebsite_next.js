import { Metadata } from 'next';
import WeightLossClinicBrisbane from '@/components/WeightLossClinicBrisbane';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Brisbane',
  description: 'Weight Loss Clinic Brisbane page - Access and manage your content',
};

export default function WeightLossClinicBrisbanePage() {
  return <WeightLossClinicBrisbane />;
}