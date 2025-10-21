-- Fix storage policies for blog images to allow uploads without authentication
-- since the blog admin has its own password protection

DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;

-- Create more permissive policies for the blog admin
CREATE POLICY "Anyone can upload blog images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Anyone can update blog images" ON storage.objects
FOR UPDATE USING (bucket_id = 'blog-images');

CREATE POLICY "Anyone can delete blog images" ON storage.objects
FOR DELETE USING (bucket_id = 'blog-images');