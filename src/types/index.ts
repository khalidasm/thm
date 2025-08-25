export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SearchApiResponse {
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

export interface iTunesPodcastResult {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

export interface iTunesEpisodeResult {
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  collectionName: string;
  trackName: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  feedUrl: string;
  artworkUrl60: string;
  artworkUrl160: string;
  artworkUrl600: string;
  trackTimeMillis: number;
  releaseDate: string;
  country: string;
  contentAdvisoryRating: string;
  genres: Array<{name: string; id: string}>;
  episodeGuid: string;
  episodeUrl: string;
  episodeFileExtension: string;
  episodeContentType: string;
  artistIds: number[];
  previewUrl: string;
  closedCaptioning: string;
  shortDescription: string;
  description: string;
}

export interface iTunesApiResponse {
  resultCount: number;
  results: iTunesPodcastResult[];
}

export interface iTunesEpisodeApiResponse {
  resultCount: number;
  results: iTunesEpisodeResult[];
}

export interface Podcast {
  id: string;
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl600: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  genreIds: string[];
  genres: string[];
  episodes?: Episode[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Genre {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Episode {
  id: string;
  title: string;
  description?: string | null;
  duration?: number | null;
  pubDate?: Date | null;
  guid?: string | null;
  enclosureUrl?: string | null;
  enclosureType?: string | null;
  enclosureLength?: number | null;
  itunesDuration?: string | null;
  itunesExplicit?: boolean | null;
  itunesImage?: string | null;
  itunesOrder?: number | null;
  itunesSubtitle?: string | null;
  itunesSummary?: string | null;
  itunesKeywords?: string | null;
  itunesAuthor?: string | null;
  podcastId: string;
  podcastName?: string | null;
  podcastArtist?: string | null;
  podcastArtwork?: string | null;
  trackViewUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EpisodeData {
  title: string;
  description?: string;
  duration?: number;
  pubDate?: Date;
  guid?: string;
  enclosureUrl?: string;
  enclosureType?: string;
  enclosureLength?: number;
  itunesDuration?: string;
  itunesExplicit?: boolean;
  itunesImage?: string;
  itunesOrder?: number;
  itunesSubtitle?: string;
  itunesSummary?: string;
  itunesKeywords?: string;
  itunesAuthor?: string;
}

export interface SearchHistory {
  id: string;
  term: string;
  resultCount: number;
  podcasts?: Podcast[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResult {
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

export interface AppConfig {
  country: string;
}

export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}

export interface ServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: AppError;
}

export interface PodcastServiceResponse {
  searchHistory: SearchHistory;
  savedPodcasts: Podcast[];
}

export * from './database'; 