'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export const PodcastCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="flex flex-col space-y-3"
  >
    <Skeleton className="aspect-square rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </motion.div>
);

export const EpisodeCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="flex flex-row items-stretch rounded-lg w-full 2xl:w-[300px] shadow-none border-none gap-1 bg-muted"
  >
    <div className="w-[110px] flex-shrink-0 relative overflow-hidden rounded-l-lg bg-muted">
      <Skeleton className="w-full h-[110px] rounded-l-lg" />
    </div>
    <div className="flex flex-col justify-between p-2 flex-1 min-w-0 h-[110px]">
      <div className="flex items-start justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-6 rounded" />
      </div>
      <div className="mt-1 mb-2 flex-1 min-w-0">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <div className="flex items-center gap-2 mt-auto">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-8" />
      </div>
    </div>
  </motion.div>
);

export const PodcastGridSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6">
      {Array.from({ length: 16 }).map((_, index) => (
        <PodcastCardSkeleton key={index} index={index} />
      ))}
    </div>
  </div>
);

export const EpisodeGridSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <EpisodeCardSkeleton key={index} index={index} />
      ))}
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-10 w-24" />
    </div>
    <div className="border rounded-lg">
      <div className="p-4 border-b">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-4" />
          ))}
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 border-b last:border-b-0">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SearchResultsSkeleton = () => (
  <div className="space-y-12">
    <PodcastGridSkeleton />
    <EpisodeGridSkeleton />
  </div>
);

export const ContentSectionsSkeleton = () => (
  <div className="flex flex-col space-y-12">
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <PodcastCardSkeleton key={index} index={index} />
        ))}
      </div>
    </div>
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <EpisodeCardSkeleton key={index} index={index} />
        ))}
      </div>
    </div>
  </div>
);
