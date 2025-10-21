import { Metadata } from 'next';
import BlogPostPage from '@/components/BlogPostPage';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog page - Access and manage your content',
};

export default function BlogPostPagePage() {
  return <BlogPostPage />;
}