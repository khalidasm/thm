import axios, { AxiosInstance } from 'axios';
import { 
  iTunesApiResponse, 
  iTunesEpisodeApiResponse,
  iTunesPodcastResult,
  iTunesEpisodeResult,
  ServiceResponse 
} from '@/types';
import { 
  ITUNES_API_CONFIG, 
  SEARCH_CONFIG,
  APP_CONFIG
} from '@/constants';
import { 
  AppErrorHandler, 
  ValidationUtils, 
  HttpUtils 
} from '@/utils';

export class iTunesApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: ITUNES_API_CONFIG.baseUrl,
      timeout: ITUNES_API_CONFIG.timeout,
      headers: {
        'User-Agent': ITUNES_API_CONFIG.userAgent,
      },
    });
  }

  async searchPodcasts(
    term: string
  ): Promise<ServiceResponse<iTunesApiResponse>> {
    try {
      if (!ValidationUtils.isValidSearchTerm(term)) {
        return {
          success: false,
          error: AppErrorHandler.handleValidationError('Invalid search term'),
        };
      }

      const sanitizedTerm = ValidationUtils.sanitizeSearchTerm(term);
      
      const response = await HttpUtils.retryOperation(async () => {
        return this.client.get(ITUNES_API_CONFIG.searchEndpoint, {
          params: {
            term: sanitizedTerm,
            media: 'podcast',
            entity: 'podcast',
            country: APP_CONFIG.country,
            limit: 50,
          },
        });
      });

      const data: iTunesApiResponse = response.data;
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: AppErrorHandler.handleApiError(error),
      };
    }
  }

  async searchEpisodes(
    term: string
  ): Promise<ServiceResponse<iTunesEpisodeApiResponse>> {
    try {
      if (!ValidationUtils.isValidSearchTerm(term)) {
        return {
          success: false,
          error: AppErrorHandler.handleValidationError('Invalid search term'),
        };
      }

      const sanitizedTerm = ValidationUtils.sanitizeSearchTerm(term);
      
      const response = await HttpUtils.retryOperation(async () => {
        return this.client.get(ITUNES_API_CONFIG.searchEndpoint, {
          params: {
            term: sanitizedTerm,
            media: 'podcast',
            entity: 'podcastEpisode',
            country: APP_CONFIG.country,
            limit: 50,
          },
        });
      });

      const data: iTunesEpisodeApiResponse = response.data;
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: AppErrorHandler.handleApiError(error),
      };
    }
  }

  async searchPodcastsAndEpisodes(
    term: string
  ): Promise<ServiceResponse<{ podcasts: iTunesApiResponse; episodes: iTunesEpisodeApiResponse }>> {
    try {
      if (!ValidationUtils.isValidSearchTerm(term)) {
        return {
          success: false,
          error: AppErrorHandler.handleValidationError('Invalid search term'),
        };
      }

      const sanitizedTerm = ValidationUtils.sanitizeSearchTerm(term);
      
      const response = await HttpUtils.retryOperation(async () => {
        return this.client.get(ITUNES_API_CONFIG.searchEndpoint, {
          params: {
            term: sanitizedTerm,
            media: 'podcast',
            entity: 'podcast,podcastEpisode',
            country: APP_CONFIG.country,
            limit: 50,
          },
        });
      });

      const data = response.data;
      
      // Separate podcasts and episodes from the response
      const podcasts = data.results.filter((item: iTunesPodcastResult | iTunesEpisodeResult) => item.kind === 'podcast');
      const episodes = data.results.filter((item: iTunesPodcastResult | iTunesEpisodeResult) => item.kind === 'podcast-episode');
      
      return {
        success: true,
        data: {
          podcasts: { resultCount: podcasts.length, results: podcasts },
          episodes: { resultCount: episodes.length, results: episodes }
        },
      };
    } catch (error) {
      return {
        success: false,
        error: AppErrorHandler.handleApiError(error),
      };
    }
  }

  async getTopPodcasts(): Promise<ServiceResponse<iTunesApiResponse>> {
    try {

      const response = await HttpUtils.retryOperation(async () => {
        return this.client.get(ITUNES_API_CONFIG.searchEndpoint, {
          params: {
            media: 'podcast',
            entity: 'podcast',
            country: APP_CONFIG.country,
            limit: 50,
          },
        });
      });

      const data: iTunesApiResponse = response.data;
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: AppErrorHandler.handleApiError(error),
      };
    }
  }

  async getTrendingPodcasts(): Promise<ServiceResponse<iTunesApiResponse>> {
    try {

      const response = await HttpUtils.retryOperation(async () => {
        return this.client.get(ITUNES_API_CONFIG.searchEndpoint, {
          params: {
            media: 'podcast',
            entity: 'podcast',
            attribute: 'ratingIndex',
            country: APP_CONFIG.country,
            limit: 50,
          },
        });
      });

      const data: iTunesApiResponse = response.data;
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: AppErrorHandler.handleApiError(error),
      };
    }
  }

  async getPodcastById(
    collectionId: number
  ): Promise<ServiceResponse<iTunesApiResponse>> {
    try {
      if (!collectionId || collectionId <= 0) {
        return {
          success: false,
          error: AppErrorHandler.handleValidationError('Invalid collection ID'),
        };
      }

      const response = await HttpUtils.retryOperation(async () => {
        return this.client.get(ITUNES_API_CONFIG.lookupEndpoint, {
          params: {
            id: collectionId,
            entity: 'podcast',
            country: APP_CONFIG.country,
          },
        });
      });

      const data: iTunesApiResponse = response.data;
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: AppErrorHandler.handleApiError(error),
      };
    }
  }

  async searchWithFallback(
    primaryTerm: string
  ): Promise<ServiceResponse<iTunesApiResponse>> {
    const primaryResult = await this.searchPodcasts(primaryTerm);
    if (primaryResult.success && primaryResult.data && primaryResult.data.resultCount > 0) {
      return primaryResult;
    }

    for (const fallbackTerm of SEARCH_CONFIG.fallbackTerms) {
      const fallbackResult = await this.searchPodcasts(fallbackTerm);
      if (fallbackResult.success && fallbackResult.data && fallbackResult.data.resultCount > 0) {
        return fallbackResult;
      }
    }

    return await this.getTrendingPodcasts();
  }

  async getPodcastsWithFallback(): Promise<ServiceResponse<iTunesApiResponse>> {
    try {
      const response = await HttpUtils.retryOperation(async () => {
        return this.client.get(ITUNES_API_CONFIG.searchEndpoint, {
          params: {
            term: 'podcast',
            media: 'podcast',
            entity: 'podcast',
            country: APP_CONFIG.country,
            limit: 50,
          },
        });
      });

      const data: iTunesApiResponse = response.data;
      
      if (data.resultCount > 0) {
        return {
          success: true,
          data,
        };
      }

      return {
        success: false,
        error: AppErrorHandler.createError('NO_RESULTS', 'No trending podcasts found'),
      };
    } catch (error) {
      return {
        success: false,
        error: AppErrorHandler.handleApiError(error),
      };
    }
  }

  async getTopEpisodes(): Promise<ServiceResponse<iTunesEpisodeApiResponse>> {
    try {
      const response = await HttpUtils.retryOperation(async () => {
        return this.client.get(ITUNES_API_CONFIG.searchEndpoint, {
          params: {
            term: 'news',
            media: 'podcast',
            entity: 'podcastEpisode',
            country: APP_CONFIG.country,
            limit: 50,
          },
        });
      });

      const data: iTunesEpisodeApiResponse = response.data;
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: AppErrorHandler.handleApiError(error),
      };
    }
  }
}

export const itunesApi = new iTunesApiService(); 