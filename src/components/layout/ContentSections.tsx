'use client';

import { PodcastGrid } from '@/features/podcast/components';
import { EpisodeGrid } from '@/features/episode/components';
import { Podcast, Episode } from '@/types';
import { useTrendingData } from '@/features/podcast/hooks';
import { useSearchContext } from '@/lib/contexts/SearchContext';
import { LoadingWrapper, PodcastGridSkeleton, EpisodeGridSkeleton } from '@/components/layout';

interface SearchResultsType {
  podcasts: Podcast[];
  episodes: Episode[];
}

const ContentSections = () => {
  const { data: trendingData } = useTrendingData();
  const { searchResults, hasSearched } = useSearchContext();

  const podcasts = hasSearched ? (searchResults as SearchResultsType)?.podcasts || [] : trendingData?.podcasts || [];
  const episodes = hasSearched ? (searchResults as SearchResultsType)?.episodes || [] : trendingData?.episodes || [];
  const context = hasSearched ? 'search' : 'trending';

  return (
    <div className='flex flex-col space-y-12'>
      {podcasts.length > 0 && (
        <section className="w-full">
          <LoadingWrapper
            isLoading={!trendingData && !hasSearched}
            variant="skeleton"
            skeletonComponent={PodcastGridSkeleton}
          >
            <PodcastGrid 
              podcasts={podcasts} 
              context={context}
            />
          </LoadingWrapper>
        </section>
      )}
      
      {episodes.length > 0 && (
        <section className="w-full">
          <LoadingWrapper
            isLoading={!trendingData && !hasSearched}
            variant="skeleton"
            skeletonComponent={EpisodeGridSkeleton}
          >
            <EpisodeGrid 
              episodes={episodes} 
              context={context}
            />
          </LoadingWrapper>
        </section>
      )}
    </div>
  );
}

export default ContentSections;