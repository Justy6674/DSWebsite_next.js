import { Metadata } from 'next';
import PatientDocumentsClient from './PatientDocumentsClient';

export const metadata: Metadata = {
  title: 'Patient Documents | Clinical Portal | Downscale Weight Loss Clinic',
  description: 'Upload and manage your personal documents securely. Files are stored privately and visible only to you and your clinical team.',
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: 'https://www.downscale.com.au/portal/documents' },
};

export default function PatientDocumentsPage() {
  return <PatientDocumentsClient />;
}


