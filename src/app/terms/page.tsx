import { Metadata } from 'next';
import TermsAndConditions from '@/components/TermsAndConditions';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/terms',
  },
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}