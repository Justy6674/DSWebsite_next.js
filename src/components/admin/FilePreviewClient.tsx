'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, File, AlertCircle, FileText, FileSpreadsheet, Video, Link, Image, Download } from 'lucide-react';

interface FilePreviewClientProps {
  fileUrl: string;
  fileName: string;
  fileType?: string;
  width?: number;
  onRefresh?: () => void;
  className?: string;
}

const FilePreviewClient: React.FC<FilePreviewClientProps> = ({
  fileUrl,
  fileName,
  fileType = '',
  width = 120,
  onRefresh,
  className = ''
}) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Calculate thumbnail height based on standard aspect ratio
  const height = Math.round(width * 1.414);

  // Track client-side mounting to prevent SSR issues
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Determine file type from URL or provided type
  const getFileType = () => {
    if (fileType) return fileType.toLowerCase();
    const extension = fileName.toLowerCase().split('.').pop() || '';
    return extension;
  };

  const getFileCategory = () => {
    const extension = getFileType();

    // PDF files
    if (extension === 'pdf') return 'pdf';

    // Excel files
    if (['xlsx', 'xls', 'csv'].includes(extension)) return 'excel';

    // Word documents
    if (['docx', 'doc'].includes(extension)) return 'word';

    // Images
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) return 'image';

    // Videos
    if (['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm'].includes(extension)) return 'video';

    // Website links
    if (fileUrl.startsWith('http') && !fileUrl.includes('supabase')) return 'website';

    // Default to document
    return 'document';
  };

  const handleRefresh = () => {
    setPreviewLoaded(false);
    setPreviewError(false);
    onRefresh?.();
  };

  const handleLoad = () => {
    console.log(`✅ File preview loaded successfully: ${fileName}`);
    setPreviewLoaded(true);
    setPreviewError(false);
  };

  const handleError = () => {
    console.error(`❌ File preview error for ${fileName}`);
    setPreviewLoaded(false);
    setPreviewError(true);
  };

  const getFileIcon = () => {
    const category = getFileCategory();
    switch (category) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-400" />;
      case 'excel': return <FileSpreadsheet className="h-8 w-8 text-green-400" />;
      case 'word': return <FileText className="h-8 w-8 text-blue-400" />;
      case 'image': return <Image className="h-8 w-8 text-purple-400" />;
      case 'video': return <Video className="h-8 w-8 text-orange-400" />;
      case 'website': return <Link className="h-8 w-8 text-cyan-400" />;
      default: return <File className="h-8 w-8 text-slate-400" />;
    }
  };

  const renderPreview = () => {
    const category = getFileCategory();

    switch (category) {
      case 'pdf':
        return (
          <iframe
            src={`${fileUrl}#page=1&zoom=50&toolbar=0&navpanes=0&scrollbar=0`}
            width={width}
            height={height}
            className="w-full h-full border-0"
            title={`PDF preview: ${fileName}`}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              transform: 'scale(1)',
              transformOrigin: 'top left'
            }}
          />
        );

      case 'image':
        return (
          <img
            src={fileUrl}
            alt={fileName}
            className="w-full h-full object-cover"
            onLoad={handleLoad}
            onError={handleError}
          />
        );

      case 'video':
        return (
          <video
            src={fileUrl}
            className="w-full h-full object-cover"
            controls={false}
            muted
            onLoadedData={handleLoad}
            onError={handleError}
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23475569'/%3E%3C/svg%3E"
          />
        );

      case 'website':
        return (
          <iframe
            src={fileUrl}
            width={width}
            height={height}
            className="w-full h-full border-0"
            title={`Website preview: ${fileName}`}
            onLoad={handleLoad}
            onError={handleError}
            sandbox="allow-same-origin"
          />
        );

      case 'excel':
      case 'word':
      default:
        // For office documents and other files, show a styled file icon
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-700 p-4">
            {getFileIcon()}
            <span className="text-slate-300 text-xs font-medium text-center mt-2">
              {getFileType().toUpperCase()}
            </span>
            <span className="text-slate-400 text-xs text-center mt-1">
              Click to download
            </span>
          </div>
        );
    }
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

  // Show loading overlay while preview is loading
  const showLoadingOverlay = !previewLoaded && !previewError;
  const category = getFileCategory();

  // Show error state if preview failed to load
  if (previewError) {
    return (
      <div
        className={`bg-slate-800 rounded-lg border border-red-600/50 overflow-hidden relative cursor-pointer ${className}`}
        style={{ width, height }}
        onClick={() => window.open(fileUrl, '_blank')}
      >
        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 p-2">
          <AlertCircle className="h-8 w-8 text-red-400" />
          <span className="text-red-300 text-xs font-medium text-center">
            Preview Error
          </span>
          <span className="text-slate-400 text-xs text-center break-words px-1">
            Click to open
          </span>
        </div>

        {/* Refresh button overlay */}
        {onRefresh && (
          <div className="absolute top-1 right-1 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRefresh();
              }}
              className="bg-slate-900/80 hover:bg-slate-900 p-1 rounded text-red-400 hover:text-red-300 transition-colors"
              title="Retry loading preview"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Render actual file preview
  return (
    <div
      className={`bg-slate-800 rounded-lg border border-slate-700 overflow-hidden relative cursor-pointer hover:border-[#b68a71] transition-colors ${className}`}
      style={{ width, height }}
      onClick={() => window.open(fileUrl, '_blank')}
    >
      {/* Loading overlay */}
      {showLoadingOverlay && (
        <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center space-y-2 p-2 z-10">
          <div className="animate-spin">
            {getFileIcon()}
          </div>
          <span className="text-slate-300 text-xs font-medium text-center">
            Loading Preview...
          </span>
          <span className="text-slate-400 text-xs text-center break-words px-1">
            {fileName?.split('.')[0]?.substring(0, 15) || 'Document'}
            {fileName?.length > 15 ? '...' : ''}
          </span>
        </div>
      )}

      {/* File preview */}
      {renderPreview()}

      {/* File info overlay */}
      <div className="absolute bottom-1 left-1 right-1 bg-slate-900/80 rounded px-2 py-1">
        <div className="text-slate-300 text-xs font-medium text-center break-words">
          {fileName?.split('.')[0]?.substring(0, 15) || 'Document'}
          {fileName?.length > 15 ? '...' : ''}
        </div>
        <div className="text-slate-400 text-xs text-center">
          {getFileType().toUpperCase()}
        </div>
      </div>

      {/* Download indicator for non-previewable files */}
      {['excel', 'word', 'document'].includes(category) && (
        <div className="absolute top-1 left-1 bg-slate-900/80 rounded p-1">
          <Download className="h-3 w-3 text-[#b68a71]" />
        </div>
      )}

      {/* Refresh button overlay */}
      {onRefresh && (
        <div className="absolute top-1 right-1 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRefresh();
            }}
            className="bg-slate-900/80 hover:bg-slate-900 p-1 rounded text-[#b68a71] hover:text-[#a57761] transition-colors"
            title="Refresh preview"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FilePreviewClient;