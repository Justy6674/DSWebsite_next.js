import { Metadata } from 'next';
import WeightLossClinicBendigo from '@/components/WeightLossClinicBendigo';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Bendigo',
  description: 'Weight Loss Clinic Bendigo page - Access and manage your content',
};

export default function WeightLossClinicBendigoPage() {
  return <WeightLossClinicBendigo />;
}