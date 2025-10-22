-- Admin Features Database Schema
-- Comprehensive tables for admin dashboard functionality

-- File Storage Table
CREATE TABLE IF NOT EXISTS public.file_storage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    size BIGINT NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    folder VARCHAR(100) NOT NULL DEFAULT 'other',
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update user_profiles table with additional admin fields
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium')),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS last_sign_in_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- AI Generated Content Table
CREATE TABLE IF NOT EXISTS public.ai_generated_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template_type VARCHAR(50) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    additional_context TEXT,
    generated_content TEXT NOT NULL,
    content_metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Campaigns Table
CREATE TABLE IF NOT EXISTS public.email_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    template_type VARCHAR(50) DEFAULT 'newsletter',
    target_audience JSONB DEFAULT '{}', -- User segmentation criteria
    scheduled_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
    stats JSONB DEFAULT '{}', -- Open rates, click rates, etc.
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Communication Log
CREATE TABLE IF NOT EXISTS public.user_communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    communication_type VARCHAR(50) NOT NULL, -- email, sms, push, in_app
    subject VARCHAR(255),
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'failed')),
    sent_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Audit Log
CREATE TABLE IF NOT EXISTS public.system_audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(255),
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEO Management Table
CREATE TABLE IF NOT EXISTS public.seo_metadata (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255),
    meta_description TEXT,
    keywords TEXT[],
    canonical_url TEXT,
    og_title VARCHAR(255),
    og_description TEXT,
    og_image TEXT,
    twitter_title VARCHAR(255),
    twitter_description TEXT,
    twitter_image TEXT,
    schema_markup JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB DEFAULT '{}',
    page_path VARCHAR(255),
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_file_storage_folder ON public.file_storage(folder);
CREATE INDEX IF NOT EXISTS idx_file_storage_type ON public.file_storage(type);
CREATE INDEX IF NOT EXISTS idx_file_storage_created_at ON public.file_storage(created_at);

CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription ON public.user_profiles(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_user_profiles_active ON public.user_profiles(is_active);

CREATE INDEX IF NOT EXISTS idx_ai_content_user_id ON public.ai_generated_content(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_content_template ON public.ai_generated_content(template_type);
CREATE INDEX IF NOT EXISTS idx_ai_content_created_at ON public.ai_generated_content(created_at);

CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON public.email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_scheduled ON public.email_campaigns(scheduled_at);

CREATE INDEX IF NOT EXISTS idx_user_communications_user_id ON public.user_communications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_communications_type ON public.user_communications(communication_type);
CREATE INDEX IF NOT EXISTS idx_user_communications_created_at ON public.user_communications(created_at);

CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.system_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON public.system_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.system_audit_log(created_at);

CREATE INDEX IF NOT EXISTS idx_seo_metadata_path ON public.seo_metadata(page_path);
CREATE INDEX IF NOT EXISTS idx_seo_metadata_active ON public.seo_metadata(is_active);

CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);

-- Row Level Security (RLS) Policies

-- File Storage Policies
ALTER TABLE public.file_storage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access to file_storage" ON public.file_storage
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role = 'admin'
        )
    );

CREATE POLICY "Users can view their own files" ON public.file_storage
    FOR SELECT USING (uploaded_by = auth.uid());

CREATE POLICY "Users can upload files" ON public.file_storage
    FOR INSERT WITH CHECK (uploaded_by = auth.uid());

-- AI Generated Content Policies
ALTER TABLE public.ai_generated_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own AI content" ON public.ai_generated_content
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admin full access to AI content" ON public.ai_generated_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role = 'admin'
        )
    );

-- Email Campaigns Policies
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin and practitioners can manage email campaigns" ON public.email_campaigns
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('admin', 'practitioner')
        )
    );

-- User Communications Policies
ALTER TABLE public.user_communications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own communications" ON public.user_communications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admin and practitioners can view all communications" ON public.user_communications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('admin', 'practitioner')
        )
    );

CREATE POLICY "Admin and practitioners can send communications" ON public.user_communications
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('admin', 'practitioner')
        )
    );

-- System Audit Log Policies
ALTER TABLE public.system_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access to audit log" ON public.system_audit_log
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role = 'admin'
        )
    );

-- SEO Metadata Policies
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin and practitioners can manage SEO metadata" ON public.seo_metadata
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('admin', 'practitioner')
        )
    );

CREATE POLICY "Public can read active SEO metadata" ON public.seo_metadata
    FOR SELECT USING (is_active = true);

-- Analytics Events Policies
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all analytics events" ON public.analytics_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role = 'admin'
        )
    );

CREATE POLICY "Users can view their own analytics events" ON public.analytics_events
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can insert analytics events" ON public.analytics_events
    FOR INSERT WITH CHECK (true);

-- Functions for common operations

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_file_storage_updated_at BEFORE UPDATE ON public.file_storage
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON public.email_campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_metadata_updated_at BEFORE UPDATE ON public.seo_metadata
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
    p_action VARCHAR(100),
    p_resource_type VARCHAR(50),
    p_resource_id VARCHAR(255) DEFAULT NULL,
    p_details JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.system_audit_log (
        user_id,
        action,
        resource_type,
        resource_id,
        details,
        ip_address
    ) VALUES (
        auth.uid(),
        p_action,
        p_resource_type,
        p_resource_id,
        p_details,
        inet_client_addr()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;