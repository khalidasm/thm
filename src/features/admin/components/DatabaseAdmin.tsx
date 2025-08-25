'use client';

import { useState } from 'react';
import { useDatabaseTables, useDatabaseTableData } from '../hooks/useDatabaseAdmin';
import TableList from './TableList';
import TableDataComponent from './TableData';
import SearchAndPagination from './SearchAndPagination';
import DatabasePagination from './DatabasePagination';
import ErrorDisplay from './ErrorDisplay';
import EmptyState from './EmptyState';
import { LoadingWrapper, TableSkeleton } from '@/components/layout';

export default function DatabaseAdmin() {
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // React Query hooks
  const { 
    data: tables = [], 
    isLoading: tablesLoading, 
    error: tablesError,
    refetch: refetchTables 
  } = useDatabaseTables();

  const { 
    data: tableData, 
    isLoading: tableDataLoading, 
    error: tableDataError,
    refetch: refetchTableData 
  } = useDatabaseTableData(selectedTable, currentPage, pageSize);

  const handleTableSelect = (tableName: string) => {
    setSelectedTable(tableName);
    setCurrentPage(1); // Reset to first page when selecting a new table
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const refreshData = () => {
    if (selectedTable) {
      refetchTableData();
    }
  };

  const filteredRows = tableData?.rows.filter(row => {
    if (!searchTerm) return true;
    return Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Database Admin</h1>
              <p className="text-muted-foreground">Supabase Database Management Interface</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ErrorDisplay 
          tablesError={tablesError} 
          tableDataError={tableDataError} 
          onRetry={() => {
            if (tablesError) refetchTables();
            if (tableDataError) refetchTableData();
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tables List */}
          <TableList
            tables={tables}
            selectedTable={selectedTable}
            isLoading={tablesLoading}
            onTableSelect={handleTableSelect}
            onRefresh={() => refetchTables()}
          />

          {/* Table Data */}
          <div className="lg:col-span-3">
            <LoadingWrapper
              isLoading={tableDataLoading && !!selectedTable}
              variant="skeleton"
              skeletonComponent={TableSkeleton}
            >
              {tableData && (
                <div className="space-y-6">
                  <SearchAndPagination
                    searchTerm={searchTerm}
                    pageSize={pageSize}
                    onSearchChange={setSearchTerm}
                    onPageSizeChange={handlePageSizeChange}
                  />
                  
                  <TableDataComponent
                    tableData={tableData}
                    selectedTable={selectedTable}
                    isLoading={tableDataLoading}
                    filteredRows={filteredRows}
                    onRefresh={refreshData}
                  />
                  
                  <DatabasePagination
                    tableData={tableData}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </LoadingWrapper>

            {!tableData && !tableDataLoading && !selectedTable && (
              <EmptyState type="no-table-selected" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
