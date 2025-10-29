import { Metadata } from 'next';
import MedicationOtherClient from './MedicationOtherClient';

export const metadata: Metadata = {
  title: 'Other Medication Resources | Downscale',
  description: 'Additional resources and tools for medication support and management.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MedicationOtherPage() {
  return <MedicationOtherClient />;
}

