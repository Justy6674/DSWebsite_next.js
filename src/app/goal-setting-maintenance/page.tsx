import { Metadata } from 'next';
import GoalSettingMaintenance from '@/components/GoalSettingMaintenance';

export const metadata: Metadata = {
  title: 'Goal Setting & Weight Maintenance | Long-Term Success Support | Downscale',
  description: 'Professional goal setting and weight maintenance support for sustainable results. SMART goals, habit formation, relapse prevention and ongoing motivation coaching from $45.',
  openGraph: {
    title: 'Goal Setting & Weight Maintenance | Long-Term Success Support | Downscale',
    description: 'Professional goal setting and weight maintenance support for sustainable results. SMART goals, habit formation, relapse prevention and ongoing motivation coaching from $45.',
    url: 'https://www.downscale.com.au/goal-setting-maintenance',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Goal Setting and Weight Maintenance Support - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goal Setting & Weight Maintenance | Long-Term Success Support | Downscale',
    description: 'Professional goal setting and weight maintenance support for sustainable results. SMART goals, habit formation, relapse prevention and ongoing coaching.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/goal-setting-maintenance',
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

export default function GoalSettingMaintenancePage() {
  return <GoalSettingMaintenance />;
}