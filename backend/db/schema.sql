CREATE TABLE IF NOT EXISTS contact_inquiries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT NOT NULL,
  project_goal TEXT,
  timeline TEXT,
  budget TEXT NOT NULL DEFAULT 'Not sure yet',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE contact_inquiries
  ADD COLUMN IF NOT EXISTS project_goal TEXT;

ALTER TABLE contact_inquiries
  ADD COLUMN IF NOT EXISTS timeline TEXT;

ALTER TABLE contact_inquiries
  ALTER COLUMN budget SET DEFAULT 'Not sure yet';

CREATE INDEX IF NOT EXISTS contact_inquiries_created_idx
  ON contact_inquiries (created_at DESC);

CREATE TABLE IF NOT EXISTS portfolio_reviews (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  quote TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
  approval_token_hash TEXT NOT NULL,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS portfolio_reviews_status_created_idx
  ON portfolio_reviews (status, created_at DESC);
