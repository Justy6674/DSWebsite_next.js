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
  MoreHorizontal
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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

  // File upload handling
  const handleFileUpload = async (fileList: FileList, folder: string = 'other') => {
    if (!fileList.length) return;

    setUploading(true);
    const uploadPromises = Array.from(fileList).map(async (file) => {
      try {
        // Generate unique filename
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop();
        const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = `${folder}/${fileName}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('portal-files')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          throw uploadError;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('portal-files')
          .getPublicUrl(filePath);

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
          uploaded_by: user?.id || 'unknown',
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
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(Boolean);

    console.log(`Upload results: ${successfulUploads.length}/${fileList.length} files uploaded successfully`);

    if (successfulUploads.length > 0) {
      await fetchFiles();
    }

    if (successfulUploads.length < fileList.length) {
      console.warn(`${fileList.length - successfulUploads.length} files failed to upload`);
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
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-[#fef5e7] hover:bg-slate-700 p-1"
                          onClick={() => copyFileUrl(file.url)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-900/20 p-1"
                        onClick={() => deleteFile(file.id, file.url)}
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
    </div>
  );
}