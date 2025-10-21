import { Metadata } from 'next';
import ToolsPage from '@/components/ToolsPage';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Tools page - Access and manage your content',
};

export default function ToolsPagePage() {
  return <ToolsPage />;
}