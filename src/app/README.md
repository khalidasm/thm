# App Directory

The `@app/` directory contains the Next.js App Router application structure, organized into route groups for different application sections. This directory serves as the entry point and routing layer for the entire application.

## Directory Structure

```
src/app/
├── (main)/                    # Main application route group
│   ├── api/                   # Main API routes
│   │   └── podcasts/
│   │       └── search/
│   │           └── route.ts   # Podcast search API endpoint
│   ├── layout.tsx             # Main layout with search context
│   └── page.tsx               # Home page with search interface
├── (admin)/                   # Admin route group
│   ├── api/                   # Admin API routes
│   │   └── admin/
│   │       └── database/
│   │           ├── tables/
│   │           │   └── route.ts           # Database tables API
│   │           └── table/
│   │               └── [tableName]/
│   │                   └── route.ts       # Table data API
│   ├── admin/                 # Admin pages
│   │   └── database/
│   │       └── page.tsx       # Database admin page
│   └── layout.tsx             # Admin layout
├── layout.tsx                 # Root layout with providers
├── globals.css                # Global styles
└── favicon.ico                # Application favicon
```

## Route Groups

### 🏠 Main Application (`(main)/`)

**Purpose**: Main user-facing application with podcast search functionality.

**Key Features**:
- **Search Interface**: Primary podcast search functionality
- **Search Context**: Global search state management
- **Error Boundaries**: Comprehensive error handling
- **Loading States**: Suspense-based loading management

#### Layout (`layout.tsx`)
```tsx
// Main layout with search context and error boundaries
<ErrorBoundary>
  <Suspense fallback={<MainLayoutLoading />}>
    <SearchProvider>
      <SearchLayout>
        {children}
      </SearchLayout>
    </SearchProvider>
  </Suspense>
</ErrorBoundary>
```

**Features**:
- **SearchProvider**: Global search state management
- **ErrorBoundary**: Error handling for the entire main app
- **Suspense**: Loading states with fallback components
- **SearchLayout**: Consistent search interface wrapper

#### Home Page (`page.tsx`)
```tsx
// Home page with search client
<SearchClient />
```

**Features**:
- **SearchClient**: Main search interface component
- **Responsive Design**: Mobile-first responsive layout
- **Search Integration**: Direct integration with search features

#### API Routes (`api/podcasts/search/route.ts`)

**Endpoint**: `GET /api/podcasts/search`

**Purpose**: Podcast search API with iTunes integration and database persistence.

**Query Parameters**:
- `term` - Search term (optional, defaults to trending content)
- `country` - Country code (optional, defaults to SA)
- `raw` - Return raw iTunes data (optional, boolean)

**Features**:
- **iTunes Integration**: Search iTunes Podcast API
- **Database Persistence**: Save search results to Supabase
- **Trending Content**: Fallback to trending podcasts
- **Error Handling**: Comprehensive error management
- **Data Transformation**: Convert iTunes data to application format

**Response Format**:
```typescript
{
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

### ⚙️ Admin Application (`(admin)/`)

**Purpose**: Database administration interface for managing Supabase data.

**Key Features**:
- **Database Management**: Browse and manage database tables
- **Data Visualization**: View and interact with table data
- **Admin Interface**: Secure admin-only access
- **Error Handling**: Admin-specific error management

#### Layout (`layout.tsx`)
```tsx
// Admin layout with error boundaries
<ErrorBoundary>
  <Suspense fallback={<AdminLayoutLoading />}>
    {children}
  </Suspense>
</ErrorBoundary>
```

**Features**:
- **ErrorBoundary**: Admin-specific error handling
- **Suspense**: Loading states for admin operations
- **Inter Font**: Admin-specific typography
- **Background Styling**: Admin-specific visual design

#### Database Admin Page (`admin/database/page.tsx`)
```tsx
// Database admin interface
<DatabaseAdmin />
```

**Features**:
- **DatabaseAdmin**: Complete database management interface
- **Table Browsing**: Browse available database tables
- **Data Viewing**: View and interact with table data
- **Pagination**: Handle large datasets efficiently

#### API Routes

**Database Tables API** (`api/admin/database/tables/route.ts`)
- **Endpoint**: `GET /api/admin/database/tables`
- **Purpose**: Get list of available database tables
- **Response**: Array of table names

**Table Data API** (`api/admin/database/table/[tableName]/route.ts`)
- **Endpoint**: `GET /api/admin/database/table/[tableName]`
- **Purpose**: Get data from specific database table
- **Parameters**: `tableName` - Name of the table to query
- **Features**: Pagination, filtering, and data retrieval

## Root Layout (`layout.tsx`)

**Purpose**: Root application layout with global providers and configuration.

**Features**:
- **Font Configuration**: Geist Sans and Geist Mono fonts
- **QueryProvider**: React Query client provider
- **Global Styles**: Tailwind CSS and custom styles
- **Metadata**: Application metadata and SEO

```tsx
// Root layout with providers and fonts
<html lang="en">
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <QueryProvider>
      {children}
    </QueryProvider>
  </body>
</html>
```

## Global Styles (`globals.css`)

**Purpose**: Global CSS styles and Tailwind CSS configuration.

**Features**:
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Variables**: CSS custom properties for theming
- **Font Configuration**: Font family and variable setup
- **Base Styles**: Reset and base element styling
- **Component Styles**: Custom component styling
- **Dark Mode**: Dark mode support and styling

## Design Principles

### Route Organization
- **Route Groups**: Logical separation of main and admin applications
- **API Routes**: RESTful API endpoints for data operations
- **Layout Hierarchy**: Nested layouts for consistent UI
- **Error Boundaries**: Comprehensive error handling at each level

### Performance
- **Suspense**: Streaming and loading states
- **Error Boundaries**: Graceful error handling
- **Code Splitting**: Automatic route-based code splitting
- **Font Optimization**: Optimized font loading

### Security
- **Route Protection**: Admin routes for authorized access
- **API Validation**: Input validation and sanitization
- **Error Handling**: Secure error responses
- **Environment Variables**: Secure configuration management

### User Experience
- **Loading States**: Smooth loading transitions
- **Error Recovery**: Graceful error recovery
- **Responsive Design**: Mobile-first responsive layout
- **Accessibility**: ARIA support and keyboard navigation

## Best Practices

### Route Organization

1. **Use Route Groups**: Organize routes logically with parentheses
2. **Consistent Naming**: Use descriptive and consistent route names
3. **API Structure**: Follow RESTful API conventions
4. **Layout Hierarchy**: Create appropriate layout nesting

### API Development

1. **Error Handling**: Implement comprehensive error handling
2. **Input Validation**: Validate and sanitize all inputs
3. **Response Format**: Use consistent response formats
4. **Performance**: Optimize API responses and caching

### Layout Management

1. **Provider Placement**: Place providers at appropriate levels
2. **Error Boundaries**: Implement error boundaries strategically
3. **Loading States**: Provide meaningful loading feedback
4. **Metadata**: Set appropriate metadata for SEO

### Styling

1. **Global Styles**: Use global styles for consistent theming
2. **Component Styles**: Keep component styles modular
3. **Responsive Design**: Implement mobile-first responsive design
4. **Accessibility**: Ensure proper contrast and navigation

## Adding New Routes

To add new routes:

1. **Choose Route Group**: Add to appropriate route group (main/admin)
2. **Create Directory Structure**: Follow Next.js App Router conventions
3. **Add Layout**: Create layout if needed for the route
4. **Add Page**: Create page component for the route
5. **Add API Routes**: Create API routes if needed
6. **Update Navigation**: Update navigation and routing logic

### Route Template

```tsx
// page.tsx
export default function YourPage() {
  return (
    <div>
      {/* Your page content */}
    </div>
  );
}

// layout.tsx (if needed)
export default function YourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Your layout content */}
      {children}
    </div>
  );
}

// route.ts (for API routes)
export async function GET(request: NextRequest) {
  // Your API logic
  return NextResponse.json({ data: 'response' });
}
```

## Dependencies

App directory depends on:
- `@/components` - UI components and layouts
- `@/features` - Feature-specific components and logic
- `@/lib` - Core libraries and services
- `@/types` - TypeScript type definitions
- `@/utils` - Utility functions
- `@/constants` - Application constants
- `next` - Next.js framework
- `react` - React library
- `tailwindcss` - Styling framework
