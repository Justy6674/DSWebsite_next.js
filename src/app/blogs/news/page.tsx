import { Metadata } from 'next';
import BlogPage from '@/components/BlogPage';

export const metadata: Metadata = {
  title: 'Blogs - News',
  description: 'Blogs - News page - Access and manage your content',
};

export default function BlogPagePage() {
  return <BlogPage />;
}