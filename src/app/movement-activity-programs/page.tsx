import { Metadata } from 'next';
import MovementActivityPrograms from '@/components/MovementActivityPrograms';

export const metadata: Metadata = {
  title: 'Movement Activity Programs',
  description: 'Movement Activity Programs page - Access and manage your content',
  openGraph: {
    title: 'Movement Activity Programs',
    description: 'Movement Activity Programs page - Access and manage your content',
    url: 'https://www.downscale.com.au/movement-activity-programs',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Movement Activity Programs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movement Activity Programs',
    description: 'Movement Activity Programs page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/movement-activity-programs',
  },
};

export default function MovementActivityProgramsPage() {
  return <MovementActivityPrograms />;
}