CREATE TABLE IF NOT EXISTS schools (
    id INTEGER PRIMARY KEY,
    display_order INTEGER,
    short_name TEXT,
    name TEXT NOT NULL,
    school_type TEXT,
    featured_major TEXT,
    description TEXT,
    information TEXT,
    campus TEXT,
    campus_locations JSONB NOT NULL DEFAULT '[]'::jsonb,
    programs TEXT,
    admission_methods TEXT,
    admission_score TEXT,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    source_url TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_schools_display_order
    ON schools (display_order NULLS LAST);

CREATE INDEX IF NOT EXISTS idx_schools_short_name
    ON schools (short_name);

CREATE INDEX IF NOT EXISTS idx_schools_name
    ON schools (name);
