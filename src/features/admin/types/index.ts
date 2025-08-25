export interface TableData {
  tableName: string;
  columns: string[];
  rows: Record<string, string | number | null>[];
  pagination: {
    page: number;
    pageSize: number;
    totalRows: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startRow: number;
    endRow: number;
  };
}

export interface DatabaseTable {
  name: string;
  rowCount?: number;
}
