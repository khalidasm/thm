# Utils Directory

The `@utils/` directory contains utility classes and functions that provide common functionality used throughout the application. These utilities handle error management, validation, formatting, HTTP operations, and API response building.

## Directory Structure

```
src/utils/
├── index.ts                    # Main utility classes and exports
└── api-response-builder.ts     # API response building utilities
```

## Utility Classes

### ❌ AppErrorHandler

**Purpose**: Centralized error handling and error object creation.

**Key Features**:
- **Standardized Error Creation**: Consistent error object structure
- **Error Type Handling**: Different handlers for API, database, and validation errors
- **Error Context**: Include timestamps and additional details
- **Error Transformation**: Convert various error types to AppError format

**Available Methods**:

#### `createError(code, message, details?)`
Creates a standardized AppError object.

```typescript
static createError(code: string, message: string, details?: unknown): AppError
```

**Usage**:
```typescript
import { AppErrorHandler } from '@/utils';

const error = AppErrorHandler.createError(
  'VALIDATION_ERROR',
  'Invalid search term',
  { term: 'invalid-term' }
);
```

#### `handleApiError(error)`
Handles API-related errors and converts them to AppError format.

```typescript
static handleApiError(error: unknown): AppError
```

**Usage**:
```typescript
try {
  await apiCall();
} catch (error) {
  const appError = AppErrorHandler.handleApiError(error);
  // Handle the standardized error
}
```

#### `handleDatabaseError(error)`
Handles database-related errors with standardized messaging.

```typescript
static handleDatabaseError(error: unknown): AppError
```

**Usage**:
```typescript
try {
  await databaseOperation();
} catch (error) {
  const appError = AppErrorHandler.handleDatabaseError(error);
  // Handle database error
}
```

#### `handleValidationError(message, details?)`
Creates validation-specific error objects.

```typescript
static handleValidationError(message: string, details?: unknown): AppError
```

**Usage**:
```typescript
if (!isValidInput(input)) {
  const error = AppErrorHandler.handleValidationError(
    'Invalid input format',
    { input, expectedFormat: 'string' }
  );
}
```

### ✅ ValidationUtils

**Purpose**: Input validation and sanitization utilities.

**Key Features**:
- **Search Term Validation**: Validate search input requirements
- **Input Sanitization**: Clean and normalize input data
- **Length Validation**: Ensure input meets length requirements
- **Format Validation**: Validate input formats

**Available Methods**:

#### `isValidSearchTerm(term)`
Validates search term requirements.

```typescript
static isValidSearchTerm(term: string): boolean
```

**Validation Rules**:
- Term must not be empty after trimming
- Term length must be ≤ 100 characters

**Usage**:
```typescript
import { ValidationUtils } from '@/utils';

const isValid = ValidationUtils.isValidSearchTerm('react podcast');
// Returns true if valid, false otherwise
```

#### `sanitizeSearchTerm(term)`
Sanitizes search terms for consistent processing.

```typescript
static sanitizeSearchTerm(term: string): string
```

**Sanitization**:
- Trims whitespace
- Converts to lowercase

**Usage**:
```typescript
const sanitized = ValidationUtils.sanitizeSearchTerm('  React Podcast  ');
// Returns: "react podcast"
```

### 🎨 FormatUtils

**Purpose**: Data formatting utilities for display purposes.

**Key Features**:
- **Duration Formatting**: Convert seconds to human-readable format
- **Time Ago Formatting**: Convert dates to relative time strings
- **Consistent Formatting**: Standardized display formats
- **Fallback Handling**: Handle missing or invalid data

**Available Methods**:

#### `formatDuration(seconds?)`
Formats duration in seconds to human-readable format.

```typescript
static formatDuration(seconds?: number): string
```

**Format Examples**:
- `3600` → `"1h 0m"`
- `3661` → `"1h 1m"`
- `180` → `"3m"`
- `undefined` → `"Unknown"`

**Usage**:
```typescript
import { FormatUtils } from '@/utils';

const duration = FormatUtils.formatDuration(3661);
// Returns: "1h 1m"

const unknownDuration = FormatUtils.formatDuration();
// Returns: "Unknown"
```

#### `formatTimeAgo(date)`
Formats dates to relative time strings.

```typescript
static formatTimeAgo(date: Date | string): string
```

**Format Examples**:
- Just now → `"Just now"`
- 30 seconds ago → `"Just now"`
- 5 minutes ago → `"5m ago"`
- 2 hours ago → `"2h ago"`
- 3 days ago → `"3d ago"`

**Usage**:
```typescript
const timeAgo = FormatUtils.formatTimeAgo(new Date('2024-01-01'));
// Returns relative time string

const timeAgoString = FormatUtils.formatTimeAgo('2024-01-01T10:00:00Z');
// Also works with date strings
```

### 🌐 HttpUtils

**Purpose**: HTTP operation utilities with retry logic.

**Key Features**:
- **Retry Logic**: Automatic retry for failed operations
- **Exponential Backoff**: Increasing delay between retries
- **Configurable Retries**: Customizable retry attempts and delays
- **Error Handling**: Proper error propagation

**Available Methods**:

#### `retryOperation(operation, maxRetries?, delay?)`
Executes an operation with automatic retry logic.

```typescript
static async retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T>
```

**Parameters**:
- `operation` - Async function to retry
- `maxRetries` - Maximum retry attempts (default: 3)
- `delay` - Base delay in milliseconds (default: 1000)

**Retry Behavior**:
- Exponential backoff: delay * attempt number
- Throws last error if all retries fail
- No delay after last attempt

**Usage**:
```typescript
import { HttpUtils } from '@/utils';

const result = await HttpUtils.retryOperation(
  async () => {
    return await fetch('/api/data');
  },
  3,  // max retries
  1000 // base delay
);
```

## API Response Builder

### 📡 ApiResponseBuilder

**Purpose**: Standardized API response creation for search operations.

**Key Features**:
- **Consistent Response Format**: Standardized response structure
- **Search Response Creation**: Build search result responses
- **Error Response Creation**: Build error responses
- **Message Generation**: Automatic message generation based on context

**Available Methods**:

#### `createSearchResponse(podcasts, searchTerm, country, options?)`
Creates a standardized search response.

```typescript
static createSearchResponse(
  podcasts: Podcast[],
  searchTerm: string,
  country: string,
  options?: {
    resultCount?: number;
    savedCount?: number;
    searchHistoryId?: string;
    timestamp?: string;
    topEpisodes?: Episode[];
  }
): SearchApiResponse
```

**Usage**:
```typescript
import { ApiResponseBuilder } from '@/utils';

const response = ApiResponseBuilder.createSearchResponse(
  podcasts,
  'react',
  'SA',
  {
    resultCount: 25,
    savedCount: 20,
    searchHistoryId: 'uuid',
    topEpisodes: episodes
  }
);
```

#### `createErrorResponse(message, searchTerm, country)`
Creates a standardized error response.

```typescript
static createErrorResponse(
  message: string,
  searchTerm: string,
  country: string
): SearchApiResponse
```

**Usage**:
```typescript
const errorResponse = ApiResponseBuilder.createErrorResponse(
  'Search failed',
  'react',
  'SA'
);
```

## Design Principles

### Error Handling
- **Centralized Management**: All errors go through AppErrorHandler
- **Consistent Structure**: Standardized error object format
- **Context Preservation**: Maintain error context and details
- **Type Safety**: Proper TypeScript typing for all errors

### Validation
- **Input Sanitization**: Clean and normalize user inputs
- **Length Validation**: Prevent oversized inputs
- **Format Validation**: Ensure proper data formats
- **Graceful Degradation**: Handle invalid inputs gracefully

### Formatting
- **User-Friendly**: Human-readable output formats
- **Consistent**: Standardized formatting across the application
- **Fallback Handling**: Graceful handling of missing data
- **Localization Ready**: Easy to extend for different locales

### HTTP Operations
- **Reliability**: Retry logic for transient failures
- **Performance**: Exponential backoff to avoid overwhelming servers
- **Configurability**: Customizable retry parameters
- **Error Propagation**: Proper error handling and propagation

## Best Practices

### Error Handling

1. **Use AppErrorHandler**: Always use AppErrorHandler for error creation
2. **Include Context**: Provide relevant error details and context
3. **Handle All Error Types**: Use appropriate error handlers for different scenarios
4. **Log Errors**: Log errors for debugging and monitoring

### Validation

1. **Validate Early**: Validate inputs as early as possible
2. **Sanitize Inputs**: Always sanitize user inputs
3. **Length Limits**: Enforce reasonable length limits
4. **Format Validation**: Validate data formats before processing

### Formatting

1. **Consistent Formats**: Use consistent formatting across the application
2. **Handle Edge Cases**: Handle undefined, null, and invalid values
3. **User-Friendly**: Make output human-readable
4. **Performance**: Optimize formatting for performance

### HTTP Operations

1. **Use Retry Logic**: Use retry logic for network operations
2. **Configure Appropriately**: Set appropriate retry limits and delays
3. **Handle Errors**: Properly handle and propagate errors
4. **Monitor Performance**: Monitor retry patterns and performance

## Usage Examples

### Complete Error Handling Flow
```typescript
import { AppErrorHandler, ValidationUtils } from '@/utils';

async function searchPodcasts(term: string) {
  // Validate input
  if (!ValidationUtils.isValidSearchTerm(term)) {
    throw AppErrorHandler.handleValidationError('Invalid search term');
  }

  try {
    const sanitizedTerm = ValidationUtils.sanitizeSearchTerm(term);
    const result = await apiCall(sanitizedTerm);
    return result;
  } catch (error) {
    throw AppErrorHandler.handleApiError(error);
  }
}
```

### Formatting Data for Display
```typescript
import { FormatUtils } from '@/utils';

function PodcastCard({ podcast }) {
  return (
    <div>
      <h3>{podcast.title}</h3>
      <p>Duration: {FormatUtils.formatDuration(podcast.duration)}</p>
      <p>Published: {FormatUtils.formatTimeAgo(podcast.publishedAt)}</p>
    </div>
  );
}
```

### HTTP Retry with Custom Configuration
```typescript
import { HttpUtils } from '@/utils';

async function fetchWithRetry() {
  return await HttpUtils.retryOperation(
    async () => {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    },
    5,  // 5 retries
    2000 // 2 second base delay
  );
}
```

### API Response Building
```typescript
import { ApiResponseBuilder } from '@/utils';

async function handleSearch(searchTerm: string) {
  try {
    const podcasts = await searchPodcasts(searchTerm);
    
    return ApiResponseBuilder.createSearchResponse(
      podcasts,
      searchTerm,
      'SA',
      {
        resultCount: podcasts.length,
        savedCount: podcasts.filter(p => p.saved).length
      }
    );
  } catch (error) {
    return ApiResponseBuilder.createErrorResponse(
      'Search failed',
      searchTerm,
      'SA'
    );
  }
}
```

## Adding New Utilities

To add new utilities:

1. **Create the utility class** in the appropriate file
2. **Follow naming conventions**: Use descriptive class and method names
3. **Add TypeScript types**: Include proper interfaces and types
4. **Export from index**: Add to main exports
5. **Document usage**: Add JSDoc comments and examples
6. **Update this README**: Document the new utilities

### Utility Template

```typescript
export class YourUtils {
  /**
   * Description of the utility method
   * @param param Description of parameter
   * @returns Description of return value
   */
  static yourMethod(param: string): string {
    // Implementation
    return result;
  }
}
```

## Dependencies

Utilities depend on:
- `@/types` - TypeScript type definitions
- `@/constants` - Application constants and messages
- Application-specific business logic and requirements
