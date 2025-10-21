import { Metadata } from 'next';
import { RedirectComponent } from '@/components/RedirectComponent';

export const metadata: Metadata = {
  title: 'Home Redirect',
  description: 'Redirecting to home page',
};

export default function HomeRedirectPage() {
  return <RedirectComponent to="/home/:slug" />;
}