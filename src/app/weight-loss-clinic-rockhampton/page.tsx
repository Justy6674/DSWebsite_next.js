import { Metadata } from 'next';
import WeightLossClinicRockhampton from '@/components/WeightLossClinicRockhampton';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Rockhampton',
  description: 'Weight Loss Clinic Rockhampton page - Access and manage your content',
};

export default function WeightLossClinicRockhamptonPage() {
  return <WeightLossClinicRockhampton />;
}