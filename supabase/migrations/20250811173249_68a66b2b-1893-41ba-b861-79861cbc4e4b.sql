-- Enforce input hygiene and anti-spam protections on contact_submissions
-- 1) Function + trigger to trim fields, normalize email, validate basic format/length, and rate-limit: 1 submission per 60s per email

create or replace function public.enforce_contact_submission_limits()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Trim whitespace
  new.name := trim(both from new.name);
  new.email := lower(trim(both from new.email));
  if new.phone is not null then
    new.phone := trim(both from new.phone);
  end if;
  if new.message is not null then
    new.message := trim(both from new.message);
  end if;

  -- Required fields (columns are NOT NULL already, but add explicit validation)
  if char_length(new.name) = 0 then
    raise exception 'Name is required';
  end if;
  if char_length(new.email) = 0 then
    raise exception 'Email is required';
  end if;

  -- Basic length validation (defense-in-depth vs CHECKs)
  if char_length(new.name) > 200 then
    raise exception 'Name too long (max 200 characters)';
  end if;
  if char_length(new.email) > 320 then
    raise exception 'Email too long (max 320 characters)';
  end if;
  if new.phone is not null and char_length(new.phone) > 30 then
    raise exception 'Phone too long (max 30 characters)';
  end if;
  if new.message is not null and char_length(new.message) > 5000 then
    raise exception 'Message too long (max 5000 characters)';
  end if;

  -- Basic email format check (lightweight)
  if new.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' then
    raise exception 'Invalid email format';
  end if;

  -- Anti-spam: block if same email submitted within last 60 seconds
  if exists (
    select 1
    from public.contact_submissions cs
    where cs.email = new.email
      and cs.created_at > now() - interval '60 seconds'
  ) then
    raise exception 'Too many submissions. Please wait 60 seconds and try again.';
  end if;

  return new;
end;
$$;

-- 2) Create/replace trigger
drop trigger if exists contact_submissions_before_insert on public.contact_submissions;
create trigger contact_submissions_before_insert
before insert on public.contact_submissions
for each row
execute function public.enforce_contact_submission_limits();

-- 3) Helpful indexes for rate-limit lookup
create index if not exists contact_submissions_email_created_at_idx
  on public.contact_submissions (email, created_at desc);

-- 4) Add CHECK constraints (defense-in-depth)
-- Use DO blocks to avoid errors if constraints already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'contact_submissions_name_length'
  ) THEN
    ALTER TABLE public.contact_submissions
      ADD CONSTRAINT contact_submissions_name_length
      CHECK (char_length(name) <= 200);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'contact_submissions_email_length'
  ) THEN
    ALTER TABLE public.contact_submissions
      ADD CONSTRAINT contact_submissions_email_length
      CHECK (char_length(email) <= 320);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'contact_submissions_phone_length'
  ) THEN
    ALTER TABLE public.contact_submissions
      ADD CONSTRAINT contact_submissions_phone_length
      CHECK (phone IS NULL OR char_length(phone) <= 30);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'contact_submissions_message_length'
  ) THEN
    ALTER TABLE public.contact_submissions
      ADD CONSTRAINT contact_submissions_message_length
      CHECK (message IS NULL OR char_length(message) <= 5000);
  END IF;
END $$;