import { Metadata } from 'next';
import MedicationPodcastsClient from './MedicationPodcastsClient';

export const metadata: Metadata = {
  title: 'Podcast Links | GLP-1 Education | Downscale',
  description: 'Expert interviews and educational podcasts on medication and weight management.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MedicationPodcastsPage() {
  return <MedicationPodcastsClient />;
}

