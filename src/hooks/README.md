# Hooks Directory

The `@hooks/` directory contains custom React hooks that provide reusable logic and state management functionality throughout the application. These hooks encapsulate common patterns and provide a clean API for components to use.

## Directory Structure

```
src/hooks/
├── useDebounce.ts        # Debounce hook for input values
└── index.ts             # Main exports
```

## Available Hooks

### ⏱️ useDebounce

**Purpose**: Debounces a value to prevent excessive API calls or expensive operations.

**Signature**:
```typescript
function useDebounce<T>(value: T, delay: number): T
```

**Parameters**:
- `value` - The value to debounce (any type)
- `delay` - Delay in milliseconds before updating the debounced value

**Returns**: The debounced value of the same type as the input

**Usage**:
```tsx
import { useDebounce } from '@/hooks';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Use debouncedSearchTerm for API calls
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**Use Cases**:
- Search input debouncing
- Form validation delays
- API call optimization
- Expensive computation delays

## Design Principles

### Reusability
- Hooks are designed to be reusable across components
- Generic types for maximum flexibility
- Clean, simple APIs

### Performance
- Optimized with proper dependency management
- Minimal re-renders through efficient state updates
- Memory cleanup for timers and subscriptions

### Type Safety
- Full TypeScript support
- Proper type inference
- Generic types for flexibility

### Composability
- Hooks can be combined and composed
- No tight coupling between hooks
- Independent functionality

## Best Practices

### Hook Usage

1. **Follow React Rules**: Only call hooks at the top level
2. **Use Dependencies**: Properly specify useEffect dependencies
3. **Cleanup**: Always clean up timers and subscriptions
4. **Naming**: Use descriptive names for hook functions

### Performance Optimization

1. **Debounce Wisely**: Use appropriate delay times for your use case
2. **Minimize Re-renders**: Use useCallback for functions passed to children
3. **Batch Updates**: Group related state updates together
4. **Memory Management**: Clean up resources in useEffect cleanup

### Error Handling

1. **Try-Catch**: Wrap async operations in try-catch blocks
2. **User Feedback**: Provide clear feedback for operations
3. **Fallbacks**: Handle edge cases and errors gracefully
4. **Validation**: Validate inputs before processing

## Adding New Hooks

To add a new hook:

1. **Create the hook file** in the hooks directory
2. **Follow naming convention**: Use `use` prefix and descriptive name
3. **Add TypeScript types**: Include proper interfaces and types
4. **Export from index**: Add to the main index.ts file
5. **Document usage**: Add JSDoc comments and examples
6. **Update this README**: Document the new hook

### Hook Template

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseYourHookOptions {
  // Define options interface
}

interface UseYourHookReturn {
  // Define return interface
}

export function useYourHook(options: UseYourHookOptions = {}): UseYourHookReturn {
  // Hook implementation
  
  return {
    // Return values
  };
}
```

## Dependencies

Hooks depend on:
- `react` - React hooks and types
- `@/types` - Application-specific types (if needed)
- `@/utils` - Utility functions (if needed)

## Common Patterns

### Debounced Search
```tsx
const [searchTerm, setSearchTerm] = useState('');
const debouncedTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedTerm) {
    performSearch(debouncedTerm);
  }
}, [debouncedTerm]);
```

### Form Input Debouncing
```tsx
const [inputValue, setInputValue] = useState('');
const debouncedValue = useDebounce(inputValue, 300);

useEffect(() => {
  // Validate or process the debounced value
  validateInput(debouncedValue);
}, [debouncedValue]);
```

### API Call Optimization
```tsx
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 1000);

useEffect(() => {
  if (debouncedQuery.trim()) {
    fetchData(debouncedQuery);
  }
}, [debouncedQuery]);
```
