import { Metadata } from 'next';
import ConditionsPage from '@/components/ConditionsPage';

export const metadata: Metadata = {
  title: 'Conditions',
  description: 'Conditions page - Access and manage your content',
};

export default function ConditionsPagePage() {
  return <ConditionsPage />;
}