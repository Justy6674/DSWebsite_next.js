import { Metadata } from 'next';
import MedicationVideosClient from './MedicationVideosClient';

export const metadata: Metadata = {
  title: 'Videos | GLP-1 Educational Content | Downscale',
  description: 'Video tutorials for injection devices, demonstrations, and educational content about GLP-1 medications.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MedicationVideosPage() {
  return <MedicationVideosClient />;
}

