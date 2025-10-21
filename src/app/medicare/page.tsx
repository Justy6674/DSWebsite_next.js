import { Metadata } from 'next';
import MedicareBilling from '@/components/MedicareBilling';

export const metadata: Metadata = {
  title: 'Medicare',
  description: 'Medicare page - Access and manage your content',
};

export default function MedicareBillingPage() {
  return <MedicareBilling />;
}