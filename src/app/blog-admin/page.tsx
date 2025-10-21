import { Metadata } from 'next';
import BlogAdminPage from '@/components/BlogAdminPage';

export const metadata: Metadata = {
  title: 'Blog Admin',
  description: 'Blog Admin page - Access and manage your content',
};

export default function BlogAdminPagePage() {
  return <BlogAdminPage />;
}