import { Metadata } from 'next';
import BlogPage from '@/components/BlogPage';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog page - Access and manage your content',
};

export default function BlogPagePage() {
  return <BlogPage />;
}