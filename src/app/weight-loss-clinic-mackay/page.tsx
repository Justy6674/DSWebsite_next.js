import { Metadata } from 'next';
import WeightLossClinicMackay from '@/components/locations/WeightLossClinicMackay';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Mackay',
  description: 'Weight Loss Clinic Mackay page - Access and manage your content',
};

export default function WeightLossClinicMackayPage() {
  return <WeightLossClinicMackay />;
}