'use client';

import React from 'react';
import { RefreshCw, File, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

interface PDFThumbnailProps {
  fileUrl: string;
  fileName: string;
  width?: number;
  onRefresh?: () => void;
  className?: string;
}

// Dynamically import the client component with no SSR
const PDFThumbnailClient = dynamic(
  () => import('./PDFThumbnailClient'),
  {
    ssr: false,
    loading: ({ width = 120, className = '' }) => {
      const height = Math.round(width * 1.414);
      return (
        <div
          className={`bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center ${className}`}
          style={{ width, height }}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <File className="h-6 w-6 text-slate-500" />
            <span className="text-slate-400 text-xs font-medium">Loading...</span>
          </div>
        </div>
      );
    }
  }
);

const PDFThumbnail: React.FC<PDFThumbnailProps> = (props) => {
  return <PDFThumbnailClient {...props} />;
};

// Fallback component for non-PDF files
export const FileTypeIcon: React.FC<{ type: string; className?: string }> = ({
  type,
  className = ''
}) => {
  return (
    <div className={`bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-1">
        <File className="h-8 w-8 text-slate-400" />
        <span className="text-slate-400 text-xs font-medium">
          {type.split('/')[1]?.toUpperCase() || 'FILE'}
        </span>
      </div>
    </div>
  );
};

export default PDFThumbnail;