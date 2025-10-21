-- Create function to ping Google when blog post is published
CREATE OR REPLACE FUNCTION ping_google_on_publish()
RETURNS TRIGGER AS $$
BEGIN
  -- Only trigger if post is being published (not draft)
  IF NEW.published = true AND (OLD.published IS NULL OR OLD.published = false) THEN
    -- Call edge function to ping Google
    PERFORM
      net.http_post(
        url:='https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/ping-google-sitemap',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}'::jsonb,
        body:='{}'::jsonb
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS blog_publish_ping_trigger ON blog_posts;
CREATE TRIGGER blog_publish_ping_trigger
  AFTER INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION ping_google_on_publish();

-- Enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;