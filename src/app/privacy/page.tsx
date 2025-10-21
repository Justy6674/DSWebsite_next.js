import { Metadata } from 'next';
import PrivacyPolicy from '@/components/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy page - Access and manage your content',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}