'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useSearchState } from '@/features/search/hooks/useSearchState';

interface SearchContextType {
  searchTerm: string;
  searchResults: unknown;
  hasSearched: boolean;
  isLoading: boolean;
  error: Error | null;
  handleSearchChange: (value: string) => void;
  clearSearch: () => void;
  initializeSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const searchState = useSearchState();


  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
} 