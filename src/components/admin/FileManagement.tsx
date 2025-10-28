'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Upload,
  File,
  Image,
  Video,
  Music,
  FileText,
  Download,
  Trash2,
  Eye,
  Copy,
  Search,
  Filter,
  Folder,
  Plus,
  MoreHorizontal,
  BookOpen,
  X,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import * as tus from 'tus-js-client';
import toast, { Toaster } from 'react-hot-toast';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnail_url?: string;
  folder: string;
  created_at: string;
  uploaded_by: string;
  metadata: any;
}

interface PortalContentData {
  file_url?: string;
  file_id?: string;
  description?: string;
  external_url?: string;
  duration?: string;
  author?: string;
  [key: string]: any;
}

interface PortalCategoryAssignment {
  pillar: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop' | 'medication';
  content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide';
  title: string;
  description: string;
  content_data: PortalContentData;
  tags: string[];
  subsection?: string;
  customSubsection?: string;
  displayOrder?: string;
}

const FILE_TYPES = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  video: ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm'],
  audio: ['mp3', 'wav', 'ogg', 'aac', 'm4a'],
  document: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
  other: []
};

const FOLDERS = [
  'blog-images',
  'portal-resources',
  'patient-documents',
  'marketing-materials',
  'templates',
  'backups',
  'other'
];

const PORTAL_PILLARS = {
  medication: {
    name: 'Medication',
    subsections: [
      'Device Videos',
      'Product Information',
      'Research Articles',
      'Side Effect Management',
      'Dose Tracking'
    ]
  },
  nutrition: {
    name: 'Nutrition',
    subsections: [
      'Meal Planning Tools',
      'Recipe Library',
      'Macro Calculators',
      'Eating Guides',
      'Saved Meal Plans'
    ]
  },
  activity: {
    name: 'Activity',
    subsections: [
      'Home Workouts',
      'Exercise Videos',
      'Movement Alternatives',
      'Progress Tracking',
      'Equipment-Free'
    ]
  },
  'mental-health': {
    name: 'Mental Health',
    subsections: [
      'Stress Management',
      'Emotional Eating',
      'CBT Resources',
      'Identity Change',
      'Mindfulness Library'
    ]
  },
  'sleep-recovery': {
    name: 'Sleep + Recovery',
    subsections: [
      'Sleep Hygiene',
      'Relaxation Resources',
      'Recovery Strategies',
      'Parent Tips',
      'Sleep Tracking'
    ]
  },
  shop: {
    name: 'Shop',
    subsections: [
      'Compounding Pharmacy',
      'Supplements',
      'Devices & Equipment',
      'Educational Products',
      'Recommendations'
    ]
  }
};

const CONTENT_TYPES = {
  video: 'Video Content',
  external_doc: 'External Document',
  downscale_doc: 'Downscale Document',
  link: 'External Link',
  tool: 'Interactive Tool',
  program_guide: 'Program/Guide'
};

export default function FileManagement() {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [dragActive, setDragActive] = useState(false);

  // Upload tracking and cancellation
  const [activeUploads, setActiveUploads] = useState<Map<string, any>>(new Map());
  const [uploadProgress, setUploadProgress] = useState<Map<string, number>>(new Map());

  // PDF thumbnail generation function
  const generatePDFThumbnail = async (file: File | Blob, fileName?: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // Use PDF.js to render first page as thumbnail
      import('pdfjs-dist').then(async (pdfjsLib) => {
        try {
          // Set up PDF.js worker
          pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const page = await pdf.getPage(1);

          // Get page dimensions with a good scale for quality
          const originalViewport = page.getViewport({ scale: 1.0 });

          // Create thumbnail with fixed aspect ratio (16:9) and good quality
          const thumbnailWidth = 400;
          const thumbnailHeight = 225;

          // Calculate scale to fit width while maintaining quality
          const scale = thumbnailWidth / originalViewport.width;
          const scaledViewport = page.getViewport({ scale });

          // Set canvas to thumbnail size
          canvas.width = thumbnailWidth;
          canvas.height = thumbnailHeight;

          // Clear canvas with white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, thumbnailWidth, thumbnailHeight);

          // Create a temporary canvas for the full page
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          if (!tempCtx) {
            reject(new Error('Temporary canvas context not available'));
            return;
          }

          tempCanvas.width = scaledViewport.width;
          tempCanvas.height = scaledViewport.height;

          const renderContext = {
            canvasContext: tempCtx,
            viewport: scaledViewport,
            canvas: tempCanvas,
          };

          await page.render(renderContext).promise;

          // FORCE SHOW TOP OF DOCUMENT ONLY - NO MIDDLE OR BOTTOM PORTIONS
          // Calculate the source height to capture only the top portion of the PDF
          const sourceWidth = tempCanvas.width;
          const sourceHeight = Math.min(tempCanvas.height, (thumbnailHeight / thumbnailWidth) * sourceWidth);

          // Draw ONLY the top portion - starting from (0,0) and taking only what fits in aspect ratio
          ctx.drawImage(
            tempCanvas,
            0, 0, // ALWAYS start from TOP-LEFT (0,0) - NEVER from middle
            sourceWidth, // Use full width
            sourceHeight, // Use calculated height to maintain aspect ratio
            0, 0, // Destination starts at top-left
            thumbnailWidth, // Scale to thumbnail width
            thumbnailHeight // Scale to thumbnail height
          );

          // Convert canvas to blob and upload as thumbnail
          canvas.toBlob(async (blob) => {
            if (!blob) {
              reject(new Error('Failed to create thumbnail blob'));
              return;
            }

            try {
              // Upload thumbnail to Supabase storage with retry mechanism
              const originalName = fileName || (file as File).name || 'unknown.pdf';
              const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
              const thumbnailName = `thumbnails/${Date.now()}_${safeName.replace('.pdf', '.png')}`;

              console.log(`📤 Uploading thumbnail: ${thumbnailName}`);

              // Refresh session before upload to prevent auth issues
              const { data: { session }, error: sessionError } = await supabase.auth.getSession();
              if (sessionError || !session) {
                console.error('❌ Authentication session invalid during thumbnail upload');
                reject(new Error('Authentication required for thumbnail upload'));
                return;
              }

              // Retry upload with exponential backoff
              let uploadError;
              let uploadData;
              const maxRetries = 3;

              for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                  console.log(`📤 Upload attempt ${attempt}/${maxRetries} for: ${thumbnailName}`);

                  const result = await supabase.storage
                    .from('portal-files')
                    .upload(thumbnailName, blob, {
                      contentType: 'image/png',
                      cacheControl: '3600',
                      upsert: false
                    });

                  uploadData = result.data;
                  uploadError = result.error;

                  if (!uploadError && uploadData) {
                    console.log(`✅ Thumbnail uploaded successfully: ${thumbnailName}`);
                    break;
                  } else if (uploadError) {
                    console.error(`❌ Upload attempt ${attempt} failed:`, uploadError);
                    if (attempt === maxRetries) {
                      reject(new Error(`Upload failed after ${maxRetries} attempts: ${uploadError.message}`));
                      return;
                    }
                    // Wait before retry (exponential backoff)
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
                  }
                } catch (networkError) {
                  console.error(`❌ Network error on attempt ${attempt}:`, networkError);
                  uploadError = networkError;
                  if (attempt === maxRetries) {
                    reject(new Error(`Network error after ${maxRetries} attempts: ${networkError.message}`));
                    return;
                  }
                  // Wait before retry
                  await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
                }
              }

              if (!uploadData) {
                reject(new Error('Upload failed: No data returned from storage'));
                return;
              }

              // Get public URL
              const { data: thumbnailUrl } = supabase.storage
                .from('portal-files')
                .getPublicUrl(thumbnailName);

              console.log(`📍 Generated public URL: ${thumbnailUrl.publicUrl}`);
              resolve(thumbnailUrl.publicUrl);
            } catch (error) {
              console.error('❌ Unexpected error during thumbnail upload:', error);
              reject(error);
            }
          }, 'image/png', 0.8);
        } catch (error) {
          reject(error);
        }
      }).catch(reject);
    });
  };

  // Generate thumbnail for existing files that don't have one
  const generateMissingThumbnail = async (file: FileItem): Promise<string | null> => {
    if (file.thumbnail_url) return file.thumbnail_url; // Already has thumbnail

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'pdf') {
      try {
        console.log(`🔄 Generating missing thumbnail for: ${file.name}`);

        // Create AbortController for timeout handling
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), 30000); // 30 second timeout

        try {
          // Fetch the PDF file with timeout and error handling
          const response = await fetch(file.url, {
            signal: abortController.signal,
            headers: {
              'Accept': 'application/pdf,*/*',
            }
          });

          clearTimeout(timeoutId);

          // Check if response is ok
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          // Verify content type
          const contentType = response.headers.get('content-type');
          if (contentType && !contentType.includes('pdf') && !contentType.includes('octet-stream')) {
            console.warn(`⚠️  Unexpected content type for ${file.name}: ${contentType}`);
          }

          // Check file size (skip if too large for client-side processing)
          const contentLength = response.headers.get('content-length');
          if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) { // 50MB limit
            throw new Error(`PDF file too large for thumbnail generation: ${(parseInt(contentLength) / 1024 / 1024).toFixed(1)}MB`);
          }

          const blob = await response.blob();

          // Verify blob size
          if (blob.size === 0) {
            throw new Error('Downloaded PDF file is empty');
          }

          console.log(`📄 Processing PDF (${(blob.size / 1024 / 1024).toFixed(1)}MB): ${file.name}`);

          const thumbnailUrl = await generatePDFThumbnail(blob, file.name);

          // Update the database with the new thumbnail
          const { error: updateError } = await supabase
            .from('file_storage')
            .update({ thumbnail_url: thumbnailUrl })
            .eq('id', file.id);

          if (updateError) {
            console.error('Failed to update database with thumbnail URL:', updateError);
            throw updateError;
          }

          console.log(`✅ Successfully generated thumbnail for: ${file.name}`);
          return thumbnailUrl;

        } catch (fetchError) {
          clearTimeout(timeoutId);

          // Handle specific error types
          if (fetchError.name === 'AbortError') {
            throw new Error(`Timeout: PDF download took longer than 30 seconds`);
          } else if (fetchError.name === 'TypeError' && fetchError.message.includes('Failed to fetch')) {
            throw new Error(`Network error: Could not download PDF from server`);
          } else {
            throw fetchError;
          }
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`❌ Failed to generate thumbnail for ${file.name}:`, errorMessage);

        // Categorize errors for better user feedback
        if (errorMessage.includes('Timeout')) {
          console.error('   → Network timeout - PDF took too long to download');
        } else if (errorMessage.includes('Network error')) {
          console.error('   → Network connectivity issue');
        } else if (errorMessage.includes('HTTP')) {
          console.error('   → Server returned error status');
        } else if (errorMessage.includes('too large')) {
          console.error('   → PDF file exceeds processing limits');
        } else if (errorMessage.includes('PDF.js')) {
          console.error('   → PDF processing/rendering error');
        } else {
          console.error('   → Unexpected error during thumbnail generation');
        }

        return null;
      }
    }

    return null;
  };

  // Portal categorization state
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [selectedFileForPortal, setSelectedFileForPortal] = useState<FileItem | null>(null);
  const [portalAssignment, setPortalAssignment] = useState<PortalCategoryAssignment>({
    pillar: 'medication',
    content_type: 'external_doc',
    title: '',
    description: '',
    content_data: {},
    tags: []
  });
  const [assigningToPortal, setAssigningToPortal] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false); // Debug toggle

  // Resumable upload function using TUS protocol
  // Cancel upload function
  const cancelUpload = (fileName: string) => {
    const upload = activeUploads.get(fileName);
    if (upload) {
      upload.abort();
      activeUploads.delete(fileName);
      uploadProgress.delete(fileName);
      setActiveUploads(new Map(activeUploads));
      setUploadProgress(new Map(uploadProgress));
      toast.error(`Upload cancelled: ${fileName}`);
    }
  };

  // Refresh session before upload to prevent 400 auth errors
  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error || !session) {
        throw new Error('Failed to refresh authentication session');
      }
      return session;
    } catch (error) {
      throw new Error('Authentication required - please log in again');
    }
  };

  const uploadLargeFile = async (file: File, folder: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      // Refresh session to prevent 400 auth errors
      let session;
      try {
        session = await refreshSession();
      } catch (error) {
        reject(error);
        return;
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${timestamp}_${baseName}.${fileExtension}`;
      const objectName = `${folder}/${fileName}`;

      // Get project ID from Supabase URL
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const projectId = supabaseUrl?.split('//')[1].split('.')[0];

      if (!projectId) {
        reject(new Error('Could not determine Supabase project ID'));
        return;
      }

      const upload = new tus.Upload(file, {
        endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
        retryDelays: [0, 1000, 3000, 5000, 10000], // Faster initial retry
        headers: {
          authorization: `Bearer ${session.access_token}`,
          'x-upsert': 'false' // Prevent conflicts with existing files
        },
        uploadDataDuringCreation: true,
        removeFingerprintOnSuccess: true,
        metadata: {
          bucketName: 'portal-files',
          objectName: objectName,
          contentType: file.type || 'application/octet-stream',
          cacheControl: '3600'
        },
        chunkSize: 3 * 1024 * 1024, // Reduced to 3MB for better reliability
        onError: function (error) {
          console.error('TUS upload failed:', error);
          activeUploads.delete(fileName);
          uploadProgress.delete(fileName);
          setActiveUploads(new Map(activeUploads));
          setUploadProgress(new Map(uploadProgress));
          toast.error(`Upload failed: ${error.message}`);
          reject(error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = (bytesUploaded / bytesTotal) * 100;
          uploadProgress.set(fileName, percentage);
          setUploadProgress(new Map(uploadProgress));
          toast.loading(`Uploading ${file.name}: ${percentage.toFixed(1)}%`, {
            id: `upload-${file.name}`,
            duration: Infinity
          });
        },
        onSuccess: function () {
          console.log('TUS upload completed for:', file.name);
          activeUploads.delete(fileName);
          uploadProgress.delete(fileName);
          setActiveUploads(new Map(activeUploads));
          setUploadProgress(new Map(uploadProgress));
          toast.success(`Upload completed: ${file.name}`, { id: `upload-${file.name}` });
          resolve(objectName);
        }
      });

      // Track active upload for cancellation
      activeUploads.set(fileName, upload);
      setActiveUploads(new Map(activeUploads));

      // Check for previous uploads and resume if available
      upload.findPreviousUploads().then(function (previousUploads) {
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }
        upload.start();
      }).catch(function (error) {
        console.error('Failed to start upload:', error);
        reject(error);
      });
    });
  };

  // File upload handling with admin authentication
  const handleFileUpload = async (fileList: FileList, folder: string = 'other') => {
    if (!fileList.length) return;

    // SECURITY: Must have authenticated user for healthcare system
    if (!user?.id) {
      toast.error('Authentication required for file uploads');
      return;
    }

    setUploading(true);
    const uploadPromises = Array.from(fileList).map(async (file) => {
      try {
        // Generate unique filename with better sanitization
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, '_');
        const fileName = `${timestamp}_${baseName}.${fileExtension}`;
        const filePath = `${folder}/${fileName}`;

        // Check file size and use appropriate upload method
        const maxStandardSize = 6 * 1024 * 1024; // 6MB limit for standard uploads
        console.log(`File size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);

        let uploadData, uploadError;
        let finalPath = filePath;

        if (file.size <= maxStandardSize) {
          // Standard upload for files ≤6MB - refresh session first
          console.log('Using standard upload (≤6MB)');
          toast.loading(`Uploading ${file.name}...`, { id: `upload-${file.name}` });

          try {
            // Refresh session to prevent 400 auth errors
            await refreshSession();

            const result = await supabase.storage
              .from('portal-files')
              .upload(filePath, file, {
                contentType: file.type || 'application/octet-stream',
                cacheControl: '3600',
                upsert: false
              });
            uploadData = result.data;
            uploadError = result.error;

            if (!uploadError) {
              toast.success(`Upload completed: ${file.name}`, { id: `upload-${file.name}` });
            }
          } catch (authError) {
            uploadError = authError;
            console.error('Authentication error during standard upload:', authError);
          }
        } else {
          // For files >6MB, use resumable upload
          console.log('File >6MB - using resumable upload');
          toast(`Large file detected (${(file.size / 1024 / 1024).toFixed(1)}MB) - using resumable upload`, {
            icon: 'ℹ️',
            style: {
              background: '#1e40af',
              color: '#fef5e7'
            }
          });

          try {
            finalPath = await uploadLargeFile(file, folder);
            uploadData = { path: finalPath };
            uploadError = null;
          } catch (tusError) {
            uploadError = tusError;
          }
        }

        if (uploadError) {
          console.error('Storage upload error details:', {
            message: uploadError.message,
            error: uploadError.error,
            statusCode: uploadError.statusCode,
            details: uploadError
          });
          toast.error(`Upload failed: ${uploadError.message}`);
          throw uploadError;
        }

        // Get public URL using the final path (which may be different for large files)
        const { data: urlData } = supabase.storage
          .from('portal-files')
          .getPublicUrl(finalPath);

        // Generate thumbnail for images and PDFs
        let thumbnailUrl;
        if (FILE_TYPES.image.includes(fileExtension?.toLowerCase() || '')) {
          // For images, use the image itself as thumbnail (should be optimized in production)
          thumbnailUrl = urlData.publicUrl;
        } else if (fileExtension?.toLowerCase() === 'pdf') {
          // Generate PDF thumbnail
          try {
            thumbnailUrl = await generatePDFThumbnail(file);
          } catch (error) {
            console.error('Failed to generate PDF thumbnail:', error);
            // Use a default PDF icon if thumbnail generation fails
            thumbnailUrl = null;
          }
        }

        // Save file metadata to database with enhanced logging
        const fileMetadata = {
          name: file.name,
          type: getFileType(file.name),
          size: file.size,
          url: urlData.publicUrl,
          thumbnail_url: thumbnailUrl,
          folder: folder,
          uploaded_by: user?.id || null, // Safe null handling for RLS
          metadata: {
            original_name: file.name,
            mime_type: file.type,
            upload_timestamp: timestamp
          }
        };

        console.log('💾 Saving file metadata to database:', {
          fileName: file.name,
          uploadedBy: user?.id,
          userEmail: user?.email,
          metadata: fileMetadata
        });

        const { data: dbData, error: dbError } = await supabase
          .from('file_storage')
          .insert([fileMetadata])
          .select()
          .single();

        if (dbError) {
          console.error('❌ Database insert error:', dbError);
          console.error('📝 Failed metadata:', fileMetadata);
          throw dbError;
        }

        console.log('✅ File successfully saved to database:', dbData);
        return dbData;
      } catch (error) {
        console.error('Upload error for file:', file.name, error);
        toast.error(`Upload failed: ${file.name} - ${error.message}`);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(Boolean);

    console.log(`Upload results: ${successfulUploads.length}/${fileList.length} files uploaded successfully`);

    if (successfulUploads.length > 0) {
      await fetchFiles();
      toast.success(`Successfully uploaded ${successfulUploads.length} file(s)`);
    }

    if (successfulUploads.length < fileList.length) {
      const failedCount = fileList.length - successfulUploads.length;
      toast.error(`${failedCount} file(s) failed to upload`);
    }

    setUploading(false);
  };

  // Determine file type from extension
  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';

    for (const [type, extensions] of Object.entries(FILE_TYPES)) {
      if (extensions.includes(extension)) {
        return type;
      }
    }

    return 'other';
  };

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'audio': return Music;
      case 'document': return FileText;
      default: return File;
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Fetch files from database with enhanced debugging
  const fetchFiles = async () => {
    setLoading(true);
    try {
      console.log('🔍 Fetching files for user:', user?.id, user?.email);

      // First, try to fetch all files to see what's in the database
      const { data: allFiles, error: allError } = await supabase
        .from('file_storage')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📁 All files in database:', allFiles?.length || 0, allFiles);

      if (allError) {
        console.error('❌ Error fetching all files:', allError);
        throw allError;
      }

      // Show all files if toggle is on, otherwise filter by user
      let filteredFiles = allFiles || [];
      if (!showAllFiles && user?.id) {
        filteredFiles = allFiles?.filter(file => file.uploaded_by === user.id) || [];
        console.log('👤 Files filtered for current user:', filteredFiles?.length || 0, filteredFiles);
      } else if (showAllFiles) {
        console.log('🌐 Showing all files (debug mode)', filteredFiles?.length || 0);
      }

      setFiles(filteredFiles);

      // Generate missing thumbnails for PDFs in background
      setTimeout(async () => {
        const pdfFiles = filteredFiles.filter(file =>
          file.name.toLowerCase().endsWith('.pdf') && !file.thumbnail_url
        );

        if (pdfFiles.length > 0) {
          console.log(`📄 Starting background thumbnail generation for ${pdfFiles.length} PDF files...`);

          let successCount = 0;
          let failureCount = 0;

          for (const pdfFile of pdfFiles) {
            try {
              console.log(`🔄 Processing ${successCount + failureCount + 1}/${pdfFiles.length}: ${pdfFile.name}`);

              const thumbnailUrl = await generateMissingThumbnail(pdfFile);
              if (thumbnailUrl) {
                // Update the file in state with new thumbnail
                setFiles(prevFiles =>
                  prevFiles.map(f =>
                    f.id === pdfFile.id
                      ? { ...f, thumbnail_url: thumbnailUrl }
                      : f
                  )
                );
                successCount++;
                console.log(`✅ Generated thumbnail for: ${pdfFile.name} (${successCount} of ${pdfFiles.length} completed)`);
              } else {
                failureCount++;
                console.log(`⚠️ Thumbnail generation returned null for: ${pdfFile.name}`);
              }
            } catch (error) {
              failureCount++;
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              console.error(`❌ Failed to generate thumbnail for ${pdfFile.name}:`, errorMessage);

              // Don't show toast errors for background processing to avoid spam
              // but do log detailed information for debugging
              console.error(`   📊 Progress: ${successCount} successful, ${failureCount} failed, ${pdfFiles.length - successCount - failureCount} remaining`);
            }

            // Progressive delay - longer delays after failures to prevent overloading
            const delay = failureCount > 3 ? 2000 : failureCount > 1 ? 1000 : 500;
            await new Promise(resolve => setTimeout(resolve, delay));
          }

          // Final summary
          console.log(`🏁 Background thumbnail generation complete:`);
          console.log(`   ✅ ${successCount} thumbnails generated successfully`);
          console.log(`   ❌ ${failureCount} thumbnails failed`);
          console.log(`   📊 Success rate: ${((successCount / pdfFiles.length) * 100).toFixed(1)}%`);

          if (failureCount > 0) {
            console.log(`   💡 Tip: Use the manual refresh button (⟳) on failed PDFs to retry`);
          }
        }
      }, 1000); // Start after files are displayed

      // Additional debugging for empty results
      if (filteredFiles.length === 0 && allFiles && allFiles.length > 0) {
        console.warn('⚠️ No files found for current user, but files exist in database');
        console.log('🔑 Current user ID:', user?.id);
        console.log('📋 User IDs in database:', Array.from(new Set(allFiles.map(f => f.uploaded_by))));
      }

    } catch (error) {
      console.error('💥 Error fetching files:', error);
      toast.error(`Failed to load files: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter files based on search and filters
  useEffect(() => {
    let filtered = files;

    // Filter by folder
    if (currentFolder !== 'all') {
      filtered = filtered.filter(file => file.folder === currentFolder);
    }

    // Filter by file type
    if (fileTypeFilter !== 'all') {
      filtered = filtered.filter(file => file.type === fileTypeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFiles(filtered);
  }, [files, currentFolder, fileTypeFilter, searchTerm]);

  // Delete file
  const deleteFile = async (fileId: string, fileUrl: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      // Extract file path from URL
      const urlParts = fileUrl.split('/');
      const bucketIndex = urlParts.findIndex(part => part === 'portal-files');
      const filePath = urlParts.slice(bucketIndex + 1).join('/');

      // Delete from storage
      await supabase.storage
        .from('portal-files')
        .remove([filePath]);

      // Delete from database
      await supabase
        .from('file_storage')
        .delete()
        .eq('id', fileId);

      await fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // Copy file URL to clipboard
  const copyFileUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('File URL copied to clipboard');
  };

  // Open portal assignment modal
  const openPortalModal = (file: FileItem) => {
    setSelectedFileForPortal(file);
    setPortalAssignment({
      pillar: 'medication',
      content_type: file.type === 'document' ? 'external_doc' : 'downscale_doc',
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      description: '',
      content_data: {
        file_url: file.url,
        file_id: file.id
      },
      tags: []
    });
    setShowPortalModal(true);
  };

  // Close portal modal
  const closePortalModal = () => {
    setShowPortalModal(false);
    setSelectedFileForPortal(null);
    setPortalAssignment({
      pillar: 'medication',
      content_type: 'external_doc',
      title: '',
      description: '',
      content_data: {},
      tags: []
    });
  };

  // Assign file to portal content
  const assignToPortal = async () => {
    if (!selectedFileForPortal || !user?.id) {
      toast.error('Missing file or user authentication');
      return;
    }

    if (!portalAssignment.title.trim()) {
      toast.error('Please enter a title for the portal content');
      return;
    }

    if (!portalAssignment.subsection || (portalAssignment.subsection === 'custom' && !portalAssignment.customSubsection?.trim())) {
      toast.error('Please select or create a sub-section');
      return;
    }

    setAssigningToPortal(true);

    try {
      // Determine final subsection name
      const finalSubsection = portalAssignment.subsection === 'custom'
        ? portalAssignment.customSubsection?.trim()
        : portalAssignment.subsection;

      // Enhanced content data with subsection and display order
      const enhancedContentData = {
        ...portalAssignment.content_data,
        subsection: finalSubsection,
        displayOrder: portalAssignment.displayOrder || 'normal',
        originalFileName: selectedFileForPortal.name,
        fileType: selectedFileForPortal.type,
        fileSize: selectedFileForPortal.size,
        uploadedAt: selectedFileForPortal.created_at
      };

      const { data, error } = await supabase
        .from('portal_content')
        .insert([
          {
            pillar: portalAssignment.pillar,
            content_type: portalAssignment.content_type,
            title: portalAssignment.title.trim(),
            description: portalAssignment.description.trim() || null,
            content_data: enhancedContentData,
            tags: portalAssignment.tags,
            is_published: true,
            created_by: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success(`File successfully added to ${PORTAL_PILLARS[portalAssignment.pillar].name} → ${finalSubsection}`);
      closePortalModal();
    } catch (error) {
      console.error('Portal assignment error:', error);
      toast.error(`Failed to add to portal: ${error.message}`);
    } finally {
      setAssigningToPortal(false);
    }
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files, currentFolder !== 'all' ? currentFolder : 'other');
    }
  }, [currentFolder]);

  // Load files on component mount and when showAllFiles changes
  useEffect(() => {
    fetchFiles();
  }, [showAllFiles]); // Refetch when toggle changes

  // Also refetch when user changes
  useEffect(() => {
    if (user?.id) {
      fetchFiles();
    }
  }, [user?.id]);

  // Manual thumbnail refresh function - works for ALL PDFs
  const refreshThumbnail = async (file: FileItem) => {
    if (file.type !== 'document' || !file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Thumbnail refresh only available for PDF files');
      return;
    }

    console.log(`🔄 Manual thumbnail refresh requested for: ${file.name}`);
    toast.loading(`Regenerating thumbnail for ${file.name}...`, { id: `thumb-${file.id}` });

    try {
      // Force regeneration by calling generateMissingThumbnail even if thumbnail exists
      const result = await forceRegenerateThumbnail(file);
      if (result) {
        toast.success(`Thumbnail regenerated successfully!`, { id: `thumb-${file.id}` });
        console.log(`✅ Manual refresh completed for: ${file.name}`);

        // Refresh files to show new thumbnail
        await fetchFiles();
      } else {
        console.error(`❌ Manual refresh returned null for: ${file.name}`);
        toast.error(`Failed to regenerate thumbnail - check console for details`, { id: `thumb-${file.id}` });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Manual thumbnail refresh failed for ${file.name}:`, errorMessage);

      // Provide specific error messages based on error type
      let userMessage = 'Thumbnail generation failed';
      if (errorMessage.includes('Authentication')) {
        userMessage = 'Authentication error - please refresh page and try again';
      } else if (errorMessage.includes('Network') || errorMessage.includes('connection')) {
        userMessage = 'Network error - check internet connection and try again';
      } else if (errorMessage.includes('Upload failed')) {
        userMessage = 'Upload failed - server may be busy, try again in a moment';
      } else if (errorMessage.includes('too large')) {
        userMessage = 'PDF file too large for thumbnail generation';
      } else if (errorMessage.includes('Timeout')) {
        userMessage = 'Request timed out - try again with better connection';
      }

      toast.error(`${userMessage}: ${errorMessage}`, {
        id: `thumb-${file.id}`,
        duration: 6000 // Longer duration for error messages
      });
    }
  };

  // Force regenerate thumbnail function - always generates new thumbnail
  const forceRegenerateThumbnail = async (file: FileItem): Promise<string | null> => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'pdf') {
      try {
        console.log(`🔄 Force regenerating thumbnail for: ${file.name}`);

        // Create AbortController for timeout handling
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), 30000); // 30 second timeout

        try {
          // Fetch the PDF file with timeout and error handling
          const response = await fetch(file.url, {
            signal: abortController.signal,
            headers: {
              'Accept': 'application/pdf,*/*',
            }
          });

          clearTimeout(timeoutId);

          // Check if response is ok
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          // Verify content type
          const contentType = response.headers.get('content-type');
          if (contentType && !contentType.includes('pdf') && !contentType.includes('octet-stream')) {
            console.warn(`⚠️  Unexpected content type for ${file.name}: ${contentType}`);
          }

          // Check file size (skip if too large for client-side processing)
          const contentLength = response.headers.get('content-length');
          if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) { // 50MB limit
            throw new Error(`PDF file too large for thumbnail generation: ${(parseInt(contentLength) / 1024 / 1024).toFixed(1)}MB`);
          }

          const blob = await response.blob();

          // Verify blob size
          if (blob.size === 0) {
            throw new Error('Downloaded PDF file is empty');
          }

          console.log(`📄 Processing PDF (${(blob.size / 1024 / 1024).toFixed(1)}MB): ${file.name}`);

          // Generate new thumbnail (this will always show top of document)
          const thumbnailUrl = await generatePDFThumbnail(blob, file.name);

          // Update the database with the new thumbnail
          const { error: updateError } = await supabase
            .from('file_storage')
            .update({ thumbnail_url: thumbnailUrl })
            .eq('id', file.id);

          if (updateError) {
            console.error('Failed to update database with thumbnail URL:', updateError);
            throw updateError;
          }

          console.log(`✅ Successfully force regenerated thumbnail for: ${file.name}`);
          return thumbnailUrl;

        } catch (fetchError) {
          clearTimeout(timeoutId);

          // Handle specific error types
          if (fetchError.name === 'AbortError') {
            throw new Error(`Timeout: PDF download took longer than 30 seconds`);
          } else if (fetchError.name === 'TypeError' && fetchError.message.includes('Failed to fetch')) {
            throw new Error(`Network error: Could not download PDF from server`);
          } else {
            throw fetchError;
          }
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`❌ Failed to force regenerate thumbnail for ${file.name}:`, errorMessage);
        return null;
      }
    }

    return null;
  };

  // Refresh file function - handles ALL file types (PDFs, videos, images, documents, everything)
  const refreshFile = async (file: FileItem) => {
    console.log(`🔄 Refresh requested for ${file.type} file: ${file.name}`);
    toast.loading(`Refreshing ${file.name}...`, { id: `refresh-${file.id}` });

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

      // Handle different file types
      if (file.type === 'document' && fileExtension === 'pdf') {
        // PDF files - regenerate thumbnail
        console.log(`📄 Refreshing PDF thumbnail for: ${file.name}`);
        const thumbnailUrl = await forceRegenerateThumbnail(file);

        if (thumbnailUrl) {
          toast.success(`PDF thumbnail refreshed successfully!`, { id: `refresh-${file.id}` });
          console.log(`✅ PDF thumbnail refresh completed for: ${file.name}`);
        } else {
          toast.error(`Failed to refresh PDF thumbnail`, { id: `refresh-${file.id}` });
          console.error(`❌ PDF thumbnail refresh failed for: ${file.name}`);
        }

      } else if (file.type === 'video') {
        // Video files - refresh metadata and regenerate thumbnail from first frame
        console.log(`🎥 Refreshing video metadata for: ${file.name}`);

        try {
          // Update file metadata in database (refresh last accessed time)
          const { error: updateError } = await supabase
            .from('file_storage')
            .update({
              metadata: {
                ...file.metadata,
                last_refreshed: new Date().toISOString(),
                refresh_count: (file.metadata?.refresh_count || 0) + 1
              }
            })
            .eq('id', file.id);

          if (updateError) throw updateError;

          toast.success(`Video metadata refreshed!`, { id: `refresh-${file.id}` });
          console.log(`✅ Video refresh completed for: ${file.name}`);
        } catch (error) {
          toast.error(`Failed to refresh video metadata`, { id: `refresh-${file.id}` });
          console.error(`❌ Video refresh failed for: ${file.name}`, error);
        }

      } else if (file.type === 'image') {
        // Image files - refresh metadata and optimize if needed
        console.log(`🖼️ Refreshing image metadata for: ${file.name}`);

        try {
          // For images, we can refresh the thumbnail by using the image itself
          // Update metadata and refresh thumbnail URL
          const { error: updateError } = await supabase
            .from('file_storage')
            .update({
              thumbnail_url: file.url, // Images use themselves as thumbnails
              metadata: {
                ...file.metadata,
                last_refreshed: new Date().toISOString(),
                refresh_count: (file.metadata?.refresh_count || 0) + 1
              }
            })
            .eq('id', file.id);

          if (updateError) throw updateError;

          toast.success(`Image metadata refreshed!`, { id: `refresh-${file.id}` });
          console.log(`✅ Image refresh completed for: ${file.name}`);
        } catch (error) {
          toast.error(`Failed to refresh image metadata`, { id: `refresh-${file.id}` });
          console.error(`❌ Image refresh failed for: ${file.name}`, error);
        }

      } else if (file.type === 'audio') {
        // Audio files - refresh metadata
        console.log(`🎵 Refreshing audio metadata for: ${file.name}`);

        try {
          const { error: updateError } = await supabase
            .from('file_storage')
            .update({
              metadata: {
                ...file.metadata,
                last_refreshed: new Date().toISOString(),
                refresh_count: (file.metadata?.refresh_count || 0) + 1
              }
            })
            .eq('id', file.id);

          if (updateError) throw updateError;

          toast.success(`Audio metadata refreshed!`, { id: `refresh-${file.id}` });
          console.log(`✅ Audio refresh completed for: ${file.name}`);
        } catch (error) {
          toast.error(`Failed to refresh audio metadata`, { id: `refresh-${file.id}` });
          console.error(`❌ Audio refresh failed for: ${file.name}`, error);
        }

      } else {
        // Other file types - general metadata refresh
        console.log(`📄 Refreshing metadata for other file type: ${file.name}`);

        try {
          const { error: updateError } = await supabase
            .from('file_storage')
            .update({
              metadata: {
                ...file.metadata,
                last_refreshed: new Date().toISOString(),
                refresh_count: (file.metadata?.refresh_count || 0) + 1,
                file_type: file.type,
                file_extension: fileExtension
              }
            })
            .eq('id', file.id);

          if (updateError) throw updateError;

          toast.success(`File metadata refreshed!`, { id: `refresh-${file.id}` });
          console.log(`✅ File refresh completed for: ${file.name}`);
        } catch (error) {
          toast.error(`Failed to refresh file metadata`, { id: `refresh-${file.id}` });
          console.error(`❌ File refresh failed for: ${file.name}`, error);
        }
      }

      // Refresh the file list to show any updates
      await fetchFiles();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ File refresh failed for ${file.name}:`, errorMessage);
      toast.error(`Refresh failed: ${errorMessage}`, { id: `refresh-${file.id}` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-2">File Management</h1>
          <p className="text-[#fef5e7]">Upload, organize, and manage portal assets</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowAllFiles(!showAllFiles)}
            variant={showAllFiles ? "default" : "outline"}
            className={showAllFiles
              ? "bg-[#b68a71] hover:bg-[#8B6F47] text-white"
              : "border-slate-600 text-[#fef5e7] hover:bg-slate-700"
            }
          >
            <Eye className="h-4 w-4 mr-2" />
            {showAllFiles ? 'Show My Files' : 'Show All Files'}
          </Button>
          <Button
            onClick={fetchFiles}
            variant="outline"
            disabled={loading}
            className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
          >
            <Search className="h-4 w-4 mr-2" />
            {loading ? 'Refreshing...' : 'Refresh Files'}
          </Button>
          <input
            type="file"
            multiple
            onChange={(e) => e.target.files && handleFileUpload(e.target.files, currentFolder !== 'all' ? currentFolder : 'other')}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <span
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#b68a71] hover:bg-[#8B6F47] text-white h-10 py-2 px-4"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Files'}
            </span>
          </label>
        </div>
      </div>

      {/* Active Uploads Progress */}
      {activeUploads.size > 0 && (
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-[#f8fafc]">Active Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from(activeUploads.entries()).map(([fileName, upload]) => {
                const progress = uploadProgress.get(fileName) || 0;
                return (
                  <div key={fileName} className="bg-slate-900 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#f8fafc] text-sm font-medium truncate flex-1 mr-4">
                        {fileName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#fef5e7] text-xs">
                          {progress.toFixed(1)}%
                        </span>
                        <Button
                          onClick={() => cancelUpload(fileName)}
                          variant="destructive"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-[#b68a71] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className="text-[#fef5e7]">Search Files</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by filename..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="folder-filter" className="text-[#fef5e7]">Folder</Label>
              <select
                id="folder-filter"
                value={currentFolder}
                onChange={(e) => setCurrentFolder(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
              >
                <option value="all">All Folders</option>
                {FOLDERS.map(folder => (
                  <option key={folder} value={folder}>
                    {folder.charAt(0).toUpperCase() + folder.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="type-filter" className="text-[#fef5e7]">File Type</Label>
              <select
                id="type-filter"
                value={fileTypeFilter}
                onChange={(e) => setFileTypeFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="document">Documents</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drag and Drop Zone */}
      <Card
        className={`bg-slate-800 border-2 border-dashed transition-colors ${
          dragActive ? 'border-[#b68a71] bg-[#b68a71]/10' : 'border-slate-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-[#fef5e7] mb-2">Drag and drop files here, or click upload button</p>
          <p className="text-sm text-slate-400">Supports images, videos, documents, and more</p>
        </CardContent>
      </Card>

      {/* Files Grid */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">
            Files ({filteredFiles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-[#fef5e7]">Loading files...</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-8">
              <File className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-[#fef5e7]">No files found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);

                return (
                  <div
                    key={file.id}
                    className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-[#b68a71]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#b68a71]/10"
                  >
                    {/* File Preview */}
                    <div className="aspect-video bg-slate-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-slate-700">
                      {file.thumbnail_url ? (
                        <div className="relative w-full h-full">
                          <img
                            src={file.thumbnail_url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          {file.type === 'document' && file.name.toLowerCase().endsWith('.pdf') && (
                            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                              PDF
                            </div>
                          )}
                        </div>
                      ) : file.type === 'document' && file.name.toLowerCase().endsWith('.pdf') ? (
                        <div className="flex flex-col items-center gap-2">
                          <FileIcon className="h-12 w-12 text-slate-400" />
                          <span className="text-xs text-slate-500">Generating thumbnail...</span>
                        </div>
                      ) : (
                        <FileIcon className="h-12 w-12 text-slate-400" />
                      )}
                    </div>

                    {/* File Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-[#f8fafc] text-base leading-tight mb-2" title={file.name}>
                          {file.name.length > 35 ? `${file.name.substring(0, 35)}...` : file.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-[#fef5e7]">
                          <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                            {formatFileSize(file.size)}
                          </span>
                          <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                            {file.type}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">
                          Uploaded: {new Date(file.created_at).toLocaleDateString('en-AU')}
                        </p>
                      </div>

                      {/* File Actions - Improved Layout */}
                      <div className="pt-4 border-t border-slate-700 space-y-3">
                        {/* Top row - Quick Actions */}
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-[#fef5e7] hover:bg-slate-700 px-3 py-2 flex-1"
                            onClick={() => window.open(file.url, '_blank')}
                            title="View file"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-[#fef5e7] hover:bg-slate-700 px-3 py-2 flex-1"
                            onClick={() => copyFileUrl(file.url)}
                            title="Copy URL"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>

                        {/* SECOND ROW - REFRESH BUTTON FOR ALL FILES */}
                        <div className="flex space-x-2">
                          {/* REFRESH BUTTON - APPEARS ON EVERY SINGLE FILE WITHOUT EXCEPTION */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-600 text-green-400 hover:bg-green-900/20 px-3 py-2 flex-1 font-bold"
                            onClick={() => refreshFile(file)}
                            title={`REFRESH ${file.name} - Works for ALL file types: ${file.type}`}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            🔄 REFRESH
                          </Button>
                        </div>

                        {/* Bottom row - Primary Actions */}
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-[#b68a71] hover:bg-[#8B6F47] text-white px-4 py-2 flex-1"
                            onClick={() => openPortalModal(file)}
                            title="Add to Portal"
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Add to Portal
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-900/20 px-3 py-2"
                            onClick={() => deleteFile(file.id, file.url)}
                            title="Delete file"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Portal Assignment Modal */}
      {showPortalModal && selectedFileForPortal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl w-full h-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-slate-700">
              <div>
                <h2 className="text-3xl font-bold text-[#f8fafc] mb-2">Add to Portal</h2>
                <p className="text-[#fef5e7]">Configure where and how this content will appear in the patient portal</p>
              </div>
              <Button
                variant="ghost"
                size="lg"
                onClick={closePortalModal}
                className="text-[#fef5e7] hover:bg-slate-700"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Panel - File Preview */}
              <div className="w-1/3 p-8 border-r border-slate-700 bg-slate-900">
                <h3 className="text-xl font-bold text-[#f8fafc] mb-6">File Preview</h3>

                {/* Large File Preview */}
                <div className="bg-slate-800 rounded-xl p-6 mb-6">
                  <div className="aspect-square bg-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {selectedFileForPortal.thumbnail_url ? (
                      <div className="relative w-full h-full">
                        <img
                          src={selectedFileForPortal.thumbnail_url}
                          alt={selectedFileForPortal.name}
                          className="w-full h-full object-cover"
                        />
                        {selectedFileForPortal.type === 'document' && selectedFileForPortal.name.toLowerCase().endsWith('.pdf') && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                            PDF
                          </div>
                        )}
                      </div>
                    ) : (
                      (() => {
                        const FileIcon = getFileIcon(selectedFileForPortal.type);
                        return <FileIcon className="h-20 w-20 text-slate-400" />;
                      })()
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-[#f8fafc] text-lg leading-tight">
                      {selectedFileForPortal.name}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-[#fef5e7]">
                      <span className="bg-slate-700 px-3 py-1 rounded-full">
                        {formatFileSize(selectedFileForPortal.size)}
                      </span>
                      <span className="bg-slate-700 px-3 py-1 rounded-full">
                        {selectedFileForPortal.type}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Uploaded: {new Date(selectedFileForPortal.created_at).toLocaleDateString('en-AU')}
                    </div>
                  </div>
                </div>

                {/* Placement Preview */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h4 className="font-bold text-[#f8fafc] mb-4">Will appear in:</h4>
                  <div className="space-y-3">
                    <div className="text-[#b68a71] text-lg font-semibold">
                      {PORTAL_PILLARS[portalAssignment.pillar].name}
                    </div>
                    {portalAssignment.subsection && (
                      <div className="text-[#fef5e7] text-base">
                        → {portalAssignment.subsection}
                      </div>
                    )}
                    <div className="text-sm text-slate-400">
                      Content Type: {CONTENT_TYPES[portalAssignment.content_type]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Assignment Controls */}
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl space-y-8">

                  {/* Placement Configuration */}
                  <div>
                    <h3 className="text-xl font-bold text-[#f8fafc] mb-6">Placement Configuration</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Pillar Selection */}
                      <div>
                        <Label className="text-[#fef5e7] mb-3 block text-base font-medium">
                          Portal Section *
                        </Label>
                        <select
                          value={portalAssignment.pillar}
                          onChange={(e) => setPortalAssignment(prev => ({
                            ...prev,
                            pillar: e.target.value as any,
                            subsection: '' // Reset subsection when pillar changes
                          }))}
                          className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-lg px-4 py-3 text-base"
                        >
                          {Object.entries(PORTAL_PILLARS).map(([key, pillar]) => (
                            <option key={key} value={key}>
                              {pillar.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Sub-section Selection */}
                      <div>
                        <Label className="text-[#fef5e7] mb-3 block text-base font-medium">
                          Sub-section *
                        </Label>
                        <select
                          value={portalAssignment.subsection || ''}
                          onChange={(e) => setPortalAssignment(prev => ({
                            ...prev,
                            subsection: e.target.value
                          }))}
                          className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-lg px-4 py-3 text-base"
                        >
                          <option value="">Select a sub-section...</option>
                          {PORTAL_PILLARS[portalAssignment.pillar].subsections.map((subsection) => (
                            <option key={subsection} value={subsection}>
                              {subsection}
                            </option>
                          ))}
                          <option value="custom">+ Create New Sub-section</option>
                        </select>
                      </div>

                      {/* Custom Sub-section Input */}
                      {portalAssignment.subsection === 'custom' && (
                        <div className="lg:col-span-2">
                          <Label className="text-[#fef5e7] mb-3 block text-base font-medium">
                            New Sub-section Name *
                          </Label>
                          <Input
                            value={portalAssignment.customSubsection || ''}
                            onChange={(e) => setPortalAssignment(prev => ({
                              ...prev,
                              customSubsection: e.target.value
                            }))}
                            placeholder="Enter new sub-section name..."
                            className="bg-slate-900 border-slate-700 text-[#f8fafc] text-base py-3"
                          />
                        </div>
                      )}

                      {/* Content Type Selection */}
                      <div>
                        <Label className="text-[#fef5e7] mb-3 block text-base font-medium">
                          Content Type *
                        </Label>
                        <select
                          value={portalAssignment.content_type}
                          onChange={(e) => setPortalAssignment(prev => ({
                            ...prev,
                            content_type: e.target.value as any
                          }))}
                          className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-lg px-4 py-3 text-base"
                        >
                          {Object.entries(CONTENT_TYPES).map(([key, label]) => (
                            <option key={key} value={key}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Display Priority */}
                      <div>
                        <Label className="text-[#fef5e7] mb-3 block text-base font-medium">
                          Display Priority
                        </Label>
                        <select
                          value={portalAssignment.displayOrder || 'normal'}
                          onChange={(e) => setPortalAssignment(prev => ({
                            ...prev,
                            displayOrder: e.target.value
                          }))}
                          className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-lg px-4 py-3 text-base"
                        >
                          <option value="top">Top of section (high priority)</option>
                          <option value="normal">Normal placement</option>
                          <option value="bottom">Bottom of section (low priority)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div>
                    <h3 className="text-xl font-bold text-[#f8fafc] mb-6">Content Details</h3>

                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <Label htmlFor="portal-title" className="text-[#fef5e7] mb-3 block text-base font-medium">
                          Title *
                        </Label>
                        <Input
                          id="portal-title"
                          value={portalAssignment.title}
                          onChange={(e) => setPortalAssignment(prev => ({
                            ...prev,
                            title: e.target.value
                          }))}
                          placeholder="Enter a clear, descriptive title..."
                          className="bg-slate-900 border-slate-700 text-[#f8fafc] text-base py-3"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <Label htmlFor="portal-description" className="text-[#fef5e7] mb-3 block text-base font-medium">
                          Description
                        </Label>
                        <textarea
                          id="portal-description"
                          value={portalAssignment.description}
                          onChange={(e) => setPortalAssignment(prev => ({
                            ...prev,
                            description: e.target.value
                          }))}
                          placeholder="Provide a detailed description of this content and its purpose..."
                          rows={4}
                          className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-lg px-4 py-3 resize-none text-base"
                        />
                      </div>

                      {/* Tags */}
                      <div>
                        <Label className="text-[#fef5e7] mb-3 block text-base font-medium">
                          Search Tags
                        </Label>
                        <Input
                          value={portalAssignment.tags.join(', ')}
                          onChange={(e) => setPortalAssignment(prev => ({
                            ...prev,
                            tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                          }))}
                          placeholder="obesity, weight loss, research, glp-1, medication..."
                          className="bg-slate-900 border-slate-700 text-[#f8fafc] text-base py-3"
                        />
                        <p className="text-sm text-slate-400 mt-2">
                          Separate tags with commas. These help patients find this content when searching.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center p-8 border-t border-slate-700 bg-slate-900">
              <div className="text-sm text-slate-400">
                Changes will be visible to patients immediately after saving
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={closePortalModal}
                  className="border-slate-600 text-[#fef5e7] hover:bg-slate-700 px-8 py-3"
                  size="lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={assignToPortal}
                  disabled={assigningToPortal || !portalAssignment.title.trim() || (!portalAssignment.subsection || portalAssignment.subsection === 'custom' && !portalAssignment.customSubsection?.trim())}
                  className="bg-[#b68a71] hover:bg-[#8B6F47] text-white px-8 py-3"
                  size="lg"
                >
                  {assigningToPortal ? 'Adding to Portal...' : 'Add to Portal'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fef5e7',
            border: '1px solid #475569'
          }
        }}
      />
    </div>
  );
}