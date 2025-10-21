import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'Meet The Team',
  description: 'Meet The Team page - Access and manage your content',
};

export default function AboutPagePage() {
  return <AboutPage />;
}