import { Podcast, SearchHistory, Episode } from '@/types';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export class SupabasePodcastService {
  async saveTopPodcasts(cacheKey: string, podcasts: Podcast[]): Promise<{ searchHistory: SearchHistory; savedPodcasts: Podcast[] }> {
    try {
      const searchHistoryId = uuidv4();
      const now = new Date().toISOString();
      
      const { error: searchHistoryError } = await supabase
        .from('search_history')
        .upsert({
          id: searchHistoryId,
          term: cacheKey,
          result_count: podcasts.length,
          created_at: now,
          updated_at: now
        });

      if (searchHistoryError) {
        throw new Error(`Failed to save search history: ${searchHistoryError.message}`);
      }

      const searchHistory: SearchHistory = {
        id: searchHistoryId,
        term: cacheKey,
        resultCount: podcasts.length,
        createdAt: new Date(now),
        updatedAt: new Date(now)
      };

      const savedPodcasts: Podcast[] = [];
      
      for (const podcast of podcasts) {
        const podcastId = uuidv4();
        
        const { error: podcastError } = await supabase
          .from('podcasts')
          .upsert({
            id: podcastId,
            wrapper_type: podcast.wrapperType,
            kind: podcast.kind,
            artist_id: podcast.artistId,
            collection_id: podcast.collectionId,
            track_id: podcast.trackId,
            artist_name: podcast.artistName,
            collection_name: podcast.collectionName,
            track_name: podcast.trackName,
            collection_censored_name: podcast.collectionCensoredName,
            track_censored_name: podcast.trackCensoredName,
            artist_view_url: podcast.artistViewUrl,
            collection_view_url: podcast.collectionViewUrl,
            feed_url: podcast.feedUrl,
            track_view_url: podcast.trackViewUrl,
            artwork_url30: podcast.artworkUrl30,
            artwork_url60: podcast.artworkUrl60,
            artwork_url100: podcast.artworkUrl100,
            artwork_url600: podcast.artworkUrl600,
            collection_price: podcast.collectionPrice,
            track_price: podcast.trackPrice,
            collection_hd_price: podcast.collectionHdPrice,
            release_date: podcast.releaseDate,
            collection_explicitness: podcast.collectionExplicitness,
            track_explicitness: podcast.trackExplicitness,
            track_count: podcast.trackCount,
            track_time_millis: podcast.trackTimeMillis,
            country: podcast.country,
            currency: podcast.currency,
            primary_genre_name: podcast.primaryGenreName,
            content_advisory_rating: podcast.contentAdvisoryRating,
            genre_ids: JSON.stringify(podcast.genreIds),
            genres: JSON.stringify(podcast.genres),
            search_history_id: searchHistoryId,
            created_at: now,
            updated_at: now
          });

        if (podcastError) {
          console.error(`Failed to save podcast ${podcast.collectionName}:`, podcastError);
          continue;
        }
        
        const convertedPodcast: Podcast = {
          id: podcastId,
          wrapperType: podcast.wrapperType,
          kind: podcast.kind,
          artistId: podcast.artistId,
          collectionId: podcast.collectionId,
          trackId: podcast.trackId,
          artistName: podcast.artistName,
          collectionName: podcast.collectionName,
          trackName: podcast.trackName,
          collectionCensoredName: podcast.collectionCensoredName,
          trackCensoredName: podcast.trackCensoredName,
          artistViewUrl: podcast.artistViewUrl,
          collectionViewUrl: podcast.collectionViewUrl,
          feedUrl: podcast.feedUrl,
          trackViewUrl: podcast.trackViewUrl,
          artworkUrl30: podcast.artworkUrl30,
          artworkUrl60: podcast.artworkUrl60,
          artworkUrl100: podcast.artworkUrl100,
          artworkUrl600: podcast.artworkUrl600,
          collectionPrice: podcast.collectionPrice,
          trackPrice: podcast.trackPrice,
          collectionHdPrice: podcast.collectionHdPrice,
          releaseDate: podcast.releaseDate,
          collectionExplicitness: podcast.collectionExplicitness,
          trackExplicitness: podcast.trackExplicitness,
          trackCount: podcast.trackCount,
          trackTimeMillis: podcast.trackTimeMillis,
          country: podcast.country,
          currency: podcast.currency,
          primaryGenreName: podcast.primaryGenreName,
          contentAdvisoryRating: podcast.contentAdvisoryRating,
          genreIds: podcast.genreIds,
          genres: podcast.genres,
          createdAt: new Date(now),
          updatedAt: new Date(now),
        };
        
        savedPodcasts.push(convertedPodcast);
      }

      return { searchHistory, savedPodcasts };
    } catch (error) {
      console.error('Error saving top podcasts:', error);
      throw error;
    }
  }

  async saveSearchResults(searchTerm: string, podcasts: Podcast[]): Promise<{ searchHistory: SearchHistory; savedPodcasts: Podcast[] }> {
    try {
      const searchHistoryId = uuidv4();
      const now = new Date().toISOString();
      
      const { error: searchHistoryError } = await supabase
        .from('search_history')
        .upsert({
          id: searchHistoryId,
          term: searchTerm,
          result_count: podcasts.length,
          created_at: now,
          updated_at: now
        });

      if (searchHistoryError) {
        throw new Error(`Failed to save search history: ${searchHistoryError.message}`);
      }

      const searchHistory: SearchHistory = {
        id: searchHistoryId,
        term: searchTerm,
        resultCount: podcasts.length,
        createdAt: new Date(now),
        updatedAt: new Date(now)
      };

      const savedPodcasts: Podcast[] = [];
      
      for (const podcast of podcasts) {
        const podcastId = uuidv4();
        
        const { error: podcastError } = await supabase
          .from('podcasts')
          .upsert({
            id: podcastId,
            wrapper_type: podcast.wrapperType,
            kind: podcast.kind,
            artist_id: podcast.artistId,
            collection_id: podcast.collectionId,
            track_id: podcast.trackId,
            artist_name: podcast.artistName,
            collection_name: podcast.collectionName,
            track_name: podcast.trackName,
            collection_censored_name: podcast.collectionCensoredName,
            track_censored_name: podcast.trackCensoredName,
            artist_view_url: podcast.artistViewUrl,
            collection_view_url: podcast.collectionViewUrl,
            feed_url: podcast.feedUrl,
            track_view_url: podcast.trackViewUrl,
            artwork_url30: podcast.artworkUrl30,
            artwork_url60: podcast.artworkUrl60,
            artwork_url100: podcast.artworkUrl100,
            artwork_url600: podcast.artworkUrl600,
            collection_price: podcast.collectionPrice,
            track_price: podcast.trackPrice,
            collection_hd_price: podcast.collectionHdPrice,
            release_date: podcast.releaseDate,
            collection_explicitness: podcast.collectionExplicitness,
            track_explicitness: podcast.trackExplicitness,
            track_count: podcast.trackCount,
            track_time_millis: podcast.trackTimeMillis,
            country: podcast.country,
            currency: podcast.currency,
            primary_genre_name: podcast.primaryGenreName,
            content_advisory_rating: podcast.contentAdvisoryRating,
            genre_ids: JSON.stringify(podcast.genreIds),
            genres: JSON.stringify(podcast.genres),
            search_history_id: searchHistoryId,
            created_at: now,
            updated_at: now
          });

        if (podcastError) {
          console.error(`Failed to save podcast ${podcast.collectionName}:`, podcastError);
          continue;
        }
        
        const convertedPodcast: Podcast = {
          id: podcastId,
          wrapperType: podcast.wrapperType,
          kind: podcast.kind,
          artistId: podcast.artistId,
          collectionId: podcast.collectionId,
          trackId: podcast.trackId,
          artistName: podcast.artistName,
          collectionName: podcast.collectionName,
          trackName: podcast.trackName,
          collectionCensoredName: podcast.collectionCensoredName,
          trackCensoredName: podcast.trackCensoredName,
          artistViewUrl: podcast.artistViewUrl,
          collectionViewUrl: podcast.collectionViewUrl,
          feedUrl: podcast.feedUrl,
          trackViewUrl: podcast.trackViewUrl,
          artworkUrl30: podcast.artworkUrl30,
          artworkUrl60: podcast.artworkUrl60,
          artworkUrl100: podcast.artworkUrl100,
          artworkUrl600: podcast.artworkUrl600,
          collectionPrice: podcast.collectionPrice,
          trackPrice: podcast.trackPrice,
          collectionHdPrice: podcast.collectionHdPrice,
          releaseDate: podcast.releaseDate,
          collectionExplicitness: podcast.collectionExplicitness,
          trackExplicitness: podcast.trackExplicitness,
          trackCount: podcast.trackCount,
          trackTimeMillis: podcast.trackTimeMillis,
          country: podcast.country,
          currency: podcast.currency,
          primaryGenreName: podcast.primaryGenreName,
          contentAdvisoryRating: podcast.contentAdvisoryRating,
          genreIds: podcast.genreIds,
          genres: podcast.genres,
          createdAt: new Date(now),
          updatedAt: new Date(now),
        };
        
        savedPodcasts.push(convertedPodcast);
      }

      return { searchHistory, savedPodcasts };
    } catch (error) {
      console.error('Error saving search results:', error);
      throw error;
    }
  }

  async saveEpisodes(episodes: Episode[]): Promise<Episode[]> {
    try {
      const savedEpisodes: Episode[] = [];
      const now = new Date().toISOString();
      
      for (const episode of episodes) {
        const episodeId = uuidv4();
        
        const { data: podcastData, error: podcastError } = await supabase
          .from('podcasts')
          .select('id')
          .eq('collection_id', parseInt(episode.podcastId))
          .single();

        let podcastId: string;

        if (podcastError || !podcastData) {
          console.log(`Creating podcast record for collection_id ${episode.podcastId} for episode ${episode.title}`);
          
          const newPodcastId = uuidv4();
          const { error: createPodcastError } = await supabase
            .from('podcasts')
            .insert({
              id: newPodcastId,
              collection_id: parseInt(episode.podcastId),
              collection_name: episode.podcastName || 'Unknown Podcast',
              artist_name: episode.podcastArtist || 'Unknown Artist',
              track_name: episode.title,
              track_view_url: episode.trackViewUrl,
              artwork_url600: episode.podcastArtwork,
              created_at: now,
              updated_at: now
            });

          if (createPodcastError) {
            console.error(`Failed to create podcast record for episode ${episode.title}:`, createPodcastError);
            continue;
          }
          
          podcastId = newPodcastId;
        } else {
          podcastId = podcastData.id;
        }

        const { error: episodeError } = await supabase
          .from('episodes')
          .upsert({
            id: episodeId,
            podcast_id: podcastId,
            title: episode.title,
            description: episode.description,
            duration: episode.duration,
            pub_date: episode.pubDate ? episode.pubDate.toISOString() : null,
            guid: episode.guid,
            enclosure_url: episode.enclosureUrl,
            enclosure_type: episode.enclosureType,
            enclosure_length: episode.enclosureLength,
            created_at: now,
            updated_at: now
          });

        if (episodeError) {
          console.error(`Failed to save episode ${episode.title}:`, episodeError);
          continue;
        }
        
        const convertedEpisode: Episode = {
          id: episodeId,
          title: episode.title,
          description: episode.description,
          duration: episode.duration,
          pubDate: episode.pubDate,
          guid: episode.guid,
          enclosureUrl: episode.enclosureUrl,
          enclosureType: episode.enclosureType,
          enclosureLength: episode.enclosureLength,
          itunesDuration: episode.itunesDuration,
          itunesExplicit: episode.itunesExplicit,
          itunesImage: episode.itunesImage,
          itunesOrder: episode.itunesOrder,
          itunesSubtitle: episode.itunesSubtitle,
          itunesSummary: episode.itunesSummary,
          itunesKeywords: episode.itunesKeywords,
          itunesAuthor: episode.itunesAuthor,
          podcastId: podcastId,
          podcastName: episode.podcastName,
          podcastArtist: episode.podcastArtist,
          podcastArtwork: episode.podcastArtwork,
          trackViewUrl: episode.trackViewUrl,
          createdAt: new Date(now),
          updatedAt: new Date(now),
        };
        
        savedEpisodes.push(convertedEpisode);
      }

      return savedEpisodes;
    } catch (error) {
      console.error('Error saving episodes:', error);
      throw error;
    }
  }

  async getSearchHistory(limit: number = 10): Promise<SearchHistory[]> {
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(`Failed to fetch search history: ${error.message}`);
      }

      return data.map(row => ({
        id: row.id,
        term: row.term,
        resultCount: row.result_count,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      }));
    } catch (error) {
      console.error('Error fetching search history:', error);
      throw error;
    }
  }

  async getSavedPodcasts(limit: number = 50): Promise<Podcast[]> {
    try {
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(`Failed to fetch saved podcasts: ${error.message}`);
      }

      return data.map(row => ({
        id: row.id,
        wrapperType: row.wrapper_type || '',
        kind: row.kind || '',
        artistId: row.artist_id || 0,
        collectionId: row.collection_id,
        trackId: row.track_id || 0,
        artistName: row.artist_name || '',
        collectionName: row.collection_name,
        trackName: row.track_name || '',
        collectionCensoredName: row.collection_censored_name || '',
        trackCensoredName: row.track_censored_name || '',
        artistViewUrl: row.artist_view_url || '',
        collectionViewUrl: row.collection_view_url || '',
        feedUrl: row.feed_url || '',
        trackViewUrl: row.track_view_url || '',
        artworkUrl30: row.artwork_url30 || '',
        artworkUrl60: row.artwork_url60 || '',
        artworkUrl100: row.artwork_url100 || '',
        artworkUrl600: row.artwork_url600 || '',
        collectionPrice: row.collection_price || 0,
        trackPrice: row.track_price || 0,
        collectionHdPrice: row.collection_hd_price || 0,
        releaseDate: row.release_date || '',
        collectionExplicitness: row.collection_explicitness || '',
        trackExplicitness: row.track_explicitness || '',
        trackCount: row.track_count || 0,
        trackTimeMillis: row.track_time_millis || 0,
        country: row.country || '',
        currency: row.currency || '',
        primaryGenreName: row.primary_genre_name || '',
        contentAdvisoryRating: row.content_advisory_rating || '',
        genreIds: row.genre_ids ? JSON.parse(row.genre_ids) : [],
        genres: row.genres ? JSON.parse(row.genres) : [],
        episodes: [],
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      }));
    } catch (error) {
      console.error('Error fetching saved podcasts:', error);
      throw error;
    }
  }

  async getSavedEpisodes(limit: number = 50): Promise<Episode[]> {
    try {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(`Failed to fetch saved episodes: ${error.message}`);
      }

      return data.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        duration: row.duration,
        pubDate: row.pub_date ? new Date(row.pub_date) : null,
        guid: row.guid,
        enclosureUrl: row.enclosure_url,
        enclosureType: row.enclosure_type,
        enclosureLength: row.enclosure_length,
        itunesDuration: null,
        itunesExplicit: null,
        itunesImage: null,
        itunesOrder: null,
        itunesSubtitle: null,
        itunesSummary: null,
        itunesKeywords: null,
        itunesAuthor: null,
        podcastId: row.podcast_id,
        podcastName: null,
        podcastArtist: null,
        podcastArtwork: null,
        trackViewUrl: null,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      }));
    } catch (error) {
      console.error('Error fetching saved episodes:', error);
      throw error;
    }
  }
}

export const supabasePodcastService = new SupabasePodcastService();
