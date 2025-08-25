'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/layout';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  type: 'no-table-selected' | 'loading';
  isLoading?: boolean;
}

export default function EmptyState({ type }: EmptyStateProps) {
  const getContent = () => {
    switch (type) {
      case 'loading':
        return {
          title: 'Loading table data...',
          description: '',
          showSpinner: true
        };
      case 'no-table-selected':
      default:
        return {
          title: 'Select a Table',
          description: 'Choose a table from the sidebar to view its data',
          showSpinner: false
        };
    }
  };

  const content = getContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            {content.showSpinner ? (
              <LoadingSpinner 
                message={content.title}
                size="lg"
                variant="default"
              />
            ) : (
              <div className="text-muted-foreground space-y-2">
                <p className="text-xl font-medium">{content.title}</p>
                {content.description && (
                  <p className="text-sm">{content.description}</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
