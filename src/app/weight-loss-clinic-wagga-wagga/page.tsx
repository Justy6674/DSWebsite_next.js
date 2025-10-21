import { Metadata } from 'next';
import WeightLossClinicWaggaWagga from '@/components/locations/WeightLossClinicWaggaWagga';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Wagga Wagga',
  description: 'Weight Loss Clinic Wagga Wagga page - Access and manage your content',
};

export default function WeightLossClinicWaggaWaggaPage() {
  return <WeightLossClinicWaggaWagga />;
}