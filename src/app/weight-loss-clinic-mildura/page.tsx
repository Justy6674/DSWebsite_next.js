import { Metadata } from 'next';
import WeightLossClinicMildura from '@/components/locations/WeightLossClinicMildura';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Mildura | $45 Telehealth Sunraysia VIC | Downscale',
  description: 'Professional telehealth weight loss clinic serving Mildura and the Sunraysia region. Consultations from $45 with Medicare rebates.',
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-mildura',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WeightLossClinicMilduraPage() {
  return <WeightLossClinicMildura />;
}
