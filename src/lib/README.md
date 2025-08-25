# Lib Directory

The `@lib/` directory contains core libraries, services, utilities, and configurations that provide foundational functionality for the application. This directory serves as the central hub for external integrations, database connections, and shared utilities.

## Directory Structure

```
src/lib/
├── contexts/                    # React context providers
│   ├── SearchContext.tsx       # Search state management
│   └── index.ts                # Context exports
├── itunes-api.ts               # iTunes API service
├── supabase.ts                 # Supabase client configuration
├── supabase-podcast-service.ts # Supabase podcast operations
├── query-client.ts             # React Query client configuration
├── utils.ts                    # Utility functions
└── index.ts                    # Main exports
```

## Core Services

### 🎵 iTunes API Service (`itunes-api.ts`)

**Purpose**: Handles all interactions with the iTunes Podcast API.

**Key Features**:
- **Search Operations**: Search for podcasts and episodes
- **Trending Data**: Fetch trending and top podcasts
- **Lookup Operations**: Get podcast details by ID
- **Fallback Logic**: Automatic fallback to trending content
- **Error Handling**: Comprehensive error management
- **Country Localization**: Region-specific results

**Available Methods**:
- `searchPodcasts(term)` - Search for podcasts
- `searchEpisodes(term)` - Search for episodes
- `searchPodcastsAndEpisodes(term)` - Combined search
- `getTopPodcasts()` - Get top podcasts
- `getTrendingPodcasts()` - Get trending podcasts
- `getPodcastById(id)` - Get podcast by collection ID
- `searchWithFallback(term)` - Search with fallback logic
- `getTopEpisodes()` - Get top episodes

**Usage**:
```typescript
import { itunesApi } from '@/lib';

// Search for podcasts
const result = await itunesApi.searchPodcasts('react');
if (result.success) {
  console.log(result.data.results);
}

// Get trending podcasts
const trending = await itunesApi.getTrendingPodcasts();
```

### 🗄️ Supabase Client (`supabase.ts`)

**Purpose**: Supabase client configuration and database type definitions.

**Key Features**:
- **Client Configuration**: Configured Supabase client instance
- **Type Safety**: Full TypeScript database schema types
- **Environment Validation**: Ensures required environment variables
- **Database Schema**: Complete type definitions for tables

**Database Tables**:
- `search_history` - Search query history
- `podcasts` - Podcast data storage
- `episodes` - Episode data storage

**Usage**:
```typescript
import { supabase } from '@/lib';

// Query data
const { data, error } = await supabase
  .from('podcasts')
  .select('*')
  .limit(10);

// Insert data
const { error } = await supabase
  .from('search_history')
  .insert({ term: 'react', result_count: 25 });
```

### 🎧 Supabase Podcast Service (`supabase-podcast-service.ts`)

**Purpose**: High-level service for podcast-related database operations.

**Key Features**:
- **Data Persistence**: Save podcasts and episodes to database
- **Search History**: Track search queries and results
- **Batch Operations**: Efficient bulk data operations
- **Data Transformation**: Convert between API and database formats
- **Error Handling**: Robust error management

**Available Methods**:
- `saveTopPodcasts(cacheKey, podcasts)` - Save trending podcasts
- `saveEpisodes(cacheKey, episodes)` - Save episodes
- `getSearchHistory()` - Get search history
- `getPodcastsBySearchHistory(id)` - Get podcasts by search
- `getEpisodesBySearchHistory(id)` - Get episodes by search

**Usage**:
```typescript
import { supabasePodcastService } from '@/lib';

// Save trending podcasts
const result = await supabasePodcastService.saveTopPodcasts(
  'trending',
  podcasts
);

// Get search history
const history = await supabasePodcastService.getSearchHistory();
```

## React Contexts

### 🔍 Search Context (`contexts/SearchContext.tsx`)

**Purpose**: Global search state management using React Context.

**Key Features**:
- **Global State**: Shared search state across components
- **Search Management**: Handle search terms and results
- **Loading States**: Track search loading status
- **Error Handling**: Manage search errors
- **State Persistence**: Maintain search state across navigation

**Context Interface**:
```typescript
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
```

**Usage**:
```tsx
import { SearchProvider, useSearchContext } from '@/lib/contexts';

// Wrap your app
<SearchProvider>
  <YourApp />
</SearchProvider>

// Use in components
function SearchComponent() {
  const { searchTerm, handleSearchChange, isLoading } = useSearchContext();
  
  return (
    <input
      value={searchTerm}
      onChange={(e) => handleSearchChange(e.target.value)}
    />
  );
}
```

## Configuration

### 🔄 React Query Client (`query-client.ts`)

**Purpose**: Global React Query configuration for data fetching.

**Configuration**:
- **Stale Time**: 5 minutes (queries considered fresh)
- **GC Time**: 10 minutes (cache garbage collection)
- **Retry**: 2 retry attempts on failure
- **Window Focus**: Disabled refetch on window focus

**Usage**:
```typescript
import { queryClient } from '@/lib/query-client';

// Use in QueryClientProvider
<QueryClientProvider client={queryClient}>
  <YourApp />
</QueryClientProvider>
```

### 🛠️ Utilities (`utils.ts`)

**Purpose**: Shared utility functions for common operations.

**Available Functions**:
- `cn(...inputs)` - Class name utility for Tailwind CSS

**Usage**:
```typescript
import { cn } from '@/lib/utils';

// Merge class names
const className = cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

## Design Principles

### Service Architecture
- **Separation of Concerns**: Each service handles specific functionality
- **Error Handling**: Comprehensive error management across all services
- **Type Safety**: Full TypeScript support with proper typing
- **Configuration**: Centralized configuration management

### Data Flow
- **API Integration**: iTunes API for external data
- **Database Storage**: Supabase for data persistence
- **State Management**: React Context for global state
- **Caching**: React Query for efficient data caching

### Performance
- **Connection Pooling**: Efficient database connections
- **Request Optimization**: Debounced and optimized API calls
- **Caching Strategy**: Intelligent data caching
- **Error Recovery**: Robust error handling and retry logic

## Best Practices

### Service Usage

1. **Error Handling**: Always check for errors in service responses
2. **Type Safety**: Use proper TypeScript types for all operations
3. **Async/Await**: Use proper async/await patterns
4. **Resource Cleanup**: Clean up resources and connections

### Database Operations

1. **Batch Operations**: Use batch operations for multiple records
2. **Indexing**: Ensure proper database indexing
3. **Connection Management**: Manage database connections efficiently
4. **Data Validation**: Validate data before database operations

### API Integration

1. **Rate Limiting**: Respect API rate limits
2. **Caching**: Implement appropriate caching strategies
3. **Error Recovery**: Handle API failures gracefully
4. **Monitoring**: Monitor API usage and performance

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Dependencies

Core dependencies:
- `@supabase/supabase-js` - Supabase client
- `axios` - HTTP client for API requests
- `@tanstack/react-query` - Data fetching and caching
- `clsx` - Class name utility
- `tailwind-merge` - Tailwind CSS class merging
- `uuid` - UUID generation

## Adding New Services

To add a new service:

1. **Create the service file** in the lib directory
2. **Follow naming convention**: Use descriptive names
3. **Add TypeScript types**: Include proper interfaces
4. **Export from index**: Add to main index.ts file
5. **Document usage**: Add JSDoc comments and examples
6. **Update this README**: Document the new service

### Service Template

```typescript
import { ServiceResponse } from '@/types';

export class YourService {
  async yourMethod(): Promise<ServiceResponse<YourDataType>> {
    try {
      // Service implementation
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }
}

export const yourService = new YourService();
```
