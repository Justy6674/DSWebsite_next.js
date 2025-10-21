-- Create admin_diary table for clinical notes and diary entries
CREATE TABLE public.admin_diary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_diary ENABLE ROW LEVEL SECURITY;

-- Create policies for admin diary access
CREATE POLICY "Admins can manage diary entries" 
ON public.admin_diary 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role = 'admin'
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_admin_diary_updated_at
  BEFORE UPDATE ON public.admin_diary
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();