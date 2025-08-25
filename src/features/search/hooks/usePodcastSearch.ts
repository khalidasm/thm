import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { Podcast, Episode } from '@/types';

interface SearchResponse {
  podcasts: Podcast[];
  episodes: Episode[];
}

interface UsePodcastSearchOptions {
  searchTerm: string;
  enabled?: boolean;
  debounceMs?: number;
}

export function usePodcastSearch({ 
  searchTerm, 
  enabled = true, 
  debounceMs = 500 
}: UsePodcastSearchOptions) {
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);
  
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['podcast-search', debouncedSearchTerm],
    queryFn: async (): Promise<SearchResponse> => {
      if (!debouncedSearchTerm.trim()) {
        return { podcasts: [], episodes: [] };
      }

      const response = await fetch(`/api/podcasts/search?term=${encodeURIComponent(debouncedSearchTerm)}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle different response formats
      if (data.success === false) {
        // Error response format: { success: false, error: string, details: unknown, status: number }
        throw new Error(data.error || 'Search failed');
      }
      
      // Success response format: SearchApiResponse (direct object with podcasts, message, etc.)
      if (!data.podcasts) {
        throw new Error(data.message || 'Search failed - no podcasts found');
      }

      // Use episodes from the API response if available
      const episodes = data.topEpisodes || [];

      return {
        podcasts: data.podcasts || [],
        episodes: episodes
      };
    },
    enabled: enabled && debouncedSearchTerm.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    data,
    isLoading: isLoading || isFetching,
    error,
    refetch,
    isError,
    debouncedSearchTerm,
    hasSearched: debouncedSearchTerm.trim().length > 0,
  };
} 