import { Metadata } from 'next';
import WeightLossClinicMandurah from '@/components/WeightLossClinicMandurah';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Mandurah',
  description: 'Weight Loss Clinic Mandurah page - Access and manage your content',
};

export default function WeightLossClinicMandurahPage() {
  return <WeightLossClinicMandurah />;
}