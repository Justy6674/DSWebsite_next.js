-- Create health_metrics table for storing body composition calculations
CREATE TABLE IF NOT EXISTS public.health_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,

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

-- Add RLS (Row Level Security)
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own metrics
CREATE POLICY "Users can view own health metrics" ON public.health_metrics
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy for users to insert their own metrics
CREATE POLICY "Users can insert own health metrics" ON public.health_metrics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own metrics
CREATE POLICY "Users can update own health metrics" ON public.health_metrics
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy for users to delete their own metrics
CREATE POLICY "Users can delete own health metrics" ON public.health_metrics
    FOR DELETE USING (auth.uid() = user_id);

-- Create index on user_id for faster queries
CREATE INDEX idx_health_metrics_user_id ON public.health_metrics(user_id);

-- Create index on created_at for chronological ordering
CREATE INDEX idx_health_metrics_created_at ON public.health_metrics(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_health_metrics_updated_at
    BEFORE UPDATE ON public.health_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();