import { Metadata } from 'next';
import PrivacyPolicy from '@/components/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}