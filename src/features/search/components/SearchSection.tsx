'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchContext } from '@/lib/contexts/SearchContext';

const SearchSection = () => {
  const { searchTerm, handleSearchChange } = useSearchContext();

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        placeholder="Search for podcasts and episodes..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="pl-12 pr-4 py-3 w-full text-base border-2 focus:border-primary/50 transition-colors"
      />
    </div>
  );
};

export default SearchSection;