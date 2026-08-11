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

CREATE TABLE IF NOT EXISTS audit_inquiries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  problems TEXT[] NOT NULL DEFAULT '{}',
  other_problem TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS audit_inquiries_created_idx
  ON audit_inquiries (created_at DESC);

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

CREATE TABLE IF NOT EXISTS past_clients (
  id BIGSERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  industry TEXT NOT NULL DEFAULT '',
  website_url TEXT,
  logo_url TEXT,
  project_summary TEXT,
  results_achieved TEXT,
  testimonial_quote TEXT,
  testimonial_author TEXT,
  testimonial_role TEXT,
  client_status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS past_clients_slug_idx
  ON past_clients (slug);

CREATE INDEX IF NOT EXISTS past_clients_created_idx
  ON past_clients (created_at DESC);

CREATE TABLE IF NOT EXISTS prebuilt_assets (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL,
  original_price TEXT,
  badge TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  demo_url TEXT,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS prebuilt_assets_category_idx
  ON prebuilt_assets (category);

CREATE INDEX IF NOT EXISTS prebuilt_assets_published_created_idx
  ON prebuilt_assets (published, created_at DESC);

CREATE TABLE IF NOT EXISTS product_claims (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_slug TEXT,
  price TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS product_claims_created_idx
  ON product_claims (created_at DESC);



