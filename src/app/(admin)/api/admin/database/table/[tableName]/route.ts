import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tableName: string }> }
) {
  try {
    const { tableName } = await params;
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Validate table name to prevent SQL injection
    const validTables = ['search_history', 'podcasts', 'episodes'];
    if (!validTables.includes(tableName)) {
      return NextResponse.json(
        { success: false, error: 'Invalid table name' },
        { status: 400 }
      );
    }

    // Get total row count
    const { count: totalRows, error: countError } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error getting row count:', countError);
      return NextResponse.json(
        { success: false, error: 'Failed to get row count' },
        { status: 500 }
      );
    }

    // Get paginated table data
    const { data: rows, error: dataError } = await supabase
      .from(tableName)
      .select('*')
      .range(from, to);

    if (dataError) {
      console.error('Error fetching table data:', dataError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch table data' },
        { status: 500 }
      );
    }

    // Get column names from the first row (if any data exists)
    const columnNames = rows && rows.length > 0 ? Object.keys(rows[0]) : [];
    
    // Calculate pagination info
    const totalPages = Math.ceil((totalRows || 0) / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      success: true,
      tableName,
      columns: columnNames,
      rows: rows || [],
      pagination: {
        page,
        pageSize,
        totalRows: totalRows || 0,
        totalPages,
        hasNextPage,
        hasPreviousPage,
        startRow: from + 1,
        endRow: Math.min(from + pageSize, totalRows || 0)
      }
    });
  } catch (error) {
    console.error(`Error fetching table data for ${params}:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch table data' },
      { status: 500 }
    );
  }
}
