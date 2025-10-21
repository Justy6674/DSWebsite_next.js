import { Metadata } from 'next';
import WeightLossClinicHobart from '@/components/locations/WeightLossClinicHobart';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Hobart',
  description: 'Weight Loss Clinic Hobart page - Access and manage your content',
};

export default function WeightLossClinicHobartPage() {
  return <WeightLossClinicHobart />;
}