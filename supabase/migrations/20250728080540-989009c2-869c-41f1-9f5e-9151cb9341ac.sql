-- Create tables for website crawling and content storage
CREATE TABLE public.website_crawls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  job_id TEXT,
  status TEXT NOT NULL DEFAULT 'processing',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT
);

CREATE TABLE public.crawled_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  crawl_id UUID REFERENCES public.website_crawls(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  content TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_crawls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crawled_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is for chatbot knowledge)
CREATE POLICY "Allow public read access to website_crawls" 
ON public.website_crawls 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to website_crawls" 
ON public.website_crawls 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to website_crawls" 
ON public.website_crawls 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public read access to crawled_pages" 
ON public.crawled_pages 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to crawled_pages" 
ON public.crawled_pages 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_website_crawls_url ON public.website_crawls(url);
CREATE INDEX idx_website_crawls_status ON public.website_crawls(status);
CREATE INDEX idx_crawled_pages_crawl_id ON public.crawled_pages(crawl_id);
CREATE INDEX idx_crawled_pages_url ON public.crawled_pages(url);