-- dsdaihoc.com — initial schema (Neon Postgres)
-- Run once: psql "$DATABASE_URL" -f db/migrations/001_init.sql

-- ---------------------------------------------------------------------------
-- Feedback from /gop-y
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feedback (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        TEXT        NOT NULL,
    email       TEXT        NOT NULL,
    subject     TEXT        NOT NULL,
    message     TEXT        NOT NULL,
    status      TEXT        NOT NULL DEFAULT 'new'
                            CHECK (status IN ('new', 'read', 'archived')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_status     ON feedback (status);

-- ---------------------------------------------------------------------------
-- AI4SD applications from the landing page CTAs
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai4sd_leads (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        TEXT        NOT NULL,
    email       TEXT        NOT NULL,
    phone       TEXT,
    school      TEXT,
    study_year  TEXT,
    -- which CTA the visitor came through
    intent      TEXT        NOT NULL DEFAULT 'giu-cho'
                            CHECK (intent IN ('giu-cho', 'tu-van')),
    note        TEXT,
    status      TEXT        NOT NULL DEFAULT 'new'
                            CHECK (status IN ('new', 'contacted', 'enrolled', 'rejected')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai4sd_leads_created_at ON ai4sd_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai4sd_leads_status     ON ai4sd_leads (status);

-- ---------------------------------------------------------------------------
-- Starred schools.
--
-- user_id references the existing `users` table, which already holds Clerk ids
-- (487 rows, all prefixed `user_`) from the retired chat app. Reusing it means
-- whatever Clerk sync populated those rows keeps feeding this one.
--
-- school_id is the stable dataset id, NOT the slug: slugs are derived from the
-- school name, so renaming a school in Airtable would silently orphan every
-- favourite. school_slug is denormalised for cheap link building and is
-- refreshed on write.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS favorites (
    user_id     TEXT        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    school_id   TEXT        NOT NULL,
    school_slug TEXT        NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, school_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user   ON favorites (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_favorites_school ON favorites (school_id);
