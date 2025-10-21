-- Fix RLS policy for blog_posts table to allow authenticated users
DROP POLICY IF EXISTS "Authenticated users can manage all blog posts" ON public.blog_posts;

CREATE POLICY "Authenticated users can manage all blog posts" 
ON public.blog_posts 
FOR ALL 
USING (auth.uid() IS NOT NULL) 
WITH CHECK (auth.uid() IS NOT NULL);