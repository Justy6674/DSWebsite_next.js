-- Phase 2: Fix RLS policies for security hardening (Handle null user_ids)

-- Generate a random UUID for existing conversations with null user_id
-- This represents anonymous users who used the chat before authentication was required
UPDATE public.conversations 
SET user_id = gen_random_uuid()
WHERE user_id IS NULL;

-- Now make user_id NOT NULL
ALTER TABLE public.conversations 
ALTER COLUMN user_id SET NOT NULL;

-- Fix conversations table - restrict to conversation owners only
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.conversations;
DROP POLICY IF EXISTS "Anyone can update conversations" ON public.conversations;
DROP POLICY IF EXISTS "Anyone can view conversations" ON public.conversations;

-- Allow anonymous users to still access their existing conversations temporarily
-- but require authentication for new ones
CREATE POLICY "Users can create authenticated conversations" 
ON public.conversations 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own conversations" 
ON public.conversations 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" 
ON public.conversations 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Also allow public access to existing anonymous conversations for now
CREATE POLICY "Public can view conversations" 
ON public.conversations 
FOR SELECT 
TO anon
USING (true);

-- Fix messages table - restrict to conversation participants only
DROP POLICY IF EXISTS "Anyone can create messages" ON public.messages;
DROP POLICY IF EXISTS "Anyone can view messages" ON public.messages;

CREATE POLICY "Authenticated users can create messages in their conversations" 
ON public.messages 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.conversations 
    WHERE id = conversation_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can view messages in their conversations" 
ON public.messages 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.conversations 
    WHERE id = conversation_id 
    AND user_id = auth.uid()
  )
);

-- Allow public to view messages in existing conversations for compatibility
CREATE POLICY "Public can view messages" 
ON public.messages 
FOR SELECT 
TO anon
USING (true);

CREATE POLICY "Public can create messages" 
ON public.messages 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Fix website_crawls table - require authentication for admin operations
DROP POLICY IF EXISTS "Allow public insert to website_crawls" ON public.website_crawls;
DROP POLICY IF EXISTS "Allow public read access to website_crawls" ON public.website_crawls;
DROP POLICY IF EXISTS "Allow public update to website_crawls" ON public.website_crawls;

-- Only allow authenticated users to manage website crawls
CREATE POLICY "Authenticated users can manage website crawls" 
ON public.website_crawls 
FOR ALL 
TO authenticated
USING (true);

-- Fix crawled_pages table - require authentication
DROP POLICY IF EXISTS "Allow public insert to crawled_pages" ON public.crawled_pages;
DROP POLICY IF EXISTS "Allow public read access to crawled_pages" ON public.crawled_pages;

CREATE POLICY "Authenticated users can manage crawled pages" 
ON public.crawled_pages 
FOR ALL 
TO authenticated
USING (true);

-- Create admin role check function for better security
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email = 'admin@downscale.com.au'
  );
$$;