import { Metadata } from 'next';
import TermsAndConditions from '@/components/TermsAndConditions';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms page - Access and manage your content',
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}