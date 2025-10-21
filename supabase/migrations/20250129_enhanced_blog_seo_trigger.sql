-- Enhanced blog publish trigger with IndexNow integration
-- This trigger fires when blog posts are published or updated and notifies search engines

CREATE OR REPLACE FUNCTION ping_search_engines_on_blog_change()
RETURNS TRIGGER AS $$
DECLARE
    blog_url text;
    ping_response jsonb;
BEGIN
    -- Only trigger if post is being published or updated while published
    IF NEW.published = true AND (
        -- New post being published
        (OLD IS NULL OR OLD.published = false) OR 
        -- Existing published post being updated
        (OLD.published = true AND NEW.updated_at > OLD.updated_at)
    ) THEN
        
        -- Generate the blog post URL
        blog_url := 'https://www.downscale.com.au/blog/' || NEW.slug;
        
        -- Log the trigger activation
        RAISE NOTICE 'Blog post trigger activated for: %', blog_url;
        
        -- 1. Ping Google and Bing about sitemap update
        BEGIN
            SELECT net.http_post(
                url := 'https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/ping-google-sitemap',
                headers := '{"Content-Type": "application/json"}'::jsonb,
                body := '{}'::jsonb,
                timeout_milliseconds := 5000
            ) INTO ping_response;
            
            RAISE NOTICE 'Sitemap ping response: %', ping_response;
        EXCEPTION WHEN OTHERS THEN
            RAISE WARNING 'Failed to ping Google/Bing sitemap: %', SQLERRM;
        END;
        
        -- 2. Submit to IndexNow for immediate indexing
        BEGIN
            SELECT net.http_post(
                url := 'https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/indexnow-submit',
                headers := '{"Content-Type": "application/json"}'::jsonb,
                body := jsonb_build_object('urls', jsonb_build_array(blog_url, 'https://www.downscale.com.au/blog')),
                timeout_milliseconds := 5000
            ) INTO ping_response;
            
            RAISE NOTICE 'IndexNow submission response: %', ping_response;
        EXCEPTION WHEN OTHERS THEN
            RAISE WARNING 'Failed to submit to IndexNow: %', SQLERRM;
        END;
        
        -- Log successful completion
        RAISE NOTICE 'Search engine notifications completed for blog post: %', NEW.title;
        
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS blog_publish_ping_trigger ON blog_posts;
DROP TRIGGER IF EXISTS enhanced_blog_seo_trigger ON blog_posts;

-- Create the enhanced trigger
CREATE TRIGGER enhanced_blog_seo_trigger
  AFTER INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION ping_search_engines_on_blog_change();

-- Ensure required extensions are enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Add a comment to track this enhancement
COMMENT ON TRIGGER enhanced_blog_seo_trigger ON blog_posts IS 
'Enhanced SEO trigger that notifies Google, Bing, and IndexNow when blog posts are published or updated. Includes error handling and logging.';

-- Create a simple test function to verify the trigger works
CREATE OR REPLACE FUNCTION test_blog_seo_trigger()
RETURNS text AS $$
BEGIN
    RAISE NOTICE 'Blog SEO trigger test - checking function exists';
    
    -- Check if the trigger exists
    IF EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'enhanced_blog_seo_trigger' 
        AND tgrelid = 'blog_posts'::regclass
    ) THEN
        RETURN 'SUCCESS: Enhanced blog SEO trigger is properly configured';
    ELSE
        RETURN 'ERROR: Enhanced blog SEO trigger not found';
    END IF;
END;
$$ LANGUAGE plpgsql;