import { Metadata } from 'next';
import MedicalWeightManagement from '@/components/MedicalWeightManagementPage';

export const metadata: Metadata = {
  title: 'Medical Weight Management',
  description: 'Medical Weight Management page - Access and manage your content',
};

export default function MedicalWeightManagementPage() {
  return <MedicalWeightManagement />;
}