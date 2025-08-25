import { NextRequest, NextResponse } from 'next/server';
import { itunesApi } from '@/lib/itunes-api';
import { supabasePodcastService } from '@/lib/supabase-podcast-service';
import { APP_CONFIG, ERROR_MESSAGES } from '@/constants';
import { AppErrorHandler, ApiResponseBuilder } from '@/utils';
import { Episode, Podcast, iTunesPodcastResult, iTunesEpisodeResult, iTunesEpisodeApiResponse } from '@/types';

function convertITunesToPodcast(itunesPodcast: iTunesPodcastResult): Podcast {
  return {
    id: itunesPodcast.collectionId.toString(),
    wrapperType: itunesPodcast.wrapperType,
    kind: itunesPodcast.kind,
    artistId: itunesPodcast.artistId,
    collectionId: itunesPodcast.collectionId,
    trackId: itunesPodcast.trackId,
    artistName: itunesPodcast.artistName,
    collectionName: itunesPodcast.collectionName,
    trackName: itunesPodcast.trackName,
    collectionCensoredName: itunesPodcast.collectionCensoredName,
    trackCensoredName: itunesPodcast.trackCensoredName,
    artistViewUrl: itunesPodcast.artistViewUrl,
    collectionViewUrl: itunesPodcast.collectionViewUrl,
    feedUrl: itunesPodcast.feedUrl,
    trackViewUrl: itunesPodcast.trackViewUrl,
    artworkUrl30: itunesPodcast.artworkUrl30,
    artworkUrl60: itunesPodcast.artworkUrl60,
    artworkUrl100: itunesPodcast.artworkUrl100,
    artworkUrl600: itunesPodcast.artworkUrl600,
    collectionPrice: itunesPodcast.collectionPrice,
    trackPrice: itunesPodcast.trackPrice,
    collectionHdPrice: itunesPodcast.collectionHdPrice,
    releaseDate: itunesPodcast.releaseDate,
    collectionExplicitness: itunesPodcast.collectionExplicitness,
    trackExplicitness: itunesPodcast.trackExplicitness,
    trackCount: itunesPodcast.trackCount,
    trackTimeMillis: itunesPodcast.trackTimeMillis,
    country: itunesPodcast.country,
    currency: itunesPodcast.currency,
    primaryGenreName: itunesPodcast.primaryGenreName,
    contentAdvisoryRating: itunesPodcast.contentAdvisoryRating,
    genreIds: itunesPodcast.genreIds,
    genres: itunesPodcast.genres,
    episodes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function convertITunesToEpisode(itunesEpisode: iTunesEpisodeResult): Episode {
  return {
    id: itunesEpisode.trackId.toString(),
    title: itunesEpisode.trackName,
    description: itunesEpisode.description || itunesEpisode.shortDescription,
    duration: itunesEpisode.trackTimeMillis ? Math.floor(itunesEpisode.trackTimeMillis / 1000) : null,
    pubDate: new Date(itunesEpisode.releaseDate),
    guid: itunesEpisode.episodeGuid || itunesEpisode.trackId.toString(),
    enclosureUrl: itunesEpisode.episodeUrl,
    enclosureType: itunesEpisode.episodeContentType,
    enclosureLength: null,
    itunesDuration: null,
    itunesExplicit: null,
    itunesImage: itunesEpisode.artworkUrl160,
    itunesOrder: null,
    itunesSubtitle: null,
    itunesSummary: itunesEpisode.shortDescription,
    itunesKeywords: null,
    itunesAuthor: null,
    podcastId: itunesEpisode.collectionId.toString(),
    podcastName: itunesEpisode.collectionName,
    podcastArtist: null,
    podcastArtwork: itunesEpisode.artworkUrl160,
    trackViewUrl: itunesEpisode.trackViewUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term');
    const country = searchParams.get('country') || APP_CONFIG.country;
    const raw = searchParams.get('raw') === 'true';

    if (!term || term.trim() === '') {
      return await handleTrendingContent(country, raw);
    }

    return await handleSearchTerm(term, country, raw);

  } catch (error) {
    const appError = AppErrorHandler.handleApiError(error);
    return NextResponse.json(
      { success: false, error: appError.message, details: appError.details, status: 500 },
      { status: 500 }
    );
  }
}

async function handleTrendingContent(country: string, raw: boolean): Promise<NextResponse> {
  const iTunesResponse = await itunesApi.getPodcastsWithFallback();
  
  if (!iTunesResponse.success || !iTunesResponse.data || iTunesResponse.data.resultCount === 0) {
    return NextResponse.json(
      ApiResponseBuilder.createErrorResponse(ERROR_MESSAGES.NOT_FOUND, 'trending', country)
      );
    }

  if (raw) {
    return NextResponse.json({
      message: 'Raw iTunes API response for trending content',
      source: 'itunes',
      country,
      searchTerm: 'trending',
      resultCount: iTunesResponse.data.resultCount,
      results: iTunesResponse.data.results,
      timestamp: new Date().toISOString()
    });
  }

  const podcastResults = iTunesResponse.data.results.filter(
    (result): result is iTunesPodcastResult => 'artistId' in result
  );
  const podcasts = podcastResults.map(convertITunesToPodcast);
  
  supabasePodcastService.saveTopPodcasts(`trending_podcasts_${country}`, podcasts).catch(error => {
    console.error('Failed to save to Supabase:', error);
  });

  const episodeResponse = await itunesApi.getTopEpisodes();
  let topEpisodes: Episode[] = [];
  
  if (episodeResponse.success && episodeResponse.data && episodeResponse.data.resultCount > 0) {
    const episodeData = episodeResponse.data as iTunesEpisodeApiResponse;
    topEpisodes = episodeData.results.map(convertITunesToEpisode);
    
    supabasePodcastService.saveEpisodes(topEpisodes).catch(error => {
      console.error('Failed to save episodes to Supabase:', error);
    });
  }

  const response = ApiResponseBuilder.createSearchResponse(
    podcasts,
    'trending',
    country,
    {
      resultCount: iTunesResponse.data.resultCount,
      savedCount: podcasts.length,
      timestamp: new Date().toISOString(),
      topEpisodes: topEpisodes
    }
  );

  return NextResponse.json(response);
}

async function handleSearchTerm(term: string, country: string, raw: boolean): Promise<NextResponse> {
  const combinedResponse = await itunesApi.searchPodcastsAndEpisodes(term);

  let podcasts: Podcast[] = [];
  let episodes: Episode[] = [];

  if (combinedResponse.success && combinedResponse.data) {
    if (combinedResponse.data.podcasts && combinedResponse.data.podcasts.resultCount > 0) {
      podcasts = combinedResponse.data.podcasts.results.map(convertITunesToPodcast);
    }

    if (combinedResponse.data.episodes && combinedResponse.data.episodes.resultCount > 0) {
      episodes = combinedResponse.data.episodes.results.map(convertITunesToEpisode);
    }
  }

  if (podcasts.length === 0 && episodes.length === 0) {
    return NextResponse.json(
      ApiResponseBuilder.createErrorResponse(`No podcasts or episodes found for "${term}"`, term, country)
    );
  }

  if (raw) {
    return NextResponse.json({
      message: `Raw iTunes API response for "${term}"`,
      source: 'itunes',
      country,
      searchTerm: term,
      resultCount: podcasts.length + episodes.length,
      podcasts: podcasts,
      episodes: episodes,
      timestamp: new Date().toISOString()
    });
  }

  if (podcasts.length > 0) {
    supabasePodcastService.saveSearchResults(term, podcasts).catch(error => {
      console.error('Failed to save to Supabase:', error);
    });
  }

  if (episodes.length > 0) {
    supabasePodcastService.saveEpisodes(episodes).catch(error => {
      console.error('Failed to save episodes to Supabase:', error);
    });
  }

  const response = ApiResponseBuilder.createSearchResponse(
    podcasts,
    term,
    country,
    {
      resultCount: podcasts.length + episodes.length,
      savedCount: podcasts.length,
      timestamp: new Date().toISOString(),
      topEpisodes: episodes
    }
  );

  return NextResponse.json(response);
}

 