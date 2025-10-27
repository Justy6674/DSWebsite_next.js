import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Shop & Supplements | Patient Portal',
  description: 'Browse TGA-approved supplements, health products, and weight management tools recommended by your healthcare provider. Secure ordering and delivery across Australia.',
  openGraph: {
    title: 'Health Shop & Supplements | Downscale Patient Portal',
    description: 'Browse TGA-approved supplements, health products, and weight management tools recommended by your healthcare provider. Secure ordering and delivery across Australia.',
    url: 'https://www.downscale.com.au/portal/shop',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-shop.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-shop.jpg',
        width: 1200,
        height: 630,
        alt: 'Health Shop & Supplements - Downscale Patient Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Shop & Supplements | Downscale Patient Portal',
    description: 'Browse TGA-approved supplements and health products recommended by your healthcare provider.',
    images: ['https://www.downscale.com.au/og-portal-shop.jpg'],
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
    canonical: 'https://www.downscale.com.au/portal/shop',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}