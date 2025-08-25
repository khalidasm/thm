'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableData as TableDataType } from '../types';

interface TableDataProps {
  tableData: TableDataType;
  selectedTable: string;
  isLoading: boolean;
  filteredRows: Record<string, string | number | null>[];
  onRefresh: () => void;
}

export default function TableData({
  tableData,
  selectedTable,
  isLoading,
  filteredRows,
  onRefresh
}: TableDataProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="capitalize">{selectedTable}</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">
                {tableData.pagination.totalRows} total rows
              </Badge>
              <Badge variant="outline">
                Showing {tableData.pagination.startRow}-{tableData.pagination.endRow}
              </Badge>
            </div>
          </div>
          <Button 
            size="sm" 
            onClick={onRefresh} 
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {tableData.columns.map((column) => (
                  <TableHead key={column} className="uppercase text-xs">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  {tableData.columns.map((column) => (
                    <TableCell key={column} className="max-w-xs">
                      <div className="truncate" title={String(row[column] || 'NULL')}>
                        {row[column] !== null && row[column] !== undefined 
                          ? String(row[column]).length > 50 
                            ? String(row[column]).substring(0, 50) + '...'
                            : String(row[column])
                          : (
                              <span className="text-muted-foreground italic">NULL</span>
                            )
                        }
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredRows.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <p className="text-lg font-medium">No data found</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
