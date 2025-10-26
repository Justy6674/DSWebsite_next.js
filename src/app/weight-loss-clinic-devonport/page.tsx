import { Metadata } from 'next';
import WeightLossClinicDevonport from '@/components/locations/WeightLossClinicDevonport';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Devonport | $45 Telehealth Tasmania | Downscale',
  description: 'Professional telehealth weight loss clinic serving Devonport and North West Tasmania. Consultations from $45 with Medicare rebates.',
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-devonport',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WeightLossClinicDevonportPage() {
  return <WeightLossClinicDevonport />;
}
