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

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'catalog_type') THEN
    CREATE TYPE catalog_type AS ENUM (
      'audit',
      'report',
      'benchmark_comparison',
      'guide',
      'case_study'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS library_catalog (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL DEFAULT '',
  type catalog_type NOT NULL,
  file_path TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS library_catalog_type_idx
  ON library_catalog (type);

CREATE INDEX IF NOT EXISTS library_catalog_published_created_idx
  ON library_catalog (published, created_at DESC);

CREATE TABLE IF NOT EXISTS research_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS research_subscriptions_created_idx
  ON research_subscriptions (created_at DESC);

