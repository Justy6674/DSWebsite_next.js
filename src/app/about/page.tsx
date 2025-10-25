import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/about',
  },
};

export default function AboutPagePage() {
  return <AboutPage />;
}