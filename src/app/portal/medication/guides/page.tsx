import { Metadata } from 'next';
import MedicationGuidesClient from './MedicationGuidesClient';

export const metadata: Metadata = {
  title: 'Medication Guides | GLP-1 Instructions & Resources | Downscale',
  description: 'Step-by-step guides for GLP-1 medication management, injection techniques, side effect management, and medication protocols.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MedicationGuidesPage() {
  return <MedicationGuidesClient />;
}

