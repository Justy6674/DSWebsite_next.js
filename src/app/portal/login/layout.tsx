import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal Login | Downscale Weight Loss Clinic',
  description: 'Secure login to your Downscale patient portal. Access your health records, consultation history, treatment plans, and weight management tools.',
  openGraph: {
    title: 'Portal Login | Downscale Weight Loss Clinic',
    description: 'Secure login to your Downscale patient portal. Access your health records, consultation history, treatment plans, and weight management tools.',
    url: 'https://www.downscale.com.au/portal/login',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-login.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-login.jpg',
        width: 1200,
        height: 630,
        alt: 'Portal Login - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal Login | Downscale Weight Loss Clinic',
    description: 'Secure login to your Downscale patient portal. Access your health records and weight management tools.',
    images: ['https://www.downscale.com.au/og-portal-login.jpg'],
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
    canonical: 'https://www.downscale.com.au/portal/login',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}