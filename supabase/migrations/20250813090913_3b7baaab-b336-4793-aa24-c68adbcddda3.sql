-- Fix the database functions to properly update sitemap when blog posts change

-- Fix trigger_sitemap_update function to use PERFORM instead of SELECT
CREATE OR REPLACE FUNCTION public.trigger_sitemap_update()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Call the generate-sitemap edge function using PERFORM (not SELECT)
  PERFORM net.http_post(
    url := 'https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/generate-sitemap',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8"}'::jsonb,
    body := '{}'::jsonb
  );
  
  -- Also ping search engines about the update using PERFORM
  PERFORM public.ping_search_engines();
END;
$function$;

-- Fix ping_search_engines function to use PERFORM instead of SELECT
CREATE OR REPLACE FUNCTION public.ping_search_engines()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Ping Google and Bing about sitemap updates using PERFORM (not SELECT)
  PERFORM net.http_post(
    url := 'https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/ping-google-sitemap',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8"}'::jsonb,
    body := '{}'::jsonb
  );
END;
$function$;

-- Recreate the trigger on blog_posts table to ensure it fires on publish changes
DROP TRIGGER IF EXISTS trigger_blog_sitemap_update ON public.blog_posts;
CREATE TRIGGER trigger_blog_sitemap_update
  AFTER INSERT OR UPDATE OR DELETE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_sitemap_on_blog_change();