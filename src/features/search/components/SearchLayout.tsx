'use client';

import SearchSection from './SearchSection';

interface SearchLayoutProps {
  children: React.ReactNode;
}

const SearchLayout = ({ children }: SearchLayoutProps) => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50 pb-6 pt-4">
        <SearchSection />
      </div>
      <main className="flex-1 pt-8">
        {children}
      </main>
    </div>
  );
}; 

export default SearchLayout;