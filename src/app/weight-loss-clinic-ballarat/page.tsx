import { Metadata } from 'next';
import WeightLossClinicBallarat from '@/components/locations/WeightLossClinicBallarat';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Ballarat',
  description: 'Weight Loss Clinic Ballarat page - Access and manage your content',
};

export default function WeightLossClinicBallaratPage() {
  return <WeightLossClinicBallarat />;
}