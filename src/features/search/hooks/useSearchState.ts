'use client';

import { useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { usePodcastSearch } from './usePodcastSearch';

interface UseSearchStateOptions {
  debounceMs?: number;
}

interface SearchState {
  searchTerm: string;
  debouncedSearchTerm: string;
  searchResults: unknown;
  hasSearched: boolean;
  isLoading: boolean;
  error: Error | null;
}

interface SearchActions {
  handleSearchChange: (value: string) => void;
  clearSearch: () => void;
  initializeSearchTerm: (term: string) => void;
}

export function useSearchState({ debounceMs = 500 }: UseSearchStateOptions = {}): SearchState & SearchActions {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const initialSearchTerm = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
    hasSearched,
    debouncedSearchTerm,
  } = usePodcastSearch({
    searchTerm,
    enabled: true,
    debounceMs,
  });

  const updateURL = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term.trim()) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    
    const newUrl = params.toString() 
      ? `${pathname}?${params.toString()}` 
      : pathname;
    
    router.replace(newUrl);
  }, [searchParams, pathname, router]);

  // Search actions
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    updateURL(value);
  }, [updateURL]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    updateURL('');
  }, [updateURL]);

  const initializeSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return {
    // State
    searchTerm,
    debouncedSearchTerm,
    searchResults,
    hasSearched,
    
    // Loading and error states
    isLoading: searchLoading,
    error: searchError,
    
    // Actions
    handleSearchChange,
    clearSearch,
    initializeSearchTerm,
  };
} 