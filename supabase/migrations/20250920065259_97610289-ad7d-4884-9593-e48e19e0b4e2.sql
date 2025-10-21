-- Create admin user account
-- Note: This directly inserts into auth.users which should only be done for admin setup
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
  'downscale@icloud.com',
  crypt('IloveBB0307$$', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"first_name":"Admin","last_name":"User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Get the user ID for the admin user
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'downscale@icloud.com';
    
    IF admin_user_id IS NOT NULL THEN
        -- Create admin profile if it doesn't exist
        INSERT INTO public.user_profiles (
            id,
            email,
            role,
            first_name,
            last_name
        ) VALUES (
            admin_user_id,
            'downscale@icloud.com',
            'admin',
            'Admin',
            'User'
        ) ON CONFLICT (id) DO UPDATE SET
            role = 'admin',
            email = 'downscale@icloud.com';
            
        -- Create admin subscription
        INSERT INTO public.subscriptions (
            user_id,
            tier,
            status,
            source
        ) VALUES (
            admin_user_id,
            'vip',
            'active',
            'direct'
        ) ON CONFLICT (user_id) DO UPDATE SET
            tier = 'vip',
            status = 'active';
    END IF;
END $$;