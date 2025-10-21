import { Metadata } from 'next';
import { RedirectComponent } from '@/components/RedirectComponent';

export const metadata: Metadata = {
  title: 'Redirect',
  description: 'Redirecting to main site',
};

export default function RedirectPage() {
  return <RedirectComponent to="/:slug" />;
}