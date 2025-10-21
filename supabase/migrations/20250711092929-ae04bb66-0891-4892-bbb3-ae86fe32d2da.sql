-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  author TEXT NOT NULL DEFAULT 'Downscale Health Team',
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  meta_description TEXT,
  reading_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for blog)
CREATE POLICY "Blog posts are publicly readable" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Create policies for authenticated management
CREATE POLICY "Authenticated users can manage all blog posts" 
ON public.blog_posts 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, tags, published, featured) VALUES 
(
  'Understanding GLP-1 Medications for Weight Management',
  'understanding-glp1-medications',
  'A comprehensive guide to GLP-1 receptor agonists and their role in clinical weight management.',
  'GLP-1 receptor agonists have revolutionized the field of weight management medicine. These medications work by mimicking the action of the naturally occurring hormone GLP-1...',
  'medical',
  ARRAY['GLP-1', 'weight loss', 'medication', 'clinical'],
  true,
  true
),
(
  'Evidence-Based Nutrition Strategies for Sustainable Weight Loss',
  'evidence-based-nutrition-strategies',
  'Explore the latest research on nutrition approaches that support long-term weight management success.',
  'Nutrition is the cornerstone of sustainable weight management. Our evidence-based approach focuses on creating flexible, realistic eating patterns...',
  'nutrition',
  ARRAY['nutrition', 'evidence-based', 'weight loss'],
  true,
  false
),
(
  'The Psychology of Sustainable Behavior Change',
  'psychology-sustainable-behavior-change',
  'Understanding the mental and emotional aspects of lasting lifestyle changes.',
  'Successful weight management is as much about psychology as it is about physiology. Understanding the mental patterns and emotional triggers...',
  'mental-health',
  ARRAY['psychology', 'behavior change', 'mental health'],
  true,
  false
);