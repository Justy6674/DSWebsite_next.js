import { Metadata } from 'next';
import WeightLossClinicCairns from '@/components/locations/WeightLossClinicCairns';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Cairns',
  description: 'Weight Loss Clinic Cairns page - Access and manage your content',
};

export default function WeightLossClinicCairnsPage() {
  return <WeightLossClinicCairns />;
}