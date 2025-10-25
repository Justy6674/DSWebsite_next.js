import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'Meet The Team',
  description: 'Meet The Team page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/meet-the-team',
  },
};

export default function AboutPagePage() {
  return <AboutPage />;
}