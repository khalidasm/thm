-- Create search_history table
CREATE TABLE IF NOT EXISTS search_history (
  id TEXT PRIMARY KEY,
  term TEXT NOT NULL,
  result_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create podcasts table
CREATE TABLE IF NOT EXISTS podcasts (
  id TEXT PRIMARY KEY,
  wrapper_type TEXT,
  kind TEXT,
  artist_id INTEGER,
  collection_id INTEGER UNIQUE NOT NULL,
  track_id INTEGER,
  artist_name TEXT,
  collection_name TEXT NOT NULL,
  track_name TEXT,
  collection_censored_name TEXT,
  track_censored_name TEXT,
  artist_view_url TEXT,
  collection_view_url TEXT,
  feed_url TEXT,
  track_view_url TEXT,
  artwork_url30 TEXT,
  artwork_url60 TEXT,
  artwork_url100 TEXT,
  artwork_url600 TEXT,
  collection_price REAL,
  track_price REAL,
  collection_hd_price INTEGER,
  release_date TEXT,
  collection_explicitness TEXT,
  track_explicitness TEXT,
  track_count INTEGER,
  track_time_millis INTEGER,
  country TEXT,
  currency TEXT,
  primary_genre_name TEXT,
  content_advisory_rating TEXT,
  genre_ids TEXT,
  genres TEXT,
  search_history_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (search_history_id) REFERENCES search_history (id)
);

-- Create episodes table
CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY,
  podcast_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER,
  pub_date TIMESTAMP WITH TIME ZONE,
  guid TEXT UNIQUE,
  enclosure_url TEXT,
  enclosure_type TEXT,
  enclosure_length INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (podcast_id) REFERENCES podcasts (id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_podcasts_collection_id ON podcasts(collection_id);
CREATE INDEX IF NOT EXISTS idx_podcasts_search_history_id ON podcasts(search_history_id);
CREATE INDEX IF NOT EXISTS idx_episodes_podcast_id ON episodes(podcast_id);
CREATE INDEX IF NOT EXISTS idx_episodes_guid ON episodes(guid);
CREATE INDEX IF NOT EXISTS idx_search_history_term ON search_history(term);
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to search_history" ON search_history
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to podcasts" ON podcasts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to episodes" ON episodes
  FOR SELECT USING (true);

-- Create policies for authenticated insert/update
CREATE POLICY "Allow authenticated insert to search_history" ON search_history
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated insert to podcasts" ON podcasts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated insert to episodes" ON episodes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update to search_history" ON search_history
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated update to podcasts" ON podcasts
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated update to episodes" ON episodes
  FOR UPDATE USING (true);
