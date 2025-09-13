-- Create audit log table for tracking access to sensitive data
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  action TEXT NOT NULL,
  user_id UUID,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  details JSONB
);

-- Enable RLS on audit log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view all audit logs" 
ON public.audit_log 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to log contact submission access
CREATE OR REPLACE FUNCTION public.log_contact_access()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_log (table_name, action, user_id, details)
  VALUES (
    'contact_submissions',
    'SELECT',
    auth.uid(),
    jsonb_build_object(
      'accessed_at', now(),
      'user_authenticated', (auth.uid() IS NOT NULL),
      'has_admin_role', has_role(auth.uid(), 'admin'::app_role)
    )
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add more restrictive SELECT policy for contact submissions with additional security checks
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;

CREATE POLICY "Authenticated admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND has_role(auth.uid(), 'admin'::app_role)
  AND auth.role() = 'authenticated'
);

-- Create function to prevent bulk data extraction (optional additional security)
CREATE OR REPLACE FUNCTION public.prevent_bulk_contact_access()
RETURNS TRIGGER AS $$
DECLARE
  recent_access_count INTEGER;
BEGIN
  -- Check if this user has accessed contact data recently (within 1 minute)
  SELECT COUNT(*) INTO recent_access_count
  FROM public.audit_log
  WHERE user_id = auth.uid()
    AND table_name = 'contact_submissions'
    AND action = 'SELECT'
    AND timestamp > (now() - interval '1 minute');
    
  -- If more than 10 accesses in the last minute, log suspicious activity
  IF recent_access_count > 10 THEN
    INSERT INTO public.audit_log (table_name, action, user_id, details)
    VALUES (
      'contact_submissions',
      'SUSPICIOUS_BULK_ACCESS',
      auth.uid(),
      jsonb_build_object(
        'access_count', recent_access_count,
        'time_window', '1 minute',
        'flagged_at', now()
      )
    );
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;