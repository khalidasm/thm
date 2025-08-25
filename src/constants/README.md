# Constants Directory

The `@constants/` directory contains application-wide configuration constants, API settings, and reusable values that are used throughout the application. This centralized approach ensures consistency and makes it easy to maintain and update application settings.

## Directory Structure

```
src/constants/
└── index.ts          # All application constants and configurations
```

## Configuration Objects

### 🏗️ Application Configuration

**`APP_CONFIG`** - Core application settings
```typescript
export const APP_CONFIG: AppConfig = {
  country: 'SA',  // Default country code for iTunes API
};
```

**Usage**: Used for application-wide settings like default country codes and regional preferences.

### 🎵 iTunes API Configuration

**`ITUNES_API_CONFIG`** - iTunes API connection settings
```typescript
export const ITUNES_API_CONFIG = {
  baseUrl: 'https://itunes.apple.com',
  searchEndpoint: '/search',
  lookupEndpoint: '/lookup',
  timeout: 10000,
  userAgent: 'Mozilla/5.0 (compatible; PodcastBot/1.0)',
};
```

**Properties**:
- `baseUrl` - iTunes API base URL
- `searchEndpoint` - Search API endpoint
- `lookupEndpoint` - Lookup API endpoint  
- `timeout` - Request timeout in milliseconds
- `userAgent` - Custom user agent for API requests

**Usage**: Used in API service functions for making requests to iTunes podcast API.

### 🔍 Search Configuration

**`SEARCH_CONFIG`** - Search functionality settings
```typescript
export const SEARCH_CONFIG = {
  fallbackTerms: ['podcast', 'news', 'technology', 'business', 'entertainment'],
  maxRetries: 3,
  retryDelay: 1000,
};
```

**Properties**:
- `fallbackTerms` - Default search terms when no results are found
- `maxRetries` - Maximum number of retry attempts for failed requests
- `retryDelay` - Delay between retry attempts in milliseconds

**Usage**: Used in search functionality to provide fallback content and handle retry logic.

### ❌ Error Messages

**`ERROR_MESSAGES`** - Standardized error messages
```typescript
export const ERROR_MESSAGES = {
  DATABASE_ERROR: 'Database operation failed',
  VALIDATION_ERROR: 'Invalid input data',
  NOT_FOUND: 'Resource not found',
} as const;
```

**Usage**: Provides consistent error messaging across the application for better user experience and debugging.

### ✅ Success Messages

**`SUCCESS_MESSAGES`** - Standardized success messages
```typescript
export const SUCCESS_MESSAGES = {
  PODCASTS_LOADED: 'Podcasts loaded successfully',
  EPISODES_LOADED: 'Episodes loaded successfully',
} as const;
```

**Usage**: Provides consistent success messaging for user feedback and logging.

### 🌐 HTTP Status Codes

**`HTTP_STATUS`** - Common HTTP status codes
```typescript
export const HTTP_STATUS = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
} as const;
```

**Usage**: Used for API response handling and error checking.

### 🎨 Author Colors

**`AUTHOR_COLORS`** - Text color classes for author styling
```typescript
export const AUTHOR_COLORS = [
  "text-author-1",
  "text-author-2", 
  "text-author-3",
  "text-author-4",
  "text-author-5",
];
```

**Usage**: Applied to podcast/episode author names for visual distinction and branding.

### 🎨 Author Background Colors

**`AUTHOR_BACKGROUND_COLORS`** - Background color classes for author styling
```typescript
export const AUTHOR_BACKGROUND_COLORS = [
  "bg-author-1/10",
  "bg-author-2/10",
  "bg-author-3/10",
  "bg-author-4/10",
  "bg-author-5/10",
];
```

**Usage**: Applied to author-related UI elements for consistent visual theming.

## Usage Examples

### Importing Constants
```typescript
import { 
  APP_CONFIG, 
  ITUNES_API_CONFIG, 
  SEARCH_CONFIG,
  ERROR_MESSAGES,
  AUTHOR_COLORS 
} from '@/constants';
```

### Using in API Calls
```typescript
const response = await fetch(
  `${ITUNES_API_CONFIG.baseUrl}${ITUNES_API_CONFIG.searchEndpoint}?term=${searchTerm}`,
  {
    headers: {
      'User-Agent': ITUNES_API_CONFIG.userAgent,
    },
    signal: AbortSignal.timeout(ITUNES_API_CONFIG.timeout),
  }
);
```

### Using in Components
```typescript
const authorColor = AUTHOR_COLORS[index % AUTHOR_COLORS.length];

return (
  <span className={authorColor}>
    {podcast.artistName}
  </span>
);
```

### Using in Error Handling
```typescript
if (!response.ok) {
  throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
}
```

## Design Principles

### Centralization
- All application constants are defined in one location
- Easy to find, update, and maintain
- Prevents duplication across the codebase

### Type Safety
- Constants are typed with TypeScript
- `as const` assertions ensure literal types
- Prevents accidental modifications

### Consistency
- Standardized naming conventions
- Consistent error and success messages
- Uniform API configuration

### Maintainability
- Clear separation of concerns
- Easy to update values without touching multiple files
- Version control friendly

## Best Practices

1. **Naming**: Use descriptive, UPPER_SNAKE_CASE for constant names
2. **Grouping**: Group related constants in logical objects
3. **Documentation**: Add JSDoc comments for complex configurations
4. **Immutability**: Use `as const` to prevent accidental modifications
5. **Importing**: Import only what you need to keep bundles small

## Adding New Constants

To add new constants:

1. **Choose the appropriate category** or create a new one
2. **Use descriptive names** that clearly indicate the purpose
3. **Add TypeScript types** where applicable
4. **Use `as const`** for literal type assertions
5. **Update this README** with documentation
6. **Consider the impact** on existing code

## Dependencies

Constants may depend on:
- `@/types` - TypeScript type definitions for configuration objects
- Application-specific requirements and business logic
