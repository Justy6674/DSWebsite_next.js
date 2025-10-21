import { Metadata } from 'next';
import FaqPage from '@/components/FaqPage';

export const metadata: Metadata = {
  title: 'Faq',
  description: 'Faq page - Access and manage your content',
};

export default function FaqPagePage() {
  return <FaqPage />;
}