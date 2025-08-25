// Database-specific types that match Prisma's generated types
export interface DatabasePodcast {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  collectionId: number;
  trackId: number;
  artistName: string | null;
  collectionName: string;
  trackName: string;
  collectionViewUrl: string | null;
  feedUrl: string | null;
  artworkUrl30: string | null;
  artworkUrl60: string | null;
  artworkUrl100: string | null;
  artworkUrl600: string | null;
  releaseDate: Date | null;
  trackTimeMillis: number | null;
  country: string | null;
  currency: string | null;
  primaryGenreName: string | null;
  contentAdvisoryRating: string | null;
  artworkUrl30_2x: string | null;
  artworkUrl60_2x: string | null;
  artworkUrl100_2x: string | null;
  artworkUrl600_2x: string | null;
  artistViewUrl: string | null;
  trackCensoredName: string | null;
  collectionCensoredName: string | null;
  artistId: number | null;
  collectionPrice: number | null;
  trackPrice: number | null;
  collectionHdPrice: number | null;
  trackHdPrice: number | null;
  trackHdRentalPrice: number | null;
  collectionExplicitness: string | null;
  trackExplicitness: string | null;
  trackCount: number | null;
  copyright: string | null;
  description: string | null;
  shortDescription: string | null;
  longDescription: string | null;
  searchHistoryId: string | null;
  genres?: DatabaseGenre[];
  episodes?: DatabaseEpisode[];
}

export interface DatabaseGenre {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseEpisode {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  podcastId: string;
  title: string;
  duration: number | null;
  pubDate: Date | null;
  guid: string | null;
  enclosureUrl: string | null;
  enclosureType: string | null;
  enclosureLength: number | null;
  itunesDuration: string | null;
  itunesExplicit: boolean | null;
  itunesImage: string | null;
  itunesOrder: number | null;
  itunesSubtitle: string | null;
  itunesSummary: string | null;
  itunesKeywords: string | null;
  itunesAuthor: string | null;
}

export interface DatabaseSearchHistory {
  id: string;
  term: string;
  resultCount: number;
  createdAt: Date;
  updatedAt: Date;
  podcasts?: DatabasePodcast[];
}

// Type guards and converters
export function isDatabasePodcast(obj: unknown): obj is DatabasePodcast {
  return obj !== null && typeof obj === 'object' && 'id' in obj && 'collectionId' in obj;
}

export function isDatabaseEpisode(obj: unknown): obj is DatabaseEpisode {
  return obj !== null && typeof obj === 'object' && 'id' in obj && 'title' in obj;
}

export function isDatabaseGenre(obj: unknown): obj is DatabaseGenre {
  return obj !== null && typeof obj === 'object' && 'id' in obj && 'name' in obj;
}

export function isDatabaseSearchHistory(obj: unknown): obj is DatabaseSearchHistory {
  return obj !== null && typeof obj === 'object' && 'id' in obj && 'term' in obj;
} 