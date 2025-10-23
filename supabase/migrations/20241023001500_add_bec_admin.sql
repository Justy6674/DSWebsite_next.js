-- Add Bec as admin user
-- Create admin user account for b.burstow83@gmail.com
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
  'b.burstow83@gmail.com',
  crypt('IloveJB0606$$', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"first_name":"Bec","last_name":"Burstow"}',
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
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'b.burstow83@gmail.com';

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
            'b.burstow83@gmail.com',
            'admin',
            'Bec',
            'Burstow'
        ) ON CONFLICT (id) DO UPDATE SET
            role = 'admin',
            email = 'b.burstow83@gmail.com';

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