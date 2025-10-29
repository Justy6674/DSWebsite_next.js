'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, File, AlertCircle } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [ReactPDFComponents, setReactPDFComponents] = useState<any>(null);

  // Calculate thumbnail height based on standard PDF aspect ratio (√2:1)
  const height = Math.round(width * 1.414);

  // Track client-side mounting to prevent SSR issues
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Dynamically import react-pdf only after client has mounted
  useEffect(() => {
    if (!hasMounted) return;

    const loadReactPDF = async () => {
      try {
        const { Document, Thumbnail, pdfjs } = await import('react-pdf');

        // Configure PDF.js worker
        if (typeof window !== 'undefined' && pdfjs.GlobalWorkerOptions) {
          pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
        }

        setReactPDFComponents({ Document, Thumbnail });
      } catch (error) {
        console.error('Failed to load react-pdf:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadReactPDF();
  }, [hasMounted]);

  const handleDocumentLoadSuccess = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleDocumentLoadError = (error: Error) => {
    console.error('PDF thumbnail load error:', error);
    setIsLoading(false);
    setHasError(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setRefreshKey(prev => prev + 1);
    onRefresh?.();
  };

  const handleThumbnailRenderSuccess = () => {
    setIsLoading(false);
  };

  const handleThumbnailRenderError = (error: Error) => {
    console.error('PDF thumbnail render error:', error);
    setIsLoading(false);
    setHasError(true);
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

  // Loading skeleton while react-pdf is loading
  if (!ReactPDFComponents) {
    return (
      <div
        className={`bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <RefreshCw className="h-6 w-6 text-slate-500 animate-spin" />
          <span className="text-slate-400 text-xs font-medium">Loading PDF...</span>
        </div>
      </div>
    );
  }

  // Loading skeleton with professional medical styling
  if (isLoading) {
    return (
      <div
        className={`bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <RefreshCw className="h-6 w-6 text-slate-500 animate-spin" />
          <span className="text-slate-400 text-xs font-medium">Loading PDF...</span>
        </div>
      </div>
    );
  }

  // Error fallback with professional styling
  if (hasError) {
    return (
      <div
        className={`bg-slate-800 rounded-lg border border-slate-700 flex flex-col items-center justify-center space-y-2 ${className}`}
        style={{ width, height }}
      >
        <AlertCircle className="h-6 w-6 text-slate-400" />
        <span className="text-slate-400 text-xs text-center px-2">
          Preview unavailable
        </span>
        {onRefresh && (
          <button
            onClick={handleRefresh}
            className="text-[#b68a71] hover:text-[#a57761] text-xs font-medium transition-colors"
            title="Retry loading thumbnail"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  const { Document, Thumbnail } = ReactPDFComponents;

  return (
    <div
      className={`bg-slate-800 rounded-lg border border-slate-700 overflow-hidden relative ${className}`}
      style={{ width, height }}
    >
      <Document
        file={`${fileUrl}?t=${refreshKey}`}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={handleDocumentLoadError}
        loading=""
        error=""
        noData=""
      >
        <Thumbnail
          pageNumber={1}
          width={width}
          onRenderSuccess={handleThumbnailRenderSuccess}
          onRenderError={handleThumbnailRenderError}
          className="pdf-thumbnail"
        />
      </Document>

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