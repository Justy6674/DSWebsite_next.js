-- CRITICAL SECURITY FIX: Remove public access to patient conversations and messages
-- These tables contain sensitive healthcare information and should never be publicly accessible

-- Drop the dangerous public access policies
DROP POLICY IF EXISTS "Public can view conversations" ON public.conversations;
DROP POLICY IF EXISTS "Public can view messages" ON public.messages;
DROP POLICY IF EXISTS "Public can create messages" ON public.messages;

-- Create secure RLS policies for conversations
CREATE POLICY "Users can view their own conversations only" 
ON public.conversations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations only" 
ON public.conversations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations only" 
ON public.conversations 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations only" 
ON public.conversations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create secure RLS policies for messages
CREATE POLICY "Users can view messages in their conversations only" 
ON public.messages 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM conversations 
  WHERE conversations.id = messages.conversation_id 
  AND conversations.user_id = auth.uid()
));

CREATE POLICY "Users can create messages in their conversations only" 
ON public.messages 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM conversations 
  WHERE conversations.id = messages.conversation_id 
  AND conversations.user_id = auth.uid()
));

-- No UPDATE or DELETE policies for messages - they should be immutable for healthcare compliance