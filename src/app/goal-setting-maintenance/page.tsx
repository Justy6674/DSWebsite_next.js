import { Metadata } from 'next';
import GoalSettingMaintenance from '@/components/GoalSettingMaintenance';

export const metadata: Metadata = {
  title: 'Goal Setting Maintenance',
  description: 'Goal Setting Maintenance page - Access and manage your content',
  openGraph: {
    title: 'Goal Setting Maintenance',
    description: 'Goal Setting Maintenance page - Access and manage your content',
    url: 'https://www.downscale.com.au/goal-setting-maintenance',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Goal Setting Maintenance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goal Setting Maintenance',
    description: 'Goal Setting Maintenance page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/goal-setting-maintenance',
  },
};

export default function GoalSettingMaintenancePage() {
  return <GoalSettingMaintenance />;
}