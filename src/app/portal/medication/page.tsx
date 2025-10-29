import { Metadata } from 'next';
import MedicationSubDashboardClient from './MedicationSubDashboardClient';

export const metadata: Metadata = {
  title: 'Medication Hub | GLP-1 Resources & Management | Downscale Weight Loss Clinic',
  description: 'Evidence-based resources for GLP-1 medication management including Mounjaro and Wegovy. Device guides, product information, side effect management, and clinical research for optimal treatment outcomes.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/medication',
  },
  openGraph: {
    title: 'Medication Hub | GLP-1 Resources & Management | Downscale',
    description: 'Evidence-based resources for GLP-1 medication management. Device guides, product information, and clinical research for optimal treatment outcomes.',
    url: 'https://www.downscale.com.au/portal/medication',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-medication.jpg',
        secureUrl: 'https://www.downscale.com.au/og-medication.jpg',
        width: 1200,
        height: 630,
        alt: 'Medication Hub - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medication Hub | GLP-1 Resources & Management | Downscale',
    description: 'Evidence-based resources for GLP-1 medication management and optimal treatment outcomes.',
    images: ['https://www.downscale.com.au/og-medication.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function MedicationPortalPage() {
  return <MedicationSubDashboardClient />;
}
