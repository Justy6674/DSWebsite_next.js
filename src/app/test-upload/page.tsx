import { Metadata } from 'next';
import nextDynamic from 'next/dynamic';

// Force dynamic rendering to prevent DOMMatrix SSR issues
export const dynamic = 'force-dynamic';

// Dynamic import with no SSR to prevent react-pdf server-side issues
const TestUploadClient = nextDynamic(() => import('./TestUploadClient'), {
  ssr: false,
  loading: () => (
    <div className="p-4 bg-slate-900 min-h-screen">
      <h1 className="text-white text-xl mb-4">Loading PDF Test Environment...</h1>
      <div className="bg-slate-800 p-4 rounded">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-600 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
});

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