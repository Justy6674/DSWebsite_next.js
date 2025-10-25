import { Metadata } from 'next';
import MedicareBilling from '@/components/MedicareBillingPage';

export const metadata: Metadata = {
  title: 'Medicare',
  description: 'Medicare page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/medicare',
  },
};

export default function MedicareBillingPage() {
  return <MedicareBilling />;
}