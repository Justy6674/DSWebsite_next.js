-- Create admin user using the existing function
SELECT public.create_admin_user('downscale@icloud.com', 'IloveBB0307$$');

-- Update the user profile to admin role and add subscription
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Get the user ID for the admin user
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'downscale@icloud.com';
    
    IF admin_user_id IS NOT NULL THEN
        -- Update or insert admin profile
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
            role = 'admin';
            
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
        );
    END IF;
END $$;