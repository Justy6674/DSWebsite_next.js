-- Portal System Database Schema
-- Implements the full portal content management system from PORTAL_SYSTEM_PRD.md

-- Main content table (replaces hardcoded portal content)
CREATE TABLE IF NOT EXISTS public.portal_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pillar VARCHAR(50) NOT NULL CHECK (pillar IN ('nutrition', 'activity', 'mental-health', 'sleep-recovery', 'shop')),
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('video', 'external_doc', 'downscale_doc', 'link', 'tool', 'program_guide')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_data JSONB NOT NULL DEFAULT '{}', -- flexible for different content types
    tags TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    search_vector TSVECTOR -- for full-text search
);

-- JB&BB Internal Blog Feed
CREATE TABLE IF NOT EXISTS public.jb_bb_feed (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    media_urls TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    author VARCHAR(50) NOT NULL CHECK (author IN ('JB', 'BB')),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    search_vector TSVECTOR
);

-- Patient notification preferences
CREATE TABLE IF NOT EXISTS public.patient_notifications (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    jb_bb_feed_alerts BOOLEAN DEFAULT false,
    content_alerts_by_pillar JSONB DEFAULT '{}',
    last_portal_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content analytics tracking
CREATE TABLE IF NOT EXISTS public.content_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    content_type VARCHAR(20) NOT NULL, -- portal_content or jb_bb_feed
    content_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('view', 'download', 'export_pdf', 'search', 'share')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search analytics
CREATE TABLE IF NOT EXISTS public.search_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    search_query TEXT NOT NULL,
    results_count INTEGER,
    clicked_result_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS portal_content_search_idx ON public.portal_content USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS jb_bb_feed_search_idx ON public.jb_bb_feed USING GIN(search_vector);

-- Content type and pillar indexes
CREATE INDEX IF NOT EXISTS portal_content_pillar_idx ON public.portal_content(pillar);
CREATE INDEX IF NOT EXISTS portal_content_type_idx ON public.portal_content(content_type);
CREATE INDEX IF NOT EXISTS portal_content_published_idx ON public.portal_content(is_published);
CREATE INDEX IF NOT EXISTS portal_content_created_at_idx ON public.portal_content(created_at DESC);

-- JB&BB Feed indexes
CREATE INDEX IF NOT EXISTS jb_bb_feed_published_idx ON public.jb_bb_feed(is_published);
CREATE INDEX IF NOT EXISTS jb_bb_feed_author_idx ON public.jb_bb_feed(author);
CREATE INDEX IF NOT EXISTS jb_bb_feed_created_at_idx ON public.jb_bb_feed(created_at DESC);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS content_analytics_user_idx ON public.content_analytics(user_id);
CREATE INDEX IF NOT EXISTS content_analytics_content_idx ON public.content_analytics(content_id);
CREATE INDEX IF NOT EXISTS content_analytics_created_at_idx ON public.content_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS search_analytics_user_idx ON public.search_analytics(user_id);
CREATE INDEX IF NOT EXISTS search_analytics_created_at_idx ON public.search_analytics(created_at DESC);

-- Row Level Security (RLS) Policies

-- Portal Content Policies
ALTER TABLE public.portal_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin and practitioners can manage portal content" ON public.portal_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('admin', 'practitioner')
        )
    );

CREATE POLICY "Users can view published portal content" ON public.portal_content
    FOR SELECT USING (is_published = true);

-- JB&BB Feed Policies
ALTER TABLE public.jb_bb_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin and practitioners can manage JB&BB feed" ON public.jb_bb_feed
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('admin', 'practitioner')
        )
    );

CREATE POLICY "Users can view published feed posts" ON public.jb_bb_feed
    FOR SELECT USING (is_published = true);

-- Patient Notifications Policies
ALTER TABLE public.patient_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own notification preferences" ON public.patient_notifications
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admin can view all notification preferences" ON public.patient_notifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role = 'admin'
        )
    );

-- Content Analytics Policies
ALTER TABLE public.content_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own analytics" ON public.content_analytics
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can view all analytics" ON public.content_analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role = 'admin'
        )
    );

-- Search Analytics Policies
ALTER TABLE public.search_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own search analytics" ON public.search_analytics
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can view all search analytics" ON public.search_analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role = 'admin'
        )
    );

-- Update triggers for updated_at columns
CREATE TRIGGER update_portal_content_updated_at
    BEFORE UPDATE ON public.portal_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jb_bb_feed_updated_at
    BEFORE UPDATE ON public.jb_bb_feed
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_notifications_updated_at
    BEFORE UPDATE ON public.patient_notifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update search vectors
CREATE OR REPLACE FUNCTION update_portal_content_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english',
        COALESCE(NEW.title, '') || ' ' ||
        COALESCE(NEW.description, '') || ' ' ||
        array_to_string(NEW.tags, ' ')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_jb_bb_feed_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english',
        COALESCE(NEW.title, '') || ' ' ||
        COALESCE(NEW.content, '') || ' ' ||
        array_to_string(NEW.tags, ' ')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Search vector update triggers
CREATE TRIGGER portal_content_search_vector_update
    BEFORE INSERT OR UPDATE ON public.portal_content
    FOR EACH ROW EXECUTE FUNCTION update_portal_content_search_vector();

CREATE TRIGGER jb_bb_feed_search_vector_update
    BEFORE INSERT OR UPDATE ON public.jb_bb_feed
    FOR EACH ROW EXECUTE FUNCTION update_jb_bb_feed_search_vector();

-- Function to track content views
CREATE OR REPLACE FUNCTION track_content_view(
    p_content_type TEXT,
    p_content_id UUID,
    p_user_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    -- Increment view count
    IF p_content_type = 'portal_content' THEN
        UPDATE public.portal_content
        SET view_count = view_count + 1
        WHERE id = p_content_id;
    ELSIF p_content_type = 'jb_bb_feed' THEN
        UPDATE public.jb_bb_feed
        SET view_count = view_count + 1
        WHERE id = p_content_id;
    END IF;

    -- Log analytics
    INSERT INTO public.content_analytics (
        user_id, content_type, content_id, action
    ) VALUES (
        p_user_id, p_content_type, p_content_id, 'view'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log searches
CREATE OR REPLACE FUNCTION log_search(
    p_query TEXT,
    p_results_count INTEGER,
    p_user_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    search_id UUID;
BEGIN
    INSERT INTO public.search_analytics (
        user_id, search_query, results_count
    ) VALUES (
        p_user_id, p_query, p_results_count
    ) RETURNING id INTO search_id;

    RETURN search_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Create medical synonym dictionary for search
INSERT INTO pg_ts_config (cfgname, cfgnamespace, cfgowner, cfgparser)
SELECT 'medical_synonyms', pg_namespace.oid, pg_authid.oid, 3722
FROM pg_namespace, pg_authid
WHERE pg_namespace.nspname = 'public'
AND pg_authid.rolname = current_user
ON CONFLICT DO NOTHING;

-- Common medical synonyms for Australian context
CREATE TEXT SEARCH DICTIONARY medical_dict (
    TEMPLATE = synonym,
    SYNONYMS = medical_synonyms
);

-- Example synonym mappings (to be expanded)
-- GLP-1, Ozempic, semaglutide -> weight_loss_medication
-- GP, doctor, physician -> general_practitioner
-- chemist, pharmacy -> pharmacy
-- Medicare, health_insurance -> medicare