import { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'Index.html',
  description: 'Index.html page - Access and manage your content',
};

export default function HomePagePage() {
  return <HomePage />;
}