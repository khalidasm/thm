import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tables = ['search_history', 'podcasts', 'episodes'];

    return NextResponse.json({
      success: true,
      tables: tables
    });
  } catch (error) {
    console.error('Error fetching tables:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tables' },
      { status: 500 }
    );
  }
}
