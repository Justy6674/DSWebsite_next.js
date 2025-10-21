import { Metadata } from 'next';
import WeightLossClinicGoldCoast from '@/components/WeightLossClinicGoldCoast';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Gold Coast',
  description: 'Weight Loss Clinic Gold Coast page - Access and manage your content',
};

export default function WeightLossClinicGoldCoastPage() {
  return <WeightLossClinicGoldCoast />;
}