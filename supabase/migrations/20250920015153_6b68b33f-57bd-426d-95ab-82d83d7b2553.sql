-- DS.H Healthcare Platform Database Migrations
-- Phase 1: Portal Infrastructure Setup

-- User profiles table for portal access
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('patient', 'admin', 'practitioner')),
  patient_id TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patient portal sessions
CREATE TABLE IF NOT EXISTS portal_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log for healthcare compliance
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feature flags table
CREATE TABLE IF NOT EXISTS feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flag_name TEXT UNIQUE NOT NULL,
  is_enabled BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default feature flags
INSERT INTO feature_flags (flag_name, is_enabled, description) VALUES
  ('portal_enabled', FALSE, 'Enable patient portal access'),
  ('admin_enabled', FALSE, 'Enable admin portal access')
ON CONFLICT (flag_name) DO NOTHING;

-- Patient data cache (for Halaxy integration)
CREATE TABLE IF NOT EXISTS patient_data_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT NOT NULL,
  data_type TEXT NOT NULL,
  data JSONB NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quick script requests (Phase 2 preparation)
CREATE TABLE IF NOT EXISTS quick_script_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT NOT NULL,
  request_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'processed')),
  request_data JSONB,
  clinician_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task management for clinical workflows (Phase 2 preparation)
CREATE TABLE IF NOT EXISTS clinical_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT NOT NULL,
  task_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to UUID REFERENCES auth.users(id),
  task_data JSONB,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Halaxy patient linking system
CREATE TABLE IF NOT EXISTS halaxy_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  halaxy_patient_id TEXT NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, halaxy_patient_id)
);

-- Subscription management for tier gating
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('freemium', 'basic', 'premium', 'vip')),
  source TEXT NOT NULL CHECK (source IN ('shopify', 'stripe')),
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'cancelled', 'past_due')),
  external_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Telecheck eligibility logging for compliance
CREATE TABLE IF NOT EXISTS telecheck_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  check_type TEXT NOT NULL,
  inputs JSONB NOT NULL,
  outcome JSONB NOT NULL,
  medicare_eligible BOOLEAN,
  private_eligible BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practitioner-patient relationships
CREATE TABLE IF NOT EXISTS practitioner_panels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_user_id UUID REFERENCES auth.users(id) NOT NULL,
  practitioner_user_id UUID REFERENCES auth.users(id) NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(patient_user_id, practitioner_user_id)
);

-- Document sharing index
CREATE TABLE IF NOT EXISTS documents_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_user_id UUID REFERENCES auth.users(id) NOT NULL,
  halaxy_document_id TEXT NOT NULL,
  document_type TEXT NOT NULL,
  title TEXT,
  shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_new BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patient tracking data
CREATE TABLE IF NOT EXISTS tracking_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_user_id UUID REFERENCES auth.users(id) NOT NULL,
  tracking_date DATE NOT NULL,
  weight_kg DECIMAL(5,2),
  waist_cm DECIMAL(5,2),
  hydration_ml INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(patient_user_id, tracking_date)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_patient_data_cache_patient_id ON patient_data_cache(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_data_cache_expires_at ON patient_data_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_quick_script_requests_patient_id ON quick_script_requests(patient_id);
CREATE INDEX IF NOT EXISTS idx_quick_script_requests_status ON quick_script_requests(status);
CREATE INDEX IF NOT EXISTS idx_clinical_tasks_patient_id ON clinical_tasks(patient_id);
CREATE INDEX IF NOT EXISTS idx_clinical_tasks_status ON clinical_tasks(status);
CREATE INDEX IF NOT EXISTS idx_clinical_tasks_assigned_to ON clinical_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_halaxy_links_user_id ON halaxy_links(user_id);
CREATE INDEX IF NOT EXISTS idx_halaxy_links_patient_id ON halaxy_links(halaxy_patient_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_telecheck_logs_user_id ON telecheck_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_telecheck_logs_created_at ON telecheck_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_practitioner_panels_patient ON practitioner_panels(patient_user_id);
CREATE INDEX IF NOT EXISTS idx_practitioner_panels_practitioner ON practitioner_panels(practitioner_user_id);
CREATE INDEX IF NOT EXISTS idx_documents_index_patient ON documents_index(patient_user_id);
CREATE INDEX IF NOT EXISTS idx_documents_index_shared_at ON documents_index(shared_at);
CREATE INDEX IF NOT EXISTS idx_tracking_daily_patient ON tracking_daily(patient_user_id);
CREATE INDEX IF NOT EXISTS idx_tracking_daily_date ON tracking_daily(tracking_date);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON feature_flags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quick_script_requests_updated_at BEFORE UPDATE ON quick_script_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clinical_tasks_updated_at BEFORE UPDATE ON clinical_tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tracking_daily_updated_at BEFORE UPDATE ON tracking_daily FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();