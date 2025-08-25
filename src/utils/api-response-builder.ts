import { SearchApiResponse, Podcast, Episode } from '@/types';
import { SUCCESS_MESSAGES } from '@/constants';

export class ApiResponseBuilder {
  static createSearchResponse(
    podcasts: Podcast[],
    searchTerm: string,
    country: string,
    options?: {
      resultCount?: number;
      savedCount?: number;
      searchHistoryId?: string;
      timestamp?: string;
      topEpisodes?: Episode[];
    }
  ): SearchApiResponse {
    return {
      message: this.getMessage(searchTerm),
      source: 'itunes',
      country,
      searchTerm,
      podcasts,
      resultCount: options?.resultCount || podcasts.length,
      savedCount: options?.savedCount,
      searchHistoryId: options?.searchHistoryId,
      timestamp: options?.timestamp,
      topEpisodes: options?.topEpisodes,
    };
  }

  static createErrorResponse(
    message: string,
    searchTerm: string,
    country: string
  ): SearchApiResponse {
    return {
      message,
      source: 'itunes',
      country,
      searchTerm,
      podcasts: [],
      resultCount: 0,
    };
  }

  private static getMessage(searchTerm: string): string {
    return searchTerm === 'trending'
      ? SUCCESS_MESSAGES.PODCASTS_LOADED
      : `Search results for "${searchTerm}" fetched successfully`;
  }
} 