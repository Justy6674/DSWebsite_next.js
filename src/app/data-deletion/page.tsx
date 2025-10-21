import { Metadata } from 'next';
import DataDeletion from '@/components/DataDeletion';

export const metadata: Metadata = {
  title: 'Data Deletion',
  description: 'Data Deletion page - Access and manage your content',
};

export default function DataDeletionPage() {
  return <DataDeletion />;
}