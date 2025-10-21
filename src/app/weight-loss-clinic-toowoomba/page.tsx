import { Metadata } from 'next';
import WeightLossClinicToowoomba from '@/components/locations/WeightLossClinicToowoomba';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Toowoomba',
  description: 'Weight Loss Clinic Toowoomba page - Access and manage your content',
};

export default function WeightLossClinicToowoombaPage() {
  return <WeightLossClinicToowoomba />;
}