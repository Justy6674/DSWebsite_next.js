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
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  // Calculate thumbnail height based on standard PDF aspect ratio (√2:1)
  const height = Math.round(width * 1.414);

  // Track client-side mounting to prevent SSR issues
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleRefresh = () => {
    setIframeLoaded(false);
    setIframeError(false);
    onRefresh?.();
  };

  const handleIframeLoad = () => {
    console.log(`✅ PDF iframe loaded successfully: ${fileName}`);
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    console.error(`❌ PDF iframe error for ${fileName}`);
    setIframeLoaded(false);
    setIframeError(true);
  };

  // Prevent hydration mismatch - show loading during SSR
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

  // Show loading overlay while iframe is loading
  const showLoadingOverlay = !iframeLoaded && !iframeError;

  // Show error state if iframe failed to load
  if (iframeError) {
    return (
      <div
        className={`bg-slate-800 rounded-lg border border-red-600/50 overflow-hidden relative ${className}`}
        style={{ width, height }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 p-2">
          <AlertCircle className="h-8 w-8 text-red-400" />
          <span className="text-red-300 text-xs font-medium text-center">
            PDF Error
          </span>
          <span className="text-slate-400 text-xs text-center break-words px-1">
            Failed to load
          </span>
        </div>

        {/* Refresh button overlay */}
        {onRefresh && (
          <div className="absolute top-1 right-1 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={handleRefresh}
              className="bg-slate-900/80 hover:bg-slate-900 p-1 rounded text-red-400 hover:text-red-300 transition-colors"
              title="Retry loading PDF"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Render actual PDF thumbnail using iframe
  return (
    <div
      className={`bg-slate-800 rounded-lg border border-slate-700 overflow-hidden relative ${className}`}
      style={{ width, height }}
    >
      {/* Loading overlay */}
      {showLoadingOverlay && (
        <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center space-y-2 p-2 z-10">
          <div className="animate-spin">
            <FileText className="h-8 w-8 text-[#b68a71]" />
          </div>
          <span className="text-slate-300 text-xs font-medium text-center">
            Loading PDF...
          </span>
          <span className="text-slate-400 text-xs text-center break-words px-1">
            {fileName?.split('.')[0]?.substring(0, 15) || 'Document'}
            {fileName?.length > 15 ? '...' : ''}
          </span>
        </div>
      )}

      {/* PDF iframe */}
      <iframe
        src={`${fileUrl}#page=1&zoom=50&toolbar=0&navpanes=0&scrollbar=0`}
        width={width}
        height={height}
        className="w-full h-full border-0"
        title={`PDF preview: ${fileName}`}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }}
      />

      {/* PDF info overlay */}
      <div className="absolute bottom-1 left-1 right-1 bg-slate-900/80 rounded px-2 py-1">
        <div className="text-slate-300 text-xs font-medium text-center break-words">
          {fileName?.split('.')[0]?.substring(0, 15) || 'Document'}
          {fileName?.length > 15 ? '...' : ''}
        </div>
      </div>

      {/* Refresh button overlay */}
      {onRefresh && (
        <div className="absolute top-1 right-1 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={handleRefresh}
            className="bg-slate-900/80 hover:bg-slate-900 p-1 rounded text-[#b68a71] hover:text-[#a57761] transition-colors"
            title="Refresh PDF thumbnail"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFThumbnailClient;