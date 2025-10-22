-- Complete Dashboard Schema for Clinical Portal

-- 1. Extend user_profiles table with additional fields if needed
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS preferred_name TEXT;

-- 2. Create health_metrics table (if not exists from previous migration)
CREATE TABLE IF NOT EXISTS public.health_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Input data
    age INTEGER NOT NULL,
    sex VARCHAR(6) NOT NULL CHECK (sex IN ('male', 'female')),
    height_cm DECIMAL(5,2) NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    waist_cm DECIMAL(5,2),
    activity_level VARCHAR(20) NOT NULL CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'very', 'extra')),
    goal VARCHAR(20) NOT NULL CHECK (goal IN ('lose-safe', 'lose-preserve', 'lose-build', 'build')),

    -- Calculated results
    bmr DECIMAL(8,2) NOT NULL,
    tdee DECIMAL(8,2) NOT NULL,
    goal_calories DECIMAL(8,2) NOT NULL,
    bmi DECIMAL(4,2) NOT NULL,
    bmi_category VARCHAR(20) NOT NULL,
    waist_risk VARCHAR(20),

    -- Macro targets
    protein_g DECIMAL(6,2) NOT NULL,
    fat_g DECIMAL(6,2) NOT NULL,
    carbs_g DECIMAL(6,2) NOT NULL,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create portal_resources table for admin-managed content
CREATE TABLE IF NOT EXISTS public.portal_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category VARCHAR(50) NOT NULL, -- 'nutrition', 'activity', 'mental-health', 'sleep-recovery', 'shop'
    type VARCHAR(50) NOT NULL, -- 'pdf', 'video', 'tool', 'link', 'guide', etc.
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_url TEXT,
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Create user_saved_resources table for tracking user saves
CREATE TABLE IF NOT EXISTS public.user_saved_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID NOT NULL REFERENCES public.portal_resources(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    notes TEXT,
    UNIQUE(user_id, resource_id)
);

-- 5. Create daily_tracking table for comprehensive tracking
CREATE TABLE IF NOT EXISTS public.daily_tracking_extended (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tracking_date DATE NOT NULL,

    -- Physical metrics
    weight_kg DECIMAL(5,2),
    waist_cm DECIMAL(5,2),
    blood_pressure_systolic INTEGER,
    blood_pressure_diastolic INTEGER,
    heart_rate INTEGER,

    -- Lifestyle tracking
    sleep_hours DECIMAL(3,1),
    sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 10),
    energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
    mood INTEGER CHECK (mood BETWEEN 1 AND 10),
    stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 10),

    -- Nutrition tracking
    calories_consumed INTEGER,
    protein_g DECIMAL(6,2),
    carbs_g DECIMAL(6,2),
    fat_g DECIMAL(6,2),
    water_ml INTEGER,

    -- Activity tracking
    steps INTEGER,
    exercise_minutes INTEGER,
    activity_type TEXT,

    -- Medication tracking
    medication_taken BOOLEAN DEFAULT false,
    medication_time TIME,
    side_effects TEXT,

    -- Notes
    daily_notes TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

    UNIQUE(user_id, tracking_date)
);

-- 6. Create clinical_targets table for provider-set goals
CREATE TABLE IF NOT EXISTS public.clinical_targets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.user_profiles(id),

    -- Target metrics
    target_weight_kg DECIMAL(5,2),
    target_waist_cm DECIMAL(5,2),
    target_bmi DECIMAL(4,2),
    target_blood_pressure_systolic INTEGER,
    target_blood_pressure_diastolic INTEGER,

    -- Medication targets
    current_medication VARCHAR(255),
    current_dose VARCHAR(100),
    medication_frequency VARCHAR(100),

    -- Timeline
    target_date DATE,
    review_frequency INTEGER, -- weeks between reviews
    last_review_date DATE,
    next_review_date DATE,

    -- Status
    is_active BOOLEAN DEFAULT true,
    provider_notes TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Create portal_activities table for user engagement tracking
CREATE TABLE IF NOT EXISTS public.portal_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- 'login', 'metric_entry', 'resource_view', 'calculator_use', etc.
    activity_data JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on all new tables
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_saved_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tracking_extended ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for health_metrics
CREATE POLICY "Users can view own health metrics" ON public.health_metrics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health metrics" ON public.health_metrics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health metrics" ON public.health_metrics
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own health metrics" ON public.health_metrics
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for portal_resources (public read for active resources)
CREATE POLICY "Everyone can view active portal resources" ON public.portal_resources
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage portal resources" ON public.portal_resources
    USING (EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    ));

-- RLS Policies for user_saved_resources
CREATE POLICY "Users can view own saved resources" ON public.user_saved_resources
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved resources" ON public.user_saved_resources
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved resources" ON public.user_saved_resources
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved resources" ON public.user_saved_resources
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for daily_tracking_extended
CREATE POLICY "Users can view own daily tracking" ON public.daily_tracking_extended
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily tracking" ON public.daily_tracking_extended
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily tracking" ON public.daily_tracking_extended
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own daily tracking" ON public.daily_tracking_extended
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for clinical_targets
CREATE POLICY "Users can view own clinical targets" ON public.clinical_targets
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Providers can manage patient clinical targets" ON public.clinical_targets
    USING (
        auth.uid() = provider_id OR
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role IN ('admin', 'practitioner')
        )
    );

-- RLS Policies for portal_activities
CREATE POLICY "Users can view own portal activities" ON public.portal_activities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portal activities" ON public.portal_activities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_health_metrics_user_id ON public.health_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_created_at ON public.health_metrics(created_at);

CREATE INDEX IF NOT EXISTS idx_portal_resources_category ON public.portal_resources(category);
CREATE INDEX IF NOT EXISTS idx_portal_resources_active ON public.portal_resources(is_active);
CREATE INDEX IF NOT EXISTS idx_portal_resources_sort_order ON public.portal_resources(sort_order);

CREATE INDEX IF NOT EXISTS idx_user_saved_resources_user_id ON public.user_saved_resources(user_id);
CREATE INDEX IF NOT EXISTS idx_user_saved_resources_resource_id ON public.user_saved_resources(resource_id);

CREATE INDEX IF NOT EXISTS idx_daily_tracking_user_date ON public.daily_tracking_extended(user_id, tracking_date);
CREATE INDEX IF NOT EXISTS idx_daily_tracking_date ON public.daily_tracking_extended(tracking_date);

CREATE INDEX IF NOT EXISTS idx_clinical_targets_user_id ON public.clinical_targets(user_id);
CREATE INDEX IF NOT EXISTS idx_clinical_targets_active ON public.clinical_targets(is_active);
CREATE INDEX IF NOT EXISTS idx_clinical_targets_review_date ON public.clinical_targets(next_review_date);

CREATE INDEX IF NOT EXISTS idx_portal_activities_user_id ON public.portal_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_portal_activities_type ON public.portal_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_portal_activities_created_at ON public.portal_activities(created_at);

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_health_metrics_updated_at
    BEFORE UPDATE ON public.health_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portal_resources_updated_at
    BEFORE UPDATE ON public.portal_resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_tracking_extended_updated_at
    BEFORE UPDATE ON public.daily_tracking_extended
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clinical_targets_updated_at
    BEFORE UPDATE ON public.clinical_targets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();