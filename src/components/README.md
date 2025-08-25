# Components Directory

The `@components/` directory contains reusable React components organized into logical categories. This directory serves as the component library for the application, providing UI elements, layout components, and providers that can be used throughout the codebase.

## Directory Structure

```
src/components/
├── ui/              # Base UI components (shadcn/ui)
├── layout/          # Layout and loading components
├── providers/       # React context providers
└── index.ts         # Main exports
```

## Component Categories

### 🎨 UI Components (`@components/ui/`)

**Purpose**: Base UI components built with shadcn/ui and Radix UI primitives.

**Components**:
- `button.tsx` - Versatile button component with multiple variants
- `card.tsx` - Card container component for content grouping
- `dropdown-menu.tsx` - Dropdown menu with various trigger options
- `input.tsx` - Form input component with validation states
- `table.tsx` - Data table component with sorting and pagination
- `badge.tsx` - Badge component for labels and status indicators
- `separator.tsx` - Visual separator component
- `pagination.tsx` - Pagination controls for data navigation
- `select.tsx` - Select dropdown component
- `skeleton.tsx` - Loading skeleton component
- `custom-scrollbar.tsx` - Custom scrollbar styling component

**Key Features**:
- Built on shadcn/ui design system
- Fully accessible with ARIA support
- TypeScript support with proper typing
- Customizable variants and sizes
- Consistent design language

**Usage**:
```tsx
import { Button, Card, Input, Badge } from '@/components/ui';

// Use components with variants
<Button variant="primary" size="lg">
  Click me
</Button>

<Card className="p-6">
  <Input placeholder="Enter text..." />
  <Badge variant="secondary">Status</Badge>
</Card>
```

### 🏗️ Layout Components (`@components/layout/`)

**Purpose**: Layout-specific components for page structure, loading states, and error handling.

**Components**:
- `LoadingWrapper.tsx` - Flexible loading state wrapper with multiple variants
- `LoadingSpinner.tsx` - Loading spinner with different styles
- `ErrorBoundary.tsx` - React error boundary for error handling
- `ContentSections.tsx` - Content section layout component
- `QueryLoadingState.tsx` - Loading state for React Query operations
- `QueryProvider.tsx` - React Query provider setup
- `SkeletonLoaders.tsx` - Various skeleton loading components

**Key Features**:
- Multiple loading state variants (spinner, skeleton, fullscreen)
- Error boundary with fallback UI
- Animated transitions with Framer Motion
- Configurable loading delays and durations
- Responsive design patterns

**Usage**:
```tsx
import { 
  LoadingWrapper, 
  ErrorBoundary, 
  ContentSections,
  TableSkeleton 
} from '@/components/layout';

// Wrap content with loading states
<LoadingWrapper 
  isLoading={isLoading} 
  variant="skeleton"
  skeletonComponent={TableSkeleton}
>
  <ContentSections>
    {/* Your content */}
  </ContentSections>
</LoadingWrapper>

// Error boundary for error handling
<ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</ErrorBoundary>
```

### 🔧 Providers (`@components/providers/`)

**Purpose**: React context providers for application-wide state and functionality.

**Components**:
- `QueryProvider.tsx` - React Query client provider with configuration

**Key Features**:
- Centralized state management
- Optimized query caching
- Global configuration settings
- Performance optimizations

**Usage**:
```tsx
import { QueryProvider } from '@/components/providers';

// Wrap your app with providers
<QueryProvider>
  <YourApp />
</QueryProvider>
```

## Design System

### Component Variants

Most UI components support multiple variants for flexibility:

**Button Variants**:
- `default` - Primary button style
- `destructive` - Error/danger actions
- `outline` - Secondary actions
- `secondary` - Alternative primary style
- `ghost` - Subtle interactions
- `link` - Link-style buttons

**Sizes**:
- `sm` - Small size
- `default` - Standard size
- `lg` - Large size
- `icon` - Icon-only buttons

### Loading States

**LoadingWrapper Variants**:
- `spinner` - Simple loading spinner
- `skeleton` - Skeleton loading animation
- `fullscreen` - Full-screen loading overlay
- `inline` - Inline loading indicator

### Animation

Components use Framer Motion for smooth animations:
- Fade in/out transitions
- Loading state animations
- Error state transitions
- Content loading sequences

## Best Practices

### Component Usage

1. **Import from index files**: Use the main export files for clean imports
2. **Use proper variants**: Leverage the built-in variants for consistency
3. **Accessibility**: All components include proper ARIA attributes
4. **TypeScript**: Use proper typing for component props
5. **Responsive design**: Components are mobile-first and responsive

### Performance

1. **Lazy loading**: Use dynamic imports for large components
2. **Memoization**: Use React.memo for expensive components
3. **Bundle optimization**: Import only what you need
4. **Query caching**: Leverage React Query for data caching

### Styling

1. **Tailwind CSS**: Use utility classes for styling
2. **CSS Variables**: Use design system tokens
3. **Dark mode**: Components support dark/light themes
4. **Customization**: Extend components with className prop

## Adding New Components

To add a new component:

1. **Choose the right category**:
   - `ui/` for base UI components
   - `layout/` for layout and loading components
   - `providers/` for context providers

2. **Follow naming conventions**:
   - Use PascalCase for component names
   - Use kebab-case for file names
   - Export from index files

3. **Include proper types**:
   - TypeScript interfaces for props
   - Proper component typing
   - JSDoc comments for complex components

4. **Add to exports**:
   - Update the appropriate index.ts file
   - Add to main components index if needed

5. **Documentation**:
   - Add usage examples
   - Document variants and props
   - Update this README

## Dependencies

Components depend on:
- `@/lib/utils` - Utility functions (cn, etc.)
- `@/types` - TypeScript type definitions
- `@radix-ui/react-*` - Radix UI primitives
- `framer-motion` - Animation library
- `@tanstack/react-query` - Data fetching
- `tailwindcss` - Styling framework
- `class-variance-authority` - Component variants
