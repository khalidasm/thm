'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: ReactNode;
  fallback?: ReactNode;
  variant?: 'spinner' | 'skeleton' | 'fullscreen' | 'inline';
  loadingMessage?: string;
  skeletonComponent?: React.ComponentType;
  className?: string;
  delay?: number;
  minDuration?: number;
}

const LoadingWrapper = ({
  isLoading,
  children,
  fallback,
  variant = 'spinner',
  loadingMessage = 'Loading...',
  skeletonComponent: SkeletonComponent,
  className,
  delay = 0,
  minDuration = 0
}: LoadingWrapperProps) => {
  if (fallback) {
    return (
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay }}
          >
            {fallback}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (variant === 'skeleton') {
    return (
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay }}
          >
            {SkeletonComponent ? <SkeletonComponent /> : <Skeleton className={className} />}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <>
        <AnimatePresence>
          {isLoading && (
            <LoadingSpinner 
              variant="fullscreen" 
              message={loadingMessage} 
            />
          )}
        </AnimatePresence>
        {children}
      </>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={className}>
        {isLoading ? (
          <LoadingSpinner 
            variant="minimal" 
            size="sm" 
            message={loadingMessage} 
          />
        ) : (
          children
        )}
      </div>
    );
  }

  // Default spinner variant
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay }}
        >
          <LoadingSpinner message={loadingMessage} className={className} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingWrapper;
