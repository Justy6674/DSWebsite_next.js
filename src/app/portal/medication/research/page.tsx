import { Metadata } from 'next';
import MedicationResearchClient from './MedicationResearchClient';

export const metadata: Metadata = {
  title: 'Research & Journal Articles | GLP-1 Studies | Downscale',
  description: 'Evidence-based research papers and journal articles on GLP-1 medications, weight management, and clinical outcomes.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MedicationResearchPage() {
  return <MedicationResearchClient />;
}

