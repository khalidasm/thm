'use client';

import { LoadingWrapper, ContentSectionsSkeleton } from '@/components/layout';
import { ContentSections } from '@/components/layout';
import { useTrendingData } from '@/features/podcast/hooks';
import { useSearchContext } from '@/lib/contexts/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchClient = () => {
  const { data: trendingData, isLoading: trendingLoading, error: trendingError } = useTrendingData();
  const { 
    searchTerm,
    searchResults,
    hasSearched,
    isLoading: searchLoading, 
    error: searchError
  } = useSearchContext();
  
  const isLoading = trendingLoading || (searchLoading && hasSearched);
  const error = trendingError || searchError;

  interface SearchResultsType {
    podcasts: unknown[];
    episodes: unknown[];
  }
  const typedSearchResults = searchResults as SearchResultsType | undefined;
  const searchResultsPodcasts = typedSearchResults?.podcasts || [];
  const searchResultsEpisodes = typedSearchResults?.episodes || [];

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Something went wrong</h3>
            <p className="text-muted-foreground">{error.message}</p>
          </div>
          <Button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            Try Again
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!isLoading && hasSearched && searchResultsPodcasts.length === 0 && searchResultsEpisodes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">No results found</h3>
            <p className="text-muted-foreground">
              No podcasts or episodes found for &quot;{searchTerm}&quot;
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or browse trending content
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <LoadingWrapper
      isLoading={isLoading}
      variant="skeleton"
      skeletonComponent={ContentSectionsSkeleton}
      delay={0.3}
    >
      <AnimatePresence mode="wait">
        {trendingData && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <ContentSections />
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingWrapper>
  );
} 

export default SearchClient;