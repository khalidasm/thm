# Types Directory

The `@types/` directory contains TypeScript type definitions that provide type safety and structure for the entire application. These types define the shape of data structures, API responses, database schemas, and application configurations.

## Directory Structure

```
src/types/
├── index.ts        # Main type definitions and exports
└── database.ts     # Database-specific types and type guards
```

## Type Categories

### 🌐 API Response Types

#### `ApiResponse<T>`
Generic API response wrapper for consistent error handling.

```typescript
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

#### `SearchApiResponse`
Complete search response structure from iTunes API.

```typescript
interface SearchApiResponse {
  message: string;
  source: 'itunes';
  searchTerm: string;
  country: string;
  podcasts: Podcast[];
  resultCount: number;
  savedCount?: number;
  searchHistoryId?: string;
  timestamp?: string;
  topEpisodes?: Episode[];
}
```

#### `ServiceResponse<T>`
Standardized service response for internal services.

```typescript
interface ServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: AppError;
}
```

### 🎵 iTunes API Types

#### `iTunesPodcastResult`
Raw podcast data structure from iTunes API.

```typescript
interface iTunesPodcastResult {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  // ... additional fields
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}
```

#### `iTunesEpisodeResult`
Raw episode data structure from iTunes API.

```typescript
interface iTunesEpisodeResult {
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  collectionName: string;
  trackName: string;
  // ... additional fields
  description: string;
}
```

#### `iTunesApiResponse`
iTunes API response wrapper for podcasts.

```typescript
interface iTunesApiResponse {
  resultCount: number;
  results: iTunesPodcastResult[];
}
```

#### `iTunesEpisodeApiResponse`
iTunes API response wrapper for episodes.

```typescript
interface iTunesEpisodeApiResponse {
  resultCount: number;
  results: iTunesEpisodeResult[];
}
```

### 🎧 Application Domain Types

#### `Podcast`
Application-level podcast type with additional metadata.

```typescript
interface Podcast {
  id: string;
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  // ... additional fields
  episodes?: Episode[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### `Episode`
Application-level episode type with podcast metadata.

```typescript
interface Episode {
  id: string;
  title: string;
  description?: string | null;
  duration?: number | null;
  pubDate?: Date | null;
  guid?: string | null;
  // ... additional fields
  podcastId: string;
  podcastName?: string | null;
  podcastArtist?: string | null;
  podcastArtwork?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

#### `EpisodeData`
Episode data for creation/updates.

```typescript
interface EpisodeData {
  title: string;
  description?: string;
  duration?: number;
  pubDate?: Date;
  guid?: string;
  // ... additional fields
  itunesAuthor?: string;
}
```

#### `Genre`
Genre information for podcasts.

```typescript
interface Genre {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 🔍 Search Types

#### `SearchHistory`
Search query history tracking.

```typescript
interface SearchHistory {
  id: string;
  term: string;
  resultCount: number;
  podcasts?: Podcast[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### `SearchResult`
Complete search result structure.

```typescript
interface SearchResult {
  message: string;
  source: 'itunes';
  searchTerm: string;
  country: string;
  podcasts: Podcast[];
  resultCount: number;
  savedCount?: number;
  searchHistoryId?: string;
  timestamp?: string;
  topEpisodes?: Episode[];
}
```

### ⚙️ Configuration Types

#### `AppConfig`
Application configuration settings.

```typescript
interface AppConfig {
  country: string;
}
```

#### `AppError`
Standardized error structure.

```typescript
interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}
```

### 🗄️ Database Types (`database.ts`)

#### `DatabasePodcast`
Database-specific podcast type matching Supabase schema.

```typescript
interface DatabasePodcast {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  collectionId: number;
  trackId: number;
  artistName: string | null;
  collectionName: string;
  // ... additional fields
  searchHistoryId: string | null;
  genres?: DatabaseGenre[];
  episodes?: DatabaseEpisode[];
}
```

#### `DatabaseEpisode`
Database-specific episode type.

```typescript
interface DatabaseEpisode {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  podcastId: string;
  title: string;
  // ... additional fields
  itunesAuthor: string | null;
}
```

#### `DatabaseGenre`
Database-specific genre type.

```typescript
interface DatabaseGenre {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### `DatabaseSearchHistory`
Database-specific search history type.

```typescript
interface DatabaseSearchHistory {
  id: string;
  term: string;
  resultCount: number;
  createdAt: Date;
  updatedAt: Date;
  podcasts?: DatabasePodcast[];
}
```

## Type Guards

### Database Type Guards
Type guards for runtime type checking of database objects.

```typescript
// Check if object is a DatabasePodcast
function isDatabasePodcast(obj: unknown): obj is DatabasePodcast

// Check if object is a DatabaseEpisode
function isDatabaseEpisode(obj: unknown): obj is DatabaseEpisode

// Check if object is a DatabaseGenre
function isDatabaseGenre(obj: unknown): obj is DatabaseGenre

// Check if object is a DatabaseSearchHistory
function isDatabaseSearchHistory(obj: unknown): obj is DatabaseSearchHistory
```

**Usage**:
```typescript
import { isDatabasePodcast } from '@/types/database';

const data = await fetchPodcastData();
if (isDatabasePodcast(data)) {
  // TypeScript knows data is DatabasePodcast
  console.log(data.collectionName);
}
```

## Usage Examples

### API Response Handling
```typescript
import { ApiResponse, Podcast } from '@/types';

async function fetchPodcasts(): Promise<ApiResponse<Podcast[]>> {
  try {
    const response = await fetch('/api/podcasts');
    const data = await response.json();
    
    return {
      success: true,
      data: data.podcasts,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
```

### iTunes API Integration
```typescript
import { iTunesApiResponse, iTunesPodcastResult } from '@/types';

async function searchPodcasts(term: string): Promise<iTunesApiResponse> {
  const response = await fetch(`/api/itunes/search?term=${term}`);
  return response.json();
}

function processPodcastResult(result: iTunesPodcastResult): Podcast {
  return {
    id: result.collectionId.toString(),
    collectionName: result.collectionName,
    artistName: result.artistName,
    // ... transform other fields
  };
}
```

### Database Operations
```typescript
import { DatabasePodcast, isDatabasePodcast } from '@/types/database';

async function getPodcastFromDatabase(id: string): Promise<DatabasePodcast | null> {
  const { data } = await supabase
    .from('podcasts')
    .select('*')
    .eq('id', id)
    .single();
    
  if (data && isDatabasePodcast(data)) {
    return data;
  }
  
  return null;
}
```

### Search State Management
```typescript
import { SearchResult, Podcast } from '@/types';

interface SearchState {
  searchTerm: string;
  results: SearchResult | null;
  isLoading: boolean;
  error: string | null;
}

function updateSearchResults(state: SearchState, results: SearchResult): SearchState {
  return {
    ...state,
    results,
    isLoading: false,
    error: null,
  };
}
```

## Design Principles

### Type Safety
- **Strict Typing**: All data structures are strictly typed
- **Generic Types**: Flexible generic types for reusable patterns
- **Union Types**: Proper union types for optional fields
- **Literal Types**: Specific literal types for constants

### Consistency
- **Naming Conventions**: Consistent naming across all types
- **Structure Patterns**: Similar structure for related types
- **Optional Fields**: Consistent use of optional fields
- **Date Handling**: Consistent Date type usage

### Maintainability
- **Separation of Concerns**: API types vs Database types
- **Type Guards**: Runtime type checking capabilities
- **Documentation**: Clear type documentation
- **Extensibility**: Easy to extend and modify

## Best Practices

### Type Usage

1. **Import Specific Types**: Import only what you need
2. **Use Type Guards**: Validate data at runtime
3. **Generic Constraints**: Use proper generic constraints
4. **Union Types**: Use union types for optional fields

### Type Definition

1. **Descriptive Names**: Use clear, descriptive type names
2. **Consistent Structure**: Follow established patterns
3. **Documentation**: Add JSDoc comments for complex types
4. **Validation**: Include validation in type guards

### Database Types

1. **Schema Alignment**: Keep types aligned with database schema
2. **Null Handling**: Properly handle nullable fields
3. **Relationships**: Define proper relationship types
4. **Type Guards**: Include type guards for validation

## Adding New Types

To add new types:

1. **Choose the right file**: Use `index.ts` for general types, `database.ts` for database types
2. **Follow naming conventions**: Use PascalCase for interfaces
3. **Add proper documentation**: Include JSDoc comments
4. **Export from index**: Add to main exports if needed
5. **Update this README**: Document the new types

### Type Template

```typescript
/**
 * Description of the type
 */
export interface YourType {
  /** Field description */
  id: string;
  /** Field description */
  name: string;
  /** Optional field description */
  description?: string;
  /** Date field */
  createdAt: Date;
  /** Date field */
  updatedAt: Date;
}

// Type guard if needed
export function isYourType(obj: unknown): obj is YourType {
  return obj !== null && 
         typeof obj === 'object' && 
         'id' in obj && 
         'name' in obj;
}
```

## Dependencies

Types depend on:
- `typescript` - TypeScript language support
- Application-specific business logic
- Database schema definitions
- API response structures
