-- Create encryption functions for sensitive token data
-- This implements field-level encryption for API tokens using pgcrypto

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a function to encrypt sensitive data
CREATE OR REPLACE FUNCTION encrypt_token(token_value text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  encryption_key text;
BEGIN
  -- Use a secure key from environment or generate one
  -- In production, this should come from a secure environment variable
  encryption_key := COALESCE(current_setting('app.encryption_key', true), 'default_encryption_key_change_in_production');
  
  -- Return encrypted token using pgcrypto
  RETURN encode(encrypt(token_value::bytea, encryption_key::bytea, 'aes'), 'base64');
END;
$$;

-- Create a function to decrypt sensitive data
CREATE OR REPLACE FUNCTION decrypt_token(encrypted_token text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  encryption_key text;
BEGIN
  -- Use the same key used for encryption
  encryption_key := COALESCE(current_setting('app.encryption_key', true), 'default_encryption_key_change_in_production');
  
  -- Return decrypted token
  RETURN convert_from(decrypt(decode(encrypted_token, 'base64'), encryption_key::bytea, 'aes'), 'UTF8');
EXCEPTION
  WHEN OTHERS THEN
    -- Return NULL if decryption fails
    RETURN NULL;
END;
$$;

-- Create functions to safely insert/update encrypted tokens
CREATE OR REPLACE FUNCTION insert_halaxy_link(
  p_user_id uuid,
  p_halaxy_patient_id text,
  p_access_token text,
  p_refresh_token text,
  p_expires_at timestamptz
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  link_id uuid;
BEGIN
  -- Verify the caller has permission to create this link
  IF auth.uid() != p_user_id AND get_user_role(auth.uid()) != ANY(ARRAY['admin'::text, 'practitioner'::text]) THEN
    RAISE EXCEPTION 'Unauthorized: Cannot create Halaxy link for another user';
  END IF;

  INSERT INTO halaxy_links (
    user_id,
    halaxy_patient_id,
    access_token,
    refresh_token,
    expires_at,
    verified_at,
    last_sync_at
  ) VALUES (
    p_user_id,
    p_halaxy_patient_id,
    encrypt_token(p_access_token),
    encrypt_token(p_refresh_token),
    p_expires_at,
    NOW(),
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    halaxy_patient_id = EXCLUDED.halaxy_patient_id,
    access_token = EXCLUDED.access_token,
    refresh_token = EXCLUDED.refresh_token,
    expires_at = EXCLUDED.expires_at,
    verified_at = EXCLUDED.verified_at,
    last_sync_at = EXCLUDED.last_sync_at
  RETURNING id INTO link_id;
  
  RETURN link_id;
END;
$$;

-- Create function to safely update tokens
CREATE OR REPLACE FUNCTION update_halaxy_tokens(
  p_user_id uuid,
  p_access_token text,
  p_refresh_token text,
  p_expires_at timestamptz
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify the caller has permission to update this link
  IF auth.uid() != p_user_id AND get_user_role(auth.uid()) != ANY(ARRAY['admin'::text, 'practitioner'::text]) THEN
    RAISE EXCEPTION 'Unauthorized: Cannot update Halaxy tokens for another user';
  END IF;

  UPDATE halaxy_links 
  SET 
    access_token = encrypt_token(p_access_token),
    refresh_token = encrypt_token(p_refresh_token),
    expires_at = p_expires_at,
    last_sync_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN FOUND;
END;
$$;

-- Create function to safely get decrypted tokens (for edge functions)
CREATE OR REPLACE FUNCTION get_halaxy_tokens(p_user_id uuid)
RETURNS TABLE(
  access_token text,
  refresh_token text,
  expires_at timestamptz,
  is_expired boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    decrypt_token(hl.access_token) as access_token,
    decrypt_token(hl.refresh_token) as refresh_token,
    hl.expires_at,
    (hl.expires_at <= NOW()) as is_expired
  FROM halaxy_links hl
  WHERE hl.user_id = p_user_id;
END;
$$;