-- CRITICAL SECURITY FIX: Secure website crawling data access
-- Add user_id columns to associate crawl data with users

-- Add user_id to website_crawls table
ALTER TABLE public.website_crawls 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id to crawled_pages table  
ALTER TABLE public.crawled_pages 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop the dangerous public access policies
DROP POLICY IF EXISTS "Authenticated users can manage website crawls" ON public.website_crawls;
DROP POLICY IF EXISTS "Authenticated users can manage crawled pages" ON public.crawled_pages;

-- Create secure RLS policies for website_crawls
CREATE POLICY "Users can view their own crawls only" 
ON public.website_crawls 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own crawls only" 
ON public.website_crawls 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own crawls only" 
ON public.website_crawls 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own crawls only" 
ON public.website_crawls 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create secure RLS policies for crawled_pages
CREATE POLICY "Users can view their own crawled pages only" 
ON public.crawled_pages 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own crawled pages only" 
ON public.crawled_pages 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own crawled pages only" 
ON public.crawled_pages 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own crawled pages only" 
ON public.crawled_pages 
FOR DELETE 
USING (auth.uid() = user_id);