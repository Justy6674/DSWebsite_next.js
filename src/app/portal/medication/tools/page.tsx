import { Metadata } from 'next';
import MedicationToolsClient from './MedicationToolsClient';

export const metadata: Metadata = {
  title: 'Medication Tools | Calculators & Assessments | Downscale',
  description: 'Interactive calculators, assessments, and trackers for medication management and monitoring.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MedicationToolsPage() {
  return <MedicationToolsClient />;
}

