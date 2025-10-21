-- Extend the existing portal infrastructure with missing tables for Phase 1

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

-- Enable RLS on all new tables
ALTER TABLE halaxy_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE telecheck_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioner_panels ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_daily ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
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

-- Add triggers for updated_at columns
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tracking_daily_updated_at BEFORE UPDATE ON tracking_daily FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for halaxy_links
CREATE POLICY "Users can view their own Halaxy links"
  ON halaxy_links FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own Halaxy links"
  ON halaxy_links FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Practitioners can view patient Halaxy links"
  ON halaxy_links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can update subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update subscription status"
  ON subscriptions FOR UPDATE
  USING (true);

CREATE POLICY "Admins can view all subscriptions"
  ON subscriptions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for telecheck_logs
CREATE POLICY "Users can view their own telecheck logs"
  ON telecheck_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can create telecheck logs"
  ON telecheck_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Practitioners can view patient telecheck logs"
  ON telecheck_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

-- RLS Policies for practitioner_panels
CREATE POLICY "Patients can view their practitioner panels"
  ON practitioner_panels FOR SELECT
  USING (auth.uid() = patient_user_id);

CREATE POLICY "Practitioners can view their patient panels"
  ON practitioner_panels FOR SELECT
  USING (auth.uid() = practitioner_user_id);

CREATE POLICY "Practitioners can create patient panels"
  ON practitioner_panels FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

-- RLS Policies for documents_index
CREATE POLICY "Patients can view their documents"
  ON documents_index FOR SELECT
  USING (auth.uid() = patient_user_id);

CREATE POLICY "Practitioners can share documents"
  ON documents_index FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

CREATE POLICY "Practitioners can update document sharing"
  ON documents_index FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

-- RLS Policies for tracking_daily
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
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
    )
  );

-- Helper function to get user's subscription tier
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has active subscription
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
$$ LANGUAGE plpgsql SECURITY DEFINER;