-- DS.H Healthcare Platform Row Level Security Policies
-- HIPAA-compliant access control

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_data_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE quick_script_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_tasks ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

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
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true); -- System-level inserts allowed

-- Feature flags policies
CREATE POLICY "Anyone can read feature flags"
  ON feature_flags FOR SELECT
  USING (true);

CREATE POLICY "Admins can update feature flags"
  ON feature_flags FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

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
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

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
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

CREATE POLICY "Assigned users can update their tasks"
  ON clinical_tasks FOR UPDATE
  USING (
    auth.uid() = assigned_to OR
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    resource_type,
    resource_id,
    details
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id::text, OLD.id::text),
    CASE 
      WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
      ELSE row_to_json(NEW)
    END
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add audit triggers to sensitive tables
CREATE TRIGGER audit_user_profiles_trigger
  AFTER INSERT OR UPDATE OR DELETE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_quick_script_requests_trigger
  AFTER INSERT OR UPDATE OR DELETE ON quick_script_requests
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_clinical_tasks_trigger
  AFTER INSERT OR UPDATE OR DELETE ON clinical_tasks
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();