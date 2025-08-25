import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Database {
  public: {
    Tables: {
      search_history: {
        Row: {
          id: string;
          term: string;
          result_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          term: string;
          result_count: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          term?: string;
          result_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      podcasts: {
        Row: {
          id: string;
          wrapper_type: string | null;
          kind: string | null;
          artist_id: number | null;
          collection_id: number;
          track_id: number | null;
          artist_name: string | null;
          collection_name: string;
          track_name: string | null;
          collection_censored_name: string | null;
          track_censored_name: string | null;
          artist_view_url: string | null;
          collection_view_url: string | null;
          feed_url: string | null;
          track_view_url: string | null;
          artwork_url30: string | null;
          artwork_url60: string | null;
          artwork_url100: string | null;
          artwork_url600: string | null;
          collection_price: number | null;
          track_price: number | null;
          collection_hd_price: number | null;
          release_date: string | null;
          collection_explicitness: string | null;
          track_explicitness: string | null;
          track_count: number | null;
          track_time_millis: number | null;
          country: string | null;
          currency: string | null;
          primary_genre_name: string | null;
          content_advisory_rating: string | null;
          genre_ids: string | null;
          genres: string | null;
          search_history_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          wrapper_type?: string | null;
          kind?: string | null;
          artist_id?: number | null;
          collection_id: number;
          track_id?: number | null;
          artist_name?: string | null;
          collection_name: string;
          track_name?: string | null;
          collection_censored_name?: string | null;
          track_censored_name?: string | null;
          artist_view_url?: string | null;
          collection_view_url?: string | null;
          feed_url?: string | null;
          track_view_url?: string | null;
          artwork_url30?: string | null;
          artwork_url60?: string | null;
          artwork_url100?: string | null;
          artwork_url600?: string | null;
          collection_price?: number | null;
          track_price?: number | null;
          collection_hd_price?: number | null;
          release_date?: string | null;
          collection_explicitness?: string | null;
          track_explicitness?: string | null;
          track_count?: number | null;
          track_time_millis?: number | null;
          country?: string | null;
          currency?: string | null;
          primary_genre_name?: string | null;
          content_advisory_rating?: string | null;
          genre_ids?: string | null;
          genres?: string | null;
          search_history_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          wrapper_type?: string | null;
          kind?: string | null;
          artist_id?: number | null;
          collection_id?: number;
          track_id?: number | null;
          artist_name?: string | null;
          collection_name?: string;
          track_name?: string | null;
          collection_censored_name?: string | null;
          track_censored_name?: string | null;
          artist_view_url?: string | null;
          collection_view_url?: string | null;
          feed_url?: string | null;
          track_view_url?: string | null;
          artwork_url30?: string | null;
          artwork_url60?: string | null;
          artwork_url100?: string | null;
          artwork_url600?: string | null;
          collection_price?: number | null;
          track_price?: number | null;
          collection_hd_price?: number | null;
          release_date?: string | null;
          collection_explicitness?: string | null;
          track_explicitness?: string | null;
          track_count?: number | null;
          track_time_millis?: number | null;
          country?: string | null;
          currency?: string | null;
          primary_genre_name?: string | null;
          content_advisory_rating?: string | null;
          genre_ids?: string | null;
          genres?: string | null;
          search_history_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      episodes: {
        Row: {
          id: string;
          podcast_id: string;
          title: string;
          description: string | null;
          duration: number | null;
          pub_date: string | null;
          guid: string | null;
          enclosure_url: string | null;
          enclosure_type: string | null;
          enclosure_length: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          podcast_id: string;
          title: string;
          description?: string | null;
          duration?: number | null;
          pub_date?: string | null;
          guid?: string | null;
          enclosure_url?: string | null;
          enclosure_type?: string | null;
          enclosure_length?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          podcast_id?: string;
          title?: string;
          description?: string | null;
          duration?: number | null;
          pub_date?: string | null;
          guid?: string | null;
          enclosure_url?: string | null;
          enclosure_type?: string | null;
          enclosure_length?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
