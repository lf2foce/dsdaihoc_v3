-- Make `schools` a faithful mirror of the dataset so it can act as the merge
-- point for both ingest paths (Airtable sync, and direct crawl).
--
-- featured_major arrives from Airtable as a list. Stored in a TEXT column,
-- psycopg2 adapted it into the Postgres array literal `{"Kiến trúc"}`, which
-- would surface as a literal chip label on every school page once the JSON is
-- exported back out. JSONB, like tags and campus_locations already use.

ALTER TABLE schools
    ALTER COLUMN featured_major TYPE JSONB
    USING CASE
        WHEN featured_major IS NULL OR featured_major = '' THEN '[]'::jsonb
        -- Postgres array literal written by the old sync: {"a","b"}
        WHEN featured_major LIKE '{%}' THEN
            to_jsonb(translate(featured_major, '{}', '')::text)
        ELSE to_jsonb(featured_major)
    END;

ALTER TABLE schools
    ALTER COLUMN featured_major SET DEFAULT '[]'::jsonb;

ALTER TABLE schools ADD COLUMN IF NOT EXISTS source_urls JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS last_crawled_at TIMESTAMPTZ;

-- Review state, mirroring what Status does in Airtable.
ALTER TABLE schools ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'approved';

-- Which ingest path owns this row. Each path only ever touches its own rows,
-- so the two cannot silently overwrite each other on a shared id.
ALTER TABLE schools ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'airtable';

CREATE INDEX IF NOT EXISTS idx_schools_status ON schools (status);
CREATE INDEX IF NOT EXISTS idx_schools_source ON schools (source);
