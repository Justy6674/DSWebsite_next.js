import { Metadata } from 'next';
import AuthPage from '@/components/AuthPage';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Auth page - Access and manage your content',
};

export default function AuthPagePage() {
  return <AuthPage />;
}