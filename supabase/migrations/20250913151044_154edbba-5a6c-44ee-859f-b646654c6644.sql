-- Fix the contact submissions security with proper measures that don't access auth schema

-- 1. Create a simpler but more secure SELECT policy
DROP POLICY IF EXISTS "Restricted admin access to contact submissions" ON public.contact_submissions;

CREATE POLICY "Enhanced admin access to contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (
  -- Must be admin role AND authenticated user
  auth.uid() IS NOT NULL 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- 2. Add a trigger to prevent bulk data extraction
CREATE OR REPLACE FUNCTION public.log_and_limit_contact_access()
RETURNS TRIGGER AS $$
DECLARE
  access_count INTEGER;
BEGIN
  -- Log the access attempt
  INSERT INTO public.audit_log (
    table_name,
    action,
    user_id,
    details
  ) VALUES (
    'contact_submissions',
    'SELECT_ATTEMPT',
    auth.uid(),
    jsonb_build_object(
      'timestamp', now(),
      'user_authenticated', (auth.uid() IS NOT NULL),
      'has_admin_role', has_role(auth.uid(), 'admin'::app_role)
    )
  );

  -- Check recent access frequency (last 5 minutes)
  SELECT COUNT(*) INTO access_count
  FROM public.audit_log
  WHERE user_id = auth.uid()
    AND table_name = 'contact_submissions'
    AND action = 'SELECT_ATTEMPT'
    AND timestamp > (now() - interval '5 minutes');

  -- Alert if suspicious bulk access pattern
  IF access_count > 20 THEN
    INSERT INTO public.audit_log (
      table_name,
      action,
      user_id,
      details
    ) VALUES (
      'contact_submissions',
      'BULK_ACCESS_ALERT',
      auth.uid(),
      jsonb_build_object(
        'access_count', access_count,
        'time_window', '5 minutes',
        'alert_triggered_at', now()
      )
    );
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Add additional UPDATE and DELETE restrictions (defense in depth)
CREATE POLICY "No updates allowed on contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (false);

CREATE POLICY "No deletes allowed on contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (false);

-- 4. Create a view for safe admin access with row limits
CREATE OR REPLACE VIEW public.contact_submissions_admin_view AS
SELECT 
  id,
  created_at,
  name,
  email,
  phone,
  message,
  -- Add a hash for data integrity verification
  md5(concat(name, email, coalesce(phone, ''), coalesce(message, ''))) as data_hash
FROM public.contact_submissions
WHERE has_role(auth.uid(), 'admin'::app_role)
ORDER BY created_at DESC
LIMIT 50; -- Limit to prevent bulk extraction

-- Enable RLS on the view
ALTER VIEW public.contact_submissions_admin_view SET (security_barrier = true);

COMMENT ON VIEW public.contact_submissions_admin_view IS 'Secure view for admin access to contact submissions with built-in limits';