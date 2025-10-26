import { Metadata } from 'next';
import WeightLossClinicKalgoorlie from '@/components/locations/WeightLossClinicKalgoorlie';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Kalgoorlie | $45 Telehealth Goldfields WA | Downscale',
  description: 'Professional telehealth weight loss clinic serving Kalgoorlie and the Goldfields. Consultations from $45 for mining community health.',
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-kalgoorlie',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WeightLossClinicKalgoorliePage() {
  return <WeightLossClinicKalgoorlie />;
}
