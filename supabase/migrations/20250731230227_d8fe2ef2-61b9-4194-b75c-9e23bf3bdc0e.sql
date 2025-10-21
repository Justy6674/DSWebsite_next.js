-- Fix search_path security issues for functions
CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email = 'admin@downscale.com.au'
  );
$function$;

CREATE OR REPLACE FUNCTION public.trigger_sitemap_update()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Call the generate-sitemap edge function
  SELECT net.http_post(
    url := 'https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/generate-sitemap',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8"}'::jsonb,
    body := '{}'::jsonb
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_sitemap_on_blog_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_admin_user(email text, password text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  user_id uuid;
BEGIN
  -- Insert user into auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    email,
    crypt(password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );
END;
$function$;