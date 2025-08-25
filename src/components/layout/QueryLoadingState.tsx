import LoadingSpinner from './LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';

interface QueryLoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  variant?: 'spinner' | 'skeleton' | 'custom';
  skeletonComponent?: React.ComponentType;
  loadingMessage?: string;
  className?: string;
}

const QueryLoadingState = ({ 
  isLoading, 
  children, 
  fallback,
  variant = 'spinner',
  skeletonComponent: SkeletonComponent,
  loadingMessage = 'Loading...',
  className
}: QueryLoadingStateProps) => {
  if (isLoading) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (variant === 'skeleton') {
      if (SkeletonComponent) {
        return <SkeletonComponent />;
      }
      return <Skeleton className={className} />;
    }

    return <LoadingSpinner message={loadingMessage} className={className} />;
  }

  return <>{children}</>;
} 

export default QueryLoadingState;