'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TableListProps {
  tables: string[];
  selectedTable: string;
  isLoading: boolean;
  onTableSelect: (tableName: string) => void;
  onRefresh: () => void;
}

export default function TableList({
  tables,
  selectedTable,
  isLoading,
  onTableSelect,
  onRefresh
}: TableListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Database Tables</CardTitle>
          <Button 
            size="sm"
            onClick={onRefresh} 
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tables.map((table) => (
            <Button
              key={table}
              variant={selectedTable === table ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => onTableSelect(table)}
              disabled={isLoading}
            >
              {table}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
