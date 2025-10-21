import { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black',
  description: 'Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates.',
  openGraph: {
    title: 'Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black',
    description: 'Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates.',
    url: 'https://www.downscale.com.au',
    images: [
      {
        url: '/hero-family-sunset.png',
        width: 1200,
        height: 800,
        alt: 'Comprehensive family health and wellness clinic - treating the whole person and family - Australian telehealth clinic for weight loss, endocrine health, and chronic disease reversal',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/',
  },
};

export default function HomePagePage() {
  return <HomePage />;
}