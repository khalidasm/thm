import { AppConfig } from '@/types';

// Application Configuration
export const APP_CONFIG: AppConfig = {
  country: 'SA',
};

// iTunes API Configuration
export const ITUNES_API_CONFIG = {
  baseUrl: 'https://itunes.apple.com',
  searchEndpoint: '/search',
  lookupEndpoint: '/lookup',
  timeout: 10000,
  userAgent: 'Mozilla/5.0 (compatible; PodcastBot/1.0)',
};

// Search Configuration
export const SEARCH_CONFIG = {
  fallbackTerms: ['podcast', 'news', 'technology', 'business', 'entertainment'],
  maxRetries: 3,
  retryDelay: 1000,
};

// Error Messages
export const ERROR_MESSAGES = {
  DATABASE_ERROR: 'Database operation failed',
  VALIDATION_ERROR: 'Invalid input data',
  NOT_FOUND: 'Resource not found',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PODCASTS_LOADED: 'Podcasts loaded successfully',
  EPISODES_LOADED: 'Episodes loaded successfully',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
} as const; 


export const AUTHOR_COLORS = [
  "text-author-1",
  "text-author-2",
  "text-author-3",
  "text-author-4",
  "text-author-5",
]

export const AUTHOR_BACKGROUND_COLORS = [
  "bg-author-1/10",
  "bg-author-2/10",
  "bg-author-3/10",
  "bg-author-4/10",
  "bg-author-5/10",
]