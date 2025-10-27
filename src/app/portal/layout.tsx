import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Patient Portal | Downscale Weight Loss Clinic',
    default: 'Patient Portal Dashboard | Downscale Weight Loss Clinic',
  },
  description: 'Access your Downscale patient portal for weight tracking, consultation history, treatment plans, and health metrics. Secure telehealth portal for weight management.',
  openGraph: {
    title: 'Patient Portal | Downscale Weight Loss Clinic',
    description: 'Access your weight management portal for tracking, consultations, and treatment plans.',
    url: 'https://www.downscale.com.au/portal',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal.jpg',
        width: 1200,
        height: 630,
        alt: 'Patient Portal - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
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

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}