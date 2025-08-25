'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface SearchAndPaginationProps {
  searchTerm: string;
  pageSize: number;
  onSearchChange: (value: string) => void;
  onPageSizeChange: (size: number) => void;
}

export default function SearchAndPagination({
  searchTerm,
  pageSize,
  onSearchChange,
  onPageSizeChange
}: SearchAndPaginationProps) {
  return (
    <>
      {/* Search and Page Size */}
      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Search in table data..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-md"
        />
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select value={pageSize.toString()} onValueChange={(value: string) => onPageSizeChange(parseInt(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mb-6" />
    </>
  );
}
