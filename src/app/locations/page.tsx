import { Metadata } from 'next';
import LocationsPage from '@/components/LocationsPage';

export const metadata: Metadata = {
  title: 'Locations',
  description: 'Locations page - Access and manage your content',
};

export default function LocationsPagePage() {
  return <LocationsPage />;
}