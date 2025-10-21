import { Metadata } from 'next';
import WeightLossClinicGeelong from '@/components/locations/WeightLossClinicGeelong';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Geelong',
  description: 'Weight Loss Clinic Geelong page - Access and manage your content',
};

export default function WeightLossClinicGeelongPage() {
  return <WeightLossClinicGeelong />;
}