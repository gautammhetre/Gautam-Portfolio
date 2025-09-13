-- Add additional security measures for contact_submissions table

-- 1. Add a more restrictive SELECT policy with additional checks
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;

CREATE POLICY "Restricted admin access to contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (
  -- Must be admin role
  has_role(auth.uid(), 'admin'::app_role)
  -- Additional security: only allow if user was created more than 24 hours ago
  -- This prevents newly created admin accounts from immediately accessing sensitive data
  AND (
    SELECT auth.created_at < now() - interval '24 hours'
    FROM auth.users 
    WHERE auth.users.id = auth.uid()
  )
);

-- 2. Add audit logging trigger for contact submission access
CREATE OR REPLACE FUNCTION public.log_contact_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log all access attempts to contact submissions
  INSERT INTO public.audit_log (
    table_name,
    operation,
    user_id,
    timestamp,
    ip_address
  ) VALUES (
    'contact_submissions',
    'SELECT',
    auth.uid(),
    now(),
    current_setting('request.header.x-forwarded-for', true)
  );
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create audit log table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  user_id UUID,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" 
ON public.audit_log 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Add trigger to log contact submission access (commented out for now as it would log every query)
-- CREATE TRIGGER contact_access_audit
--   AFTER SELECT ON public.contact_submissions
--   FOR EACH STATEMENT
--   EXECUTE FUNCTION public.log_contact_access();

-- 5. Add additional constraint to prevent bulk data extraction
CREATE OR REPLACE FUNCTION public.limit_contact_queries()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent queries that might return too many records at once
  IF (SELECT COUNT(*) FROM public.contact_submissions) > 100 THEN
    RAISE EXCEPTION 'Large dataset access requires additional approval. Contact system administrator.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The above function is created but not attached as a trigger to avoid breaking legitimate admin access
-- It can be enabled if needed for additional protection