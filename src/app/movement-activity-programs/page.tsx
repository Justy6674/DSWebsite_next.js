import { Metadata } from 'next';
import MovementActivityPrograms from '@/components/MovementActivityPrograms';

export const metadata: Metadata = {
  title: 'Movement Activity Programs',
  description: 'Movement Activity Programs page - Access and manage your content',
};

export default function MovementActivityProgramsPage() {
  return <MovementActivityPrograms />;
}