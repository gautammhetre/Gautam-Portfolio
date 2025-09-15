-- Fix Security Definer View issue by removing problematic view and using function approach

-- 1. Drop the problematic security definer view
DROP VIEW IF EXISTS public.contact_submissions_admin_view;

-- 2. Create a secure function for admin contact access instead
CREATE OR REPLACE FUNCTION public.get_contact_submissions_for_admin(limit_count INTEGER DEFAULT 50)
RETURNS TABLE (
  id UUID,
  created_at TIMESTAMPTZ,
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  data_hash TEXT
) AS $$
BEGIN
  -- Verify admin access
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  -- Log access attempt
  INSERT INTO public.audit_log (table_name, action, user_id, details)
  VALUES (
    'contact_submissions',
    'ADMIN_FUNCTION_ACCESS',
    auth.uid(),
    jsonb_build_object('limit_requested', limit_count, 'accessed_at', now())
  );
  
  -- Return limited results
  RETURN QUERY
  SELECT 
    cs.id,
    cs.created_at,
    cs.name,
    cs.email,
    cs.phone,
    cs.message,
    md5(concat(cs.name, cs.email, coalesce(cs.phone, ''), coalesce(cs.message, ''))) as data_hash
  FROM public.contact_submissions cs
  ORDER BY cs.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. Add comment for documentation
COMMENT ON FUNCTION public.get_contact_submissions_for_admin IS 'Secure function for admin access to contact submissions with built-in access control and logging';