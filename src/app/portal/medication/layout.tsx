import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medication Management | Patient Portal',
  description: 'Manage your weight loss medications, track dosing schedules, monitor side effects, and access TGA-approved prescribing information from your healthcare provider.',
  openGraph: {
    title: 'Medication Management | Downscale Patient Portal',
    description: 'Manage your weight loss medications, track dosing schedules, monitor side effects, and access TGA-approved prescribing information from your healthcare provider.',
    url: 'https://www.downscale.com.au/portal/medication',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-medication.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-medication.jpg',
        width: 1200,
        height: 630,
        alt: 'Medication Management - Downscale Patient Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medication Management | Downscale Patient Portal',
    description: 'Manage your weight loss medications, track dosing schedules, and monitor side effects safely.',
    images: ['https://www.downscale.com.au/og-portal-medication.jpg'],
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
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/medication',
  },
};

export default function MedicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}