# Features Directory

The `@features/` directory contains feature-based modules that organize the application's functionality into logical, self-contained units. Each feature encapsulates related components, hooks, services, and types to promote maintainability and separation of concerns.

## Directory Structure

```
src/features/
├── admin/           # Database administration interface
├── episode/         # Episode display and management
├── podcast/         # Podcast display and trending data
└── search/          # Search functionality and results
```

## Feature Modules

### 🎙️ Podcast Feature (`@features/podcast/`)

**Purpose**: Handles podcast display, trending data, and podcast-related functionality.

**Structure**:
- `components/` - UI components for displaying podcasts
  - `PodcastCard.tsx` - Individual podcast card with artwork, title, and actions
  - `PodcastGrid.tsx` - Grid layout for displaying multiple podcasts
- `hooks/` - Custom React hooks
  - `useTrendingData.ts` - Fetches trending podcasts and episodes from API
- `index.ts` - Public exports

**Key Features**:
- Displays podcast cards with artwork, titles, and metadata
- Supports hiding/unhiding podcasts with dropdown actions
- Fetches trending podcast data with caching
- Responsive grid layout for podcast collections

**Usage**:
```tsx
import { PodcastCard, PodcastGrid, useTrendingData } from '@features/podcast';

// Use trending data hook
const { data, isLoading } = useTrendingData();

// Display podcast grid
<PodcastGrid podcasts={data?.podcasts} />
```

### 🎧 Episode Feature (`@features/episode/`)

**Purpose**: Manages episode display and episode-related functionality.

**Structure**:
- `components/` - UI components for displaying episodes
  - `EpisodeCard.tsx` - Individual episode card with details
  - `EpisodeGrid.tsx` - Grid layout for displaying multiple episodes
- `index.ts` - Public exports

**Key Features**:
- Displays episode cards with metadata and descriptions
- Responsive grid layout for episode collections
- Episode information display with proper formatting

**Usage**:
```tsx
import { EpisodeCard, EpisodeGrid } from '@features/episode';

// Display episode grid
<EpisodeGrid episodes={episodes} />
```

### 🔍 Search Feature (`@features/search/`)

**Purpose**: Provides comprehensive search functionality for podcasts and episodes.

**Structure**:
- `components/` - Search UI components
  - `SearchClient.tsx` - Main search client with results display
  - `SearchLayout.tsx` - Search page layout wrapper
  - `SearchSection.tsx` - Search input and controls section
- `hooks/` - Search-related hooks
  - `usePodcastSearch.ts` - Handles podcast/episode search with debouncing
  - `useSearchState.ts` - Manages search state and context
- `index.ts` - Public exports

**Key Features**:
- Debounced search with configurable delay
- Real-time search results for podcasts and episodes
- Error handling and loading states
- Search state management with React Context
- Integration with iTunes API for search results

**Usage**:
```tsx
import { SearchClient, usePodcastSearch } from '@features/search';

// Use search hook
const { data, isLoading, error } = usePodcastSearch({ 
  searchTerm: 'react', 
  debounceMs: 500 
});

// Display search interface
<SearchClient />
```

### ⚙️ Admin Feature (`@features/admin/`)

**Purpose**: Provides database administration interface for managing Supabase data.

**Structure**:
- `components/` - Admin UI components
  - `DatabaseAdmin.tsx` - Main admin interface component
  - `TableList.tsx` - List of available database tables
  - `TableData.tsx` - Data display for selected table
  - `DatabasePagination.tsx` - Pagination controls
  - `SearchAndPagination.tsx` - Search and pagination wrapper
  - `ErrorDisplay.tsx` - Error state display
  - `EmptyState.tsx` - Empty state display
- `hooks/` - Admin-related hooks
  - `useDatabaseAdmin.ts` - Database operations and state management
- `services/` - Database service functions
  - `database-service.ts` - Supabase database operations
- `types/` - Admin-related TypeScript types
- `index.ts` - Public exports

**Key Features**:
- Browse and select database tables
- View table data with pagination
- Search within table data
- Error handling and retry mechanisms
- Loading states and skeleton components
- Responsive admin interface

**Usage**:
```tsx
import { DatabaseAdmin } from '@features/admin';

// Display admin interface
<DatabaseAdmin />
```

## Design Principles

### Feature-Based Architecture
Each feature is self-contained with its own:
- **Components**: UI elements specific to the feature
- **Hooks**: Custom React hooks for state management and data fetching
- **Services**: API calls and external service integrations (where applicable)
- **Types**: TypeScript type definitions (where applicable)
- **Index files**: Clean public API exports

### Separation of Concerns
- Features are independent and can be developed/maintained separately
- Clear boundaries between different application domains
- Minimal coupling between features
- Shared utilities and components in separate directories

### Reusability
- Components are designed to be reusable across the application
- Hooks provide clean abstractions for common functionality
- Services can be easily mocked for testing

### Type Safety
- Comprehensive TypeScript types for all features
- Type-safe API responses and component props
- Proper error handling with typed error states

## Best Practices

1. **Import Organization**: Use feature-based imports from the main index files
2. **State Management**: Use React Query for server state and local state for UI
3. **Error Handling**: Implement proper error boundaries and error states
4. **Loading States**: Provide skeleton loaders and loading indicators
5. **Responsive Design**: Ensure all components work across different screen sizes
6. **Accessibility**: Follow WCAG guidelines for inclusive design

## Adding New Features

To add a new feature:

1. Create a new directory in `src/features/`
2. Follow the established structure (components, hooks, services, types)
3. Create an `index.ts` file with public exports
4. Update this README with feature documentation
5. Ensure proper TypeScript types and error handling

## Dependencies

Features may depend on:
- `@/components/ui/` - Shared UI components
- `@/hooks/` - Shared utility hooks
- `@/lib/` - Utility functions and configurations
- `@/types/` - Global type definitions
