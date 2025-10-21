import { Metadata } from 'next';
import Complaints from '@/components/Complaints';

export const metadata: Metadata = {
  title: 'Complaints',
  description: 'Complaints page - Access and manage your content',
};

export default function ComplaintsPage() {
  return <Complaints />;
}