-- Fix the update_sitemap_on_blog_change function to use 'published' instead of 'status'
CREATE OR REPLACE FUNCTION public.update_sitemap_on_blog_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Only trigger for published posts - using 'published' field instead of 'status'
  IF (TG_OP = 'INSERT' AND NEW.published = true) OR 
     (TG_OP = 'UPDATE' AND NEW.published = true AND OLD.published != true) OR
     (TG_OP = 'UPDATE' AND NEW.published != true AND OLD.published = true) OR
     (TG_OP = 'DELETE' AND OLD.published = true) THEN
    
    PERFORM public.trigger_sitemap_update();
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;