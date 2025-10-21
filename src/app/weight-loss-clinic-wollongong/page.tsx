import { Metadata } from 'next';
import WeightLossClinicWollongong from '@/components/WeightLossClinicWollongong';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Wollongong',
  description: 'Weight Loss Clinic Wollongong page - Access and manage your content',
};

export default function WeightLossClinicWollongongPage() {
  return <WeightLossClinicWollongong />;
}