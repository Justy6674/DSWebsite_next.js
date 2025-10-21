import { Metadata } from 'next';
import MentalHealthSupport from '@/components/MentalHealthSupport';

export const metadata: Metadata = {
  title: 'Mental Health Support',
  description: 'Mental Health Support page - Access and manage your content',
};

export default function MentalHealthSupportPage() {
  return <MentalHealthSupport />;
}