'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorDisplayProps {
  tablesError?: Error | null;
  tableDataError?: Error | null;
  onRetry?: () => void;
}

export default function ErrorDisplay({ 
  tablesError, 
  tableDataError, 
  onRetry 
}: ErrorDisplayProps) {
  const error = tablesError || tableDataError;
  
  if (!error) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6 border-destructive bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-destructive">
                    {tablesError ? 'Failed to load tables' : 'Failed to load table data'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {error.message}
                  </p>
                  {onRetry && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onRetry}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Try again
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
