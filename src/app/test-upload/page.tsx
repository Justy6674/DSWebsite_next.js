import { Metadata } from 'next';
import TestUploadClient from './TestUploadClient';

export const metadata: Metadata = {
  title: 'Test Upload | Development Tool | Downscale',
  description: 'Internal development tool for file upload testing. Not for public use.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TestUploadPage() {
  return <TestUploadClient />;
}