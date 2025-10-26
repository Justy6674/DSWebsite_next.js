import { Metadata } from 'next';
import WeightLossClinic from '@/components/locations/WeightLossClinic';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic | $45 Telehealth | Downscale',
  description: 'Professional telehealth weight loss clinic. Consultations from $45 with experienced Nurse Practitioner. Medicare rebates available.',
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WeightLossClinicPage() {
  return <WeightLossClinic locationName="" />;
}
