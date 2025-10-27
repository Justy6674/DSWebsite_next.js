import { Metadata } from 'next';
import MovementActivityPrograms from '@/components/MovementActivityPrograms';

export const metadata: Metadata = {
  title: 'Movement & Activity Programs | Exercise Physiology for Weight Loss | Downscale',
  description: 'Personalised movement and exercise programs for sustainable weight loss. Low-impact activities, strength training, cardio plans and mobility support. Suitable for all fitness levels from $45.',
  openGraph: {
    title: 'Movement & Activity Programs | Exercise Physiology for Weight Loss | Downscale',
    description: 'Personalised movement and exercise programs for sustainable weight loss. Low-impact activities, strength training, cardio plans and mobility support. Suitable for all fitness levels from $45.',
    url: 'https://www.downscale.com.au/movement-activity-programs',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Movement and Activity Programs for Weight Loss - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movement & Activity Programs | Exercise Physiology for Weight Loss | Downscale',
    description: 'Personalised movement and exercise programs for sustainable weight loss. Low-impact activities, strength training, cardio plans and mobility support.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/movement-activity-programs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function MovementActivityProgramsPage() {
  return <MovementActivityPrograms />;
}