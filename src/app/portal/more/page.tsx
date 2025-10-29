import { Metadata } from 'next';
import MorePortalClient from './MorePortalClient';

export const metadata: Metadata = {
  title: 'More | Additional Resources | Downscale Portal',
  description: 'Access additional portal resources including Mental Health, Sleep, and Water tracking.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MorePortalPage() {
  return <MorePortalClient />;
}

