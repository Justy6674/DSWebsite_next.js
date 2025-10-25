import { Metadata } from 'next';
import ConditionsPage from '@/components/ConditionsPage';

export const metadata: Metadata = {
  title: 'Conditions',
  description: 'Conditions page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/conditions',
  },
};

export default function ConditionsPagePage() {
  return <ConditionsPage />;
}