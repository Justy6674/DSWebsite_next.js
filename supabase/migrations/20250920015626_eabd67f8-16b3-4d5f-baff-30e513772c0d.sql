-- Enable RLS on all new portal tables and add comprehensive security policies

-- Enable RLS on all portal tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_data_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE quick_script_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE halaxy_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE telecheck_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioner_panels ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_daily ENABLE ROW LEVEL SECURITY;

-- Helper function to check user role without infinite recursion
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role FROM user_profiles WHERE id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- User profiles policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');

-- Portal sessions policies
CREATE POLICY "Users can view their own sessions"
  ON portal_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
  ON portal_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
  ON portal_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Audit logs policies (read-only for compliance)
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (get_user_role(auth.uid()) IN ('admin', 'practitioner'));

CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);

-- Feature flags policies
CREATE POLICY "Anyone can read feature flags"
  ON feature_flags FOR SELECT
  USING (true);

CREATE POLICY "Admins can update feature flags"
  ON feature_flags FOR UPDATE
  USING (get_user_role(auth.uid()) = 'admin');

-- Patient data cache policies
CREATE POLICY "Users can view their own cached data"
  ON patient_data_cache FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND (patient_id = patient_data_cache.patient_id OR role IN ('admin', 'practitioner'))
    )
  );

CREATE POLICY "System can manage patient cache"
  ON patient_data_cache FOR ALL
  USING (true);

-- Quick script requests policies
CREATE POLICY "Patients can view their own requests"
  ON quick_script_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND (patient_id = quick_script_requests.patient_id OR role IN ('admin', 'practitioner'))
    )
  );

CREATE POLICY "Patients can create their own requests"
  ON quick_script_requests FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND patient_id = quick_script_requests.patient_id
    )
  );

CREATE POLICY "Practitioners can update requests"
  ON quick_script_requests FOR UPDATE
  USING (get_user_role(auth.uid()) IN ('admin', 'practitioner'));

-- Clinical tasks policies
CREATE POLICY "Assigned users can view their tasks"
  ON clinical_tasks FOR SELECT
  USING (
    auth.uid() = assigned_to OR
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND (patient_id = clinical_tasks.patient_id OR role IN ('admin', 'practitioner'))
    )
  );

CREATE POLICY "Practitioners can create tasks"
  ON clinical_tasks FOR INSERT
  WITH CHECK (get_user_role(auth.uid()) IN ('admin', 'practitioner'));

CREATE POLICY "Assigned users can update their tasks"
  ON clinical_tasks FOR UPDATE
  USING (
    auth.uid() = assigned_to OR
    get_user_role(auth.uid()) IN ('admin', 'practitioner')
  );

-- Halaxy links policies
CREATE POLICY "Users can view their own Halaxy links"
  ON halaxy_links FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own Halaxy links"
  ON halaxy_links FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Practitioners can view patient Halaxy links"
  ON halaxy_links FOR SELECT
  USING (get_user_role(auth.uid()) IN ('admin', 'practitioner'));

-- Subscriptions policies
CREATE POLICY "Users can view their own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage subscriptions"
  ON subscriptions FOR ALL
  USING (true);

CREATE POLICY "Admins can view all subscriptions"
  ON subscriptions FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');

-- Telecheck logs policies
CREATE POLICY "Users can view their own telecheck logs"
  ON telecheck_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can create telecheck logs"
  ON telecheck_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Practitioners can view patient telecheck logs"
  ON telecheck_logs FOR SELECT
  USING (get_user_role(auth.uid()) IN ('admin', 'practitioner'));

-- Practitioner panels policies
CREATE POLICY "Patients can view their practitioner panels"
  ON practitioner_panels FOR SELECT
  USING (auth.uid() = patient_user_id);

CREATE POLICY "Practitioners can view their patient panels"
  ON practitioner_panels FOR SELECT
  USING (auth.uid() = practitioner_user_id);

CREATE POLICY "Practitioners can create patient panels"
  ON practitioner_panels FOR INSERT
  WITH CHECK (get_user_role(auth.uid()) IN ('admin', 'practitioner'));

-- Documents index policies
CREATE POLICY "Patients can view their documents"
  ON documents_index FOR SELECT
  USING (auth.uid() = patient_user_id);

CREATE POLICY "Practitioners can share documents"
  ON documents_index FOR INSERT
  WITH CHECK (get_user_role(auth.uid()) IN ('admin', 'practitioner'));

CREATE POLICY "Practitioners can update document sharing"
  ON documents_index FOR UPDATE
  USING (get_user_role(auth.uid()) IN ('admin', 'practitioner'));

-- Tracking daily policies
CREATE POLICY "Patients can manage their own tracking data"
  ON tracking_daily FOR ALL
  USING (auth.uid() = patient_user_id)
  WITH CHECK (auth.uid() = patient_user_id);

CREATE POLICY "Practitioners can view patient tracking data"
  ON tracking_daily FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM practitioner_panels 
      WHERE practitioner_user_id = auth.uid() 
      AND patient_user_id = tracking_daily.patient_user_id
    ) OR 
    get_user_role(auth.uid()) IN ('admin', 'practitioner')
  );

-- Helper functions for subscription management
CREATE OR REPLACE FUNCTION get_user_subscription_tier(user_uuid UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT tier FROM subscriptions 
    WHERE user_id = user_uuid 
    AND status = 'active'
    AND current_period_end > NOW()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION has_active_subscription(user_uuid UUID, required_tier TEXT DEFAULT 'basic')
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  tier_hierarchy TEXT[] := ARRAY['freemium', 'basic', 'premium', 'vip'];
  user_tier_level INT;
  required_tier_level INT;
BEGIN
  user_tier := get_user_subscription_tier(user_uuid);
  
  IF user_tier IS NULL THEN
    user_tier := 'freemium';
  END IF;
  
  user_tier_level := array_position(tier_hierarchy, user_tier);
  required_tier_level := array_position(tier_hierarchy, required_tier);
  
  RETURN user_tier_level >= required_tier_level;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;