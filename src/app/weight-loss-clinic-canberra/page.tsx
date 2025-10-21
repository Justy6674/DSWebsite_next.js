import { Metadata } from 'next';
import WeightLossClinicCanberra from '@/components/locations/WeightLossClinicCanberra';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Canberra',
  description: 'Weight Loss Clinic Canberra page - Access and manage your content',
};

export default function WeightLossClinicCanberraPage() {
  return <WeightLossClinicCanberra />;
}