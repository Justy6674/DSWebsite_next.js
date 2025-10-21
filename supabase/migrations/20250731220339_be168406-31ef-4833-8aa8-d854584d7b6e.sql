-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to trigger sitemap regeneration
CREATE OR REPLACE FUNCTION public.trigger_sitemap_update()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call the generate-sitemap edge function
  SELECT net.http_post(
    url := 'https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/generate-sitemap',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8"}'::jsonb,
    body := '{}'::jsonb
  );
END;
$$;

-- Create trigger function for blog posts
CREATE OR REPLACE FUNCTION public.update_sitemap_on_blog_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only trigger for published posts
  IF (TG_OP = 'INSERT' AND NEW.status = 'published') OR 
     (TG_OP = 'UPDATE' AND NEW.status = 'published' AND OLD.status != 'published') OR
     (TG_OP = 'UPDATE' AND NEW.status != 'published' AND OLD.status = 'published') OR
     (TG_OP = 'DELETE' AND OLD.status = 'published') THEN
    
    PERFORM public.trigger_sitemap_update();
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger on blog_posts table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blog_posts') THEN
    DROP TRIGGER IF EXISTS blog_sitemap_update_trigger ON blog_posts;
    CREATE TRIGGER blog_sitemap_update_trigger
      AFTER INSERT OR UPDATE OR DELETE ON blog_posts
      FOR EACH ROW
      EXECUTE FUNCTION public.update_sitemap_on_blog_change();
  END IF;
END $$;

-- Schedule daily sitemap regeneration at 2 AM
SELECT cron.schedule(
  'daily-sitemap-update',
  '0 2 * * *',
  $$
  SELECT public.trigger_sitemap_update();
  $$
);