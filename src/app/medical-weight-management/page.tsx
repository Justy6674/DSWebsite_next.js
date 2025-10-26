import { Metadata } from 'next';
import MedicalWeightManagement from '@/components/MedicalWeightManagementPage';

export const metadata: Metadata = {
  title: 'Medical Weight Management',
  description: 'Medical Weight Management page - Access and manage your content',
  openGraph: {
    title: 'Medical Weight Management',
    description: 'Medical Weight Management page - Access and manage your content',
    url: 'https://www.downscale.com.au/medical-weight-management',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Medical Weight Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Weight Management',
    description: 'Medical Weight Management page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/medical-weight-management',
  },
};

export default function MedicalWeightManagementPage() {
  return <MedicalWeightManagement />;
}