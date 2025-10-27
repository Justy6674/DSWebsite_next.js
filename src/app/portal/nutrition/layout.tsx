import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nutrition & Meal Planning | Patient Portal',
  description: 'Access personalised meal plans, nutrition tracking tools, dietary guidelines, and evidence-based nutritional support for sustainable weight management.',
  openGraph: {
    title: 'Nutrition & Meal Planning | Downscale Patient Portal',
    description: 'Access personalised meal plans, nutrition tracking tools, dietary guidelines, and evidence-based nutritional support for sustainable weight management.',
    url: 'https://www.downscale.com.au/portal/nutrition',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-nutrition.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-nutrition.jpg',
        width: 1200,
        height: 630,
        alt: 'Nutrition & Meal Planning - Downscale Patient Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nutrition & Meal Planning | Downscale Patient Portal',
    description: 'Access personalised meal plans, nutrition tracking tools, and evidence-based nutritional support.',
    images: ['https://www.downscale.com.au/og-portal-nutrition.jpg'],
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
    canonical: 'https://www.downscale.com.au/portal/nutrition',
  },
};

export default function NutritionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}