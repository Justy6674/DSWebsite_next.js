import { Metadata } from 'next';
import WeightLossClinicWhyalla from '@/components/locations/WeightLossClinicWhyalla';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Whyalla | $45 Telehealth Spencer Gulf SA | Downscale',
  description: 'Professional telehealth weight loss clinic serving Whyalla and the Spencer Gulf. Consultations from $45 for industrial community health.',
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-whyalla',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WeightLossClinicWhyallaPage() {
  return <WeightLossClinicWhyalla />;
}
