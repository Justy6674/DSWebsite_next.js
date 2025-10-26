import { Metadata } from 'next';
import WeightLossClinicMountGambier from '@/components/locations/WeightLossClinicMountGambier';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Mount Gambier | $45 Telehealth Limestone Coast SA | Downscale',
  description: 'Professional telehealth weight loss clinic serving Mount Gambier and the Limestone Coast. Consultations from $45 with Medicare rebates.',
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-mount-gambier',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WeightLossClinicMountGambierPage() {
  return <WeightLossClinicMountGambier />;
}
