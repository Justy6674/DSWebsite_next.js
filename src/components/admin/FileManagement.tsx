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
  X
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

  // Resumable upload function using TUS protocol
  const uploadLargeFile = async (file: File, folder: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      // Get user session for authentication
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        reject(new Error('Authentication required for large file uploads'));
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
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          authorization: `Bearer ${session.access_token}`,
          'x-upsert': 'true'
        },
        uploadDataDuringCreation: true,
        removeFingerprintOnSuccess: true,
        metadata: {
          bucketName: 'portal-files',
          objectName: objectName,
          contentType: file.type || 'application/octet-stream',
          cacheControl: '3600'
        },
        chunkSize: 6 * 1024 * 1024, // 6MB chunks as required by Supabase
        onError: function (error) {
          console.error('TUS upload failed:', error);
          toast.error(`Upload failed: ${error.message}`);
          reject(error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(1);
          toast.loading(`Uploading ${file.name}: ${percentage}%`, {
            id: `upload-${file.name}`,
            duration: Infinity
          });
        },
        onSuccess: function () {
          console.log('TUS upload completed for:', file.name);
          toast.success(`Upload completed: ${file.name}`, { id: `upload-${file.name}` });
          resolve(objectName);
        }
      });

      // Check for previous uploads and resume if available
      upload.findPreviousUploads().then(function (previousUploads) {
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }
        upload.start();
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
          // Standard upload for files ≤6MB
          console.log('Using standard upload (≤6MB)');
          toast.loading(`Uploading ${file.name}...`, { id: `upload-${file.name}` });

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

        // Generate thumbnail for images
        let thumbnailUrl;
        if (FILE_TYPES.image.includes(fileExtension?.toLowerCase() || '')) {
          // In a real implementation, you'd generate thumbnails
          thumbnailUrl = urlData.publicUrl;
        }

        // Save file metadata to database
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

        const { data: dbData, error: dbError } = await supabase
          .from('file_storage')
          .insert([fileMetadata])
          .select()
          .single();

        if (dbError) {
          console.error('Database insert error:', dbError);
          throw dbError;
        }

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

  // Fetch files from database
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('file_storage')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
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

  // Load files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-2">File Management</h1>
          <p className="text-[#fef5e7]">Upload, organize, and manage portal assets</p>
        </div>
        <div className="flex space-x-2">
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
                      {file.type === 'image' && file.thumbnail_url ? (
                        <img
                          src={file.thumbnail_url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
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

                      {/* File Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-[#fef5e7] hover:bg-slate-700 px-3 py-2"
                            onClick={() => window.open(file.url, '_blank')}
                            title="View file"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-[#fef5e7] hover:bg-slate-700 px-3 py-2"
                            onClick={() => copyFileUrl(file.url)}
                            title="Copy URL"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-[#b68a71] hover:bg-[#8B6F47] text-white px-4 py-2"
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
                    {selectedFileForPortal.type === 'image' && selectedFileForPortal.thumbnail_url ? (
                      <img
                        src={selectedFileForPortal.thumbnail_url}
                        alt={selectedFileForPortal.name}
                        className="w-full h-full object-cover"
                      />
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