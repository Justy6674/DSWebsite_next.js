'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, File, AlertCircle, FileText } from 'lucide-react';

interface PDFThumbnailClientProps {
  fileUrl: string;
  fileName: string;
  width?: number;
  onRefresh?: () => void;
  className?: string;
}

const PDFThumbnailClient: React.FC<PDFThumbnailClientProps> = ({
  fileUrl,
  fileName,
  width = 120,
  onRefresh,
  className = ''
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  // Calculate thumbnail height based on standard PDF aspect ratio (√2:1)
  const height = Math.round(width * 1.414);

  // Track client-side mounting to prevent SSR issues
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleRefresh = () => {
    onRefresh?.();
  };

  // Prevent hydration mismatch - show nothing during SSR
  if (!hasMounted) {
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

  // Simple PDF icon fallback - always works reliably
  return (
    <div
      className={`bg-slate-800 rounded-lg border border-slate-700 overflow-hidden relative ${className}`}
      style={{ width, height }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center space-y-2 p-2">
        <FileText className="h-8 w-8 text-[#b68a71]" />
        <span className="text-slate-300 text-xs font-medium text-center break-words">
          PDF
        </span>
        <span className="text-slate-400 text-xs text-center break-words px-1">
          {fileName?.split('.')[0]?.substring(0, 15) || 'Document'}
          {fileName?.length > 15 ? '...' : ''}
        </span>
      </div>

      {/* Refresh button overlay */}
      {onRefresh && (
        <div className="absolute top-1 right-1 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={handleRefresh}
            className="bg-slate-900/80 hover:bg-slate-900 p-1 rounded text-[#b68a71] hover:text-[#a57761] transition-colors"
            title="Refresh thumbnail"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFThumbnailClient;