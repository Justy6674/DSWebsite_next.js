import { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page - Access and manage your content',
};

export default function HomePagePage() {
  return <HomePage />;
}