import { Metadata } from 'next';
import NewClientResourcesClient from './NewClientResourcesClient';

export const metadata: Metadata = {
  title: 'New Client Resources | Patient Portal | Downscale Weight Loss Clinic',
  description: 'Orientation resources for new patients. Watch the welcome video and review key getting-started materials for safe, effective care.',
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: 'https://www.downscale.com.au/portal/new-client-resources' },
};

export default function NewClientResourcesPage() {
  return <NewClientResourcesClient />;
}


