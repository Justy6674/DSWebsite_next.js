import { Metadata } from 'next';
import WeightLossClinicTownsville from '@/components/locations/WeightLossClinicTownsville';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Townsville',
  description: 'Weight Loss Clinic Townsville page - Access and manage your content',
};

export default function WeightLossClinicTownsvillePage() {
  return <WeightLossClinicTownsville />;
}