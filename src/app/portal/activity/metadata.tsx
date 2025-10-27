import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activity Tracking | Exercise & Movement Log',
  description: 'Track your daily physical activity, exercise routines, and movement goals. Monitor calories burned, steps taken, and workout progress in your weight loss journey.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/activity',
  },
  openGraph: {
    title: 'Activity Tracking | Exercise & Movement Log | Downscale Portal',
    description: 'Track your daily physical activity, exercise routines, and movement goals in your weight loss journey.',
    url: 'https://www.downscale.com.au/portal/activity',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-activity.jpg',
        secureUrl: 'https://www.downscale.com.au/og-activity.jpg',
        width: 1200,
        height: 630,
        alt: 'Activity Tracking Portal - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};