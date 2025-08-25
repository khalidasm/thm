import { useQuery } from '@tanstack/react-query';
import { Podcast, Episode } from '@/types';

interface TrendingResponse {
  podcasts: Podcast[];
  episodes: Episode[];
}

export function useTrendingData() {
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['trending-data'],
    queryFn: async (): Promise<TrendingResponse> => {
      const response = await fetch('/api/podcasts/search');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch trending data: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success === false) {
        throw new Error(data.error || 'Failed to fetch trending data');
      }
      
      if (!data.podcasts) {
        throw new Error(data.message || 'Failed to fetch trending data - no podcasts found');
      }

      const episodes = data.topEpisodes || [];

      return {
        podcasts: data.podcasts || [],
        episodes: episodes
      };
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return {
    data,
    isLoading: isLoading || isFetching,
    error,
    refetch,
    isError,
  };
} 