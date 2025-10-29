import { Metadata } from 'next';
import MedicationProductsClient from './MedicationProductsClient';

export const metadata: Metadata = {
  title: 'Product Information | GLP-1 Medications | Downscale',
  description: 'Official medication information, prescribing guides, and product documentation for GLP-1 medications.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MedicationProductsPage() {
  return <MedicationProductsClient />;
}

