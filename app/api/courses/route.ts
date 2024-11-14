import { NextResponse } from 'next/server';
import { getConnection } from './../../lib/db_util'; // Your database utility

export async function GET() {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT DISTINCT Course Num, Section FROM results');
    console.log("Data retrieved from database:", rows);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in /api/professors:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}