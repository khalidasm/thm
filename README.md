# Thmanyah - Frontend Assessment

A modern, full-stack frontend assessment built with Next.js, featuring iTunes API integration, Supabase database, and a comprehensive admin interface.

## 🏗️ Architecture Overview

### Frontend Stack
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Framer Motion** - Smooth animations
- **React Query** - Data fetching and caching

### Backend & Services
- **Supabase** - PostgreSQL database with real-time features
- **iTunes API** - Podcast data and search functionality
- **Next.js API Routes** - Serverless API endpoints
- **Axios** - HTTP client for external API calls

### Development Tools
- **ESLint** - Code linting and quality
- **Husky** - Git hooks for code quality
- **TypeScript** - Static type checking
- **Turbopack** - Fast development builds

## 📁 Project Structure

```
thmanyah/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (main)/            # Main application routes
│   │   ├── (admin)/           # Admin interface routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Layout components
│   │   └── providers/        # React providers
│   ├── features/             # Feature-based modules
│   │   ├── search/           # Search functionality
│   │   ├── podcast/          # Podcast display
│   │   ├── episode/          # Episode management
│   │   └── admin/            # Admin interface
│   ├── lib/                  # Core libraries and services
│   │   ├── contexts/         # React contexts
│   │   ├── itunes-api.ts     # iTunes API service
│   │   ├── supabase.ts       # Supabase client
│   │   └── utils.ts          # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility classes and functions
│   └── constants/            # Application constants
├── public/                   # Static assets
├── supabase-migration.sql    # Database schema
└── Configuration files       # Various config files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd thmanyah
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   ```bash
   # Run the Supabase migration
   # Copy the contents of supabase-migration.sql to your Supabase SQL editor
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Features

### Main Application
- **Search Interface**: Clean, intuitive search with real-time results
- **Podcast Discovery**: Browse trending and popular podcasts
- **Episode Management**: View and manage podcast episodes
- **Search History**: Track and review past searches
- **Responsive Design**: Works seamlessly on all devices

### Admin Interface
- **Database Management**: Browse and manage all database tables
- **Data Visualization**: View and interact with table data
- **Search Analytics**: Monitor search patterns and usage
- **Content Management**: Manage podcasts and episodes

### Technical Features
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Comprehensive error management
- **Loading States**: Smooth loading and transition states
- **Caching**: Intelligent data caching with React Query
- **Performance**: Optimized for speed and efficiency

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
# Use Supabase dashboard for database operations
```

### Code Organization

#### Feature-Based Architecture
- Each feature is self-contained with components, hooks, and services
- Clear separation of concerns
- Reusable and maintainable code structure

#### Component Library
- Built on shadcn/ui for consistency
- Custom components for specific use cases
- Responsive and accessible design

#### API Integration
- iTunes API for podcast data
- Supabase for data persistence
- RESTful API design patterns

## 🗄️ Database Schema

### Tables

#### `search_history`
- Tracks user search queries
- Stores result counts and timestamps
- Links to saved podcasts

#### `podcasts`
- Comprehensive podcast metadata
- iTunes API data integration
- Search history relationships

#### `episodes`
- Episode information and metadata
- Podcast relationships
- Enclosure and media data

### Security
- Row Level Security (RLS) enabled
- Public read access for content
- Authenticated write access for data management

## 🌐 API Endpoints

### Main Application
- `GET /api/podcasts/search` - Search podcasts and episodes
- Query parameters: `term`, `country`, `raw`

### Admin Interface
- `GET /api/admin/database/tables` - List database tables
- `GET /api/admin/database/table/[tableName]` - Get table data

## 🎯 Use Cases

### For Users
- **Podcast Discovery**: Find new podcasts in your interests
- **Search History**: Track and revisit past searches
- **Regional Content**: Discover podcasts from your region
- **Trending Content**: Stay updated with popular podcasts

### For Administrators
- **Data Management**: Monitor and manage podcast data
- **Search Analytics**: Understand user search patterns
- **Content Curation**: Manage and organize podcast content
- **System Monitoring**: Track application performance

## 🔒 Security & Privacy

- **Environment Variables**: Secure configuration management
- **Input Validation**: Comprehensive input sanitization
- **Error Handling**: Secure error responses
- **Database Security**: Row Level Security policies
- **API Protection**: Rate limiting and validation

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Setup
- Configure Supabase environment variables
- Set up production database
- Configure domain and SSL certificates
