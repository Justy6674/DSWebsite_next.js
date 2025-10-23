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
}

interface PortalCategoryAssignment {
  pillar: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop' | 'medication';
  content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide';
  title: string;
  description: string;
  content_data: PortalContentData;
  tags: string[];
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

    setAssigningToPortal(true);

    try {
      const { data, error } = await supabase
        .from('portal_content')
        .insert([
          {
            pillar: portalAssignment.pillar,
            content_type: portalAssignment.content_type,
            title: portalAssignment.title.trim(),
            description: portalAssignment.description.trim() || null,
            content_data: portalAssignment.content_data,
            tags: portalAssignment.tags,
            is_published: true,
            created_by: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success(`File successfully added to ${PORTAL_PILLARS[portalAssignment.pillar].name} portal section`);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);

                return (
                  <div
                    key={file.id}
                    className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    {/* File Preview */}
                    <div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {file.type === 'image' && file.thumbnail_url ? (
                        <img
                          src={file.thumbnail_url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileIcon className="h-8 w-8 text-slate-400" />
                      )}
                    </div>

                    {/* File Info */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-[#f8fafc] text-sm truncate" title={file.name}>
                        {file.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-[#fef5e7]">
                        <span>{formatFileSize(file.size)}</span>
                        <span className="bg-slate-700 px-2 py-1 rounded">{file.type}</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {new Date(file.created_at).toLocaleDateString('en-AU')}
                      </p>
                    </div>

                    {/* File Actions */}
                    <div className="flex justify-between mt-3 pt-3 border-t border-slate-700">
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-[#fef5e7] hover:bg-slate-700 p-1"
                          onClick={() => window.open(file.url, '_blank')}
                          title="View file"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-[#fef5e7] hover:bg-slate-700 p-1"
                          onClick={() => copyFileUrl(file.url)}
                          title="Copy URL"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#b68a71] text-[#b68a71] hover:bg-[#b68a71]/20 p-1"
                          onClick={() => openPortalModal(file)}
                          title="Add to Portal"
                        >
                          <BookOpen className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-900/20 p-1"
                        onClick={() => deleteFile(file.id, file.url)}
                        title="Delete file"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#f8fafc]">Add to Portal</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closePortalModal}
                  className="text-[#fef5e7] hover:bg-slate-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* File Preview */}
              <div className="bg-slate-900 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  {selectedFileForPortal.type === 'image' && selectedFileForPortal.thumbnail_url ? (
                    <img
                      src={selectedFileForPortal.thumbnail_url}
                      alt={selectedFileForPortal.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-slate-700 rounded flex items-center justify-center">
                      {(() => {
                        const FileIcon = getFileIcon(selectedFileForPortal.type);
                        return <FileIcon className="h-6 w-6 text-slate-400" />;
                      })()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-[#f8fafc]">{selectedFileForPortal.name}</h3>
                    <p className="text-sm text-[#fef5e7]">
                      {formatFileSize(selectedFileForPortal.size)} • {selectedFileForPortal.type}
                    </p>
                  </div>
                </div>
              </div>

              {/* Portal Assignment Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pillar Selection */}
                  <div>
                    <Label className="text-[#fef5e7] mb-2 block">Portal Section</Label>
                    <select
                      value={portalAssignment.pillar}
                      onChange={(e) => setPortalAssignment(prev => ({
                        ...prev,
                        pillar: e.target.value as any
                      }))}
                      className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
                    >
                      {Object.entries(PORTAL_PILLARS).map(([key, pillar]) => (
                        <option key={key} value={key}>
                          {pillar.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Content Type Selection */}
                  <div>
                    <Label className="text-[#fef5e7] mb-2 block">Content Type</Label>
                    <select
                      value={portalAssignment.content_type}
                      onChange={(e) => setPortalAssignment(prev => ({
                        ...prev,
                        content_type: e.target.value as any
                      }))}
                      className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
                    >
                      {Object.entries(CONTENT_TYPES).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sub-section Info */}
                <div className="bg-slate-900 rounded-lg p-4">
                  <h4 className="font-medium text-[#f8fafc] mb-2">
                    Will appear in: {PORTAL_PILLARS[portalAssignment.pillar].name}
                  </h4>
                  <p className="text-sm text-[#fef5e7] mb-3">Available sub-sections:</p>
                  <div className="flex flex-wrap gap-2">
                    {PORTAL_PILLARS[portalAssignment.pillar].subsections.map((subsection) => (
                      <span
                        key={subsection}
                        className="bg-slate-700 text-[#fef5e7] px-2 py-1 rounded text-xs"
                      >
                        {subsection}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <Label htmlFor="portal-title" className="text-[#fef5e7] mb-2 block">
                    Title *
                  </Label>
                  <Input
                    id="portal-title"
                    value={portalAssignment.title}
                    onChange={(e) => setPortalAssignment(prev => ({
                      ...prev,
                      title: e.target.value
                    }))}
                    placeholder="Enter a title for this content..."
                    className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="portal-description" className="text-[#fef5e7] mb-2 block">
                    Description
                  </Label>
                  <textarea
                    id="portal-description"
                    value={portalAssignment.description}
                    onChange={(e) => setPortalAssignment(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    placeholder="Enter a description for this content..."
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2 resize-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-[#fef5e7] mb-2 block">Tags (comma-separated)</Label>
                  <Input
                    value={portalAssignment.tags.join(', ')}
                    onChange={(e) => setPortalAssignment(prev => ({
                      ...prev,
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    }))}
                    placeholder="obesity, weight loss, research, glp-1..."
                    className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-slate-700">
                <Button
                  variant="outline"
                  onClick={closePortalModal}
                  className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={assignToPortal}
                  disabled={assigningToPortal || !portalAssignment.title.trim()}
                  className="bg-[#b68a71] hover:bg-[#8B6F47] text-white"
                >
                  {assigningToPortal ? 'Adding...' : 'Add to Portal'}
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