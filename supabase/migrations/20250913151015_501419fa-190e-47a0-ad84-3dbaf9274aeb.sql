-- Fix search_path security issues for the functions we just created
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix search_path for bulk access prevention function
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;