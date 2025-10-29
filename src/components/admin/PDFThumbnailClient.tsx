'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, File, AlertCircle, FileText } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker for client-side rendering
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

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
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  // Calculate thumbnail height based on standard PDF aspect ratio (√2:1)
  const height = Math.round(width * 1.414);

  // Track client-side mounting to prevent SSR issues
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleRefresh = () => {
    setPdfLoading(true);
    setPdfError(null);
    setNumPages(null);
    onRefresh?.();
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log(`✅ PDF loaded successfully: ${fileName} (${numPages} pages)`);
    setNumPages(numPages);
    setPdfLoading(false);
    setPdfError(null);
  };

  const onDocumentLoadError = (error: any) => {
    console.error(`❌ PDF load error for ${fileName}:`, error);
    setPdfLoading(false);
    setPdfError(error.message || 'Failed to load PDF');
  };

  const onPageLoadSuccess = () => {
    console.log(`✅ Page 1 rendered successfully for: ${fileName}`);
  };

  const onPageLoadError = (error: any) => {
    console.error(`❌ Page render error for ${fileName}:`, error);
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

  // Show loading state while PDF is loading
  if (pdfLoading) {
    return (
      <div
        className={`bg-slate-800 rounded-lg border border-slate-700 overflow-hidden relative ${className}`}
        style={{ width, height }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 p-2">
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
  }

  // Show error state if PDF failed to load
  if (pdfError) {
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
            {pdfError.length > 20 ? `${pdfError.substring(0, 20)}...` : pdfError}
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

  // Render actual PDF thumbnail using react-pdf
  return (
    <div
      className={`bg-slate-800 rounded-lg border border-slate-700 overflow-hidden relative ${className}`}
      style={{ width, height }}
    >
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={null} // We handle loading state ourselves
        error={null}   // We handle error state ourselves
        className="w-full h-full"
      >
        <Page
          pageNumber={1}
          width={width}
          height={height}
          onLoadSuccess={onPageLoadSuccess}
          onLoadError={onPageLoadError}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading={null}
          error={null}
          className="pdf-page-thumbnail"
        />
      </Document>

      {/* PDF info overlay */}
      <div className="absolute bottom-1 left-1 right-1 bg-slate-900/80 rounded px-2 py-1">
        <div className="text-slate-300 text-xs font-medium text-center break-words">
          {fileName?.split('.')[0]?.substring(0, 15) || 'Document'}
          {fileName?.length > 15 ? '...' : ''}
        </div>
        {numPages && (
          <div className="text-slate-400 text-xs text-center">
            {numPages} page{numPages !== 1 ? 's' : ''}
          </div>
        )}
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