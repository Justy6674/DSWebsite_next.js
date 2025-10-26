import { Metadata } from 'next';
import ConditionsPage from '@/components/ConditionsPage';

export const metadata: Metadata = {
  title: 'Clinical Services | Medical Conditions We Treat | Downscale Weight Loss Clinic',
  description: 'Professional medical weight management for 12+ conditions: obesity, PCOS, diabetes, metabolic syndrome, depression, anxiety, fatty liver, menopause, ADHD, sleep apnoea, chronic pain, hypertension. Evidence-based treatment across Australia.',
  keywords: 'medical conditions weight loss, obesity treatment Australia, PCOS weight management, diabetes weight loss, metabolic syndrome treatment, depression anxiety weight management, fatty liver disease treatment, menopause weight gain, ADHD weight loss, sleep apnoea treatment, chronic pain weight loss, hypertension treatment Australia',
  openGraph: {
    title: 'Clinical Services | Medical Conditions We Treat | Downscale Weight Loss Clinic',
    description: 'Professional medical weight management for 12+ conditions including obesity, PCOS, diabetes, metabolic syndrome, depression, anxiety, fatty liver, menopause, ADHD, sleep apnoea, chronic pain, hypertension. Evidence-based telehealth treatment across Australia.',
    url: 'https://www.downscale.com.au/clinical-services',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.webp',
        width: 1200,
        height: 630,
        alt: 'Clinical Services | Medical Conditions We Treat | Downscale Weight Loss Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinical Services | Medical Conditions We Treat | Downscale Weight Loss Clinic',
    description: 'Professional medical weight management for 12+ conditions including obesity, PCOS, diabetes, metabolic syndrome, depression, anxiety, fatty liver, menopause, ADHD, sleep apnoea, chronic pain, hypertension.',
    images: ['https://www.downscale.com.au/og-services.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/clinical-services',
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

export default function ClinicalServicesPage() {
  return <ConditionsPage />;
}