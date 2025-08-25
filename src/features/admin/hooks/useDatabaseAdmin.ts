import { useQuery } from '@tanstack/react-query';
import { adminDatabaseService } from '../services/database-service';

export function useDatabaseTables() {
  return useQuery({
    queryKey: ['admin-tables'],
    queryFn: adminDatabaseService.fetchTables,
  });
}

export function useDatabaseTableData(tableName: string, page: number = 1, pageSize: number = 20) {
  return useQuery({
    queryKey: ['admin-table-data', tableName, page, pageSize],
    queryFn: () => adminDatabaseService.fetchTableData(tableName, page, pageSize),
    enabled: !!tableName, // Only run when a table is selected
  });
}
