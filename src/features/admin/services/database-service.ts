import { TableData } from '../types';

export const adminDatabaseService = {
  // Fetch all database tables
  async fetchTables(): Promise<string[]> {
    const response = await fetch('/api/admin/database/tables');
    if (!response.ok) {
      throw new Error('Failed to fetch tables');
    }
    const data = await response.json();
    return data.tables;
  },

  // Fetch table data with pagination
  async fetchTableData(tableName: string, page: number = 1, pageSize: number = 20): Promise<TableData> {
    const response = await fetch(`/api/admin/database/table/${tableName}?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for table: ${tableName}`);
    }
    return response.json();
  }
};
