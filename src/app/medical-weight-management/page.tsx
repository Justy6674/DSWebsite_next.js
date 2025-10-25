import { Metadata } from 'next';
import MedicalWeightManagement from '@/components/MedicalWeightManagementPage';

export const metadata: Metadata = {
  title: 'Medical Weight Management',
  description: 'Medical Weight Management page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/medical-weight-management',
  },
};

export default function MedicalWeightManagementPage() {
  return <MedicalWeightManagement />;
}