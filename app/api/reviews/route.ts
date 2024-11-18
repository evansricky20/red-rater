import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from './../../lib/db_util';

export async function POST(req: NextRequest) {
  const { name, course, date, professorRating, courseRating, reviewContent, professorName } = await req.json();

  try {
    const connection = await getConnection();
    await connection.execute(
      'INSERT INTO reviews (userName, profName, course, date, professorRating, courseRating, reviewContent) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, professorName, course, date, professorRating, courseRating, reviewContent]
    );
    connection.release();
    return NextResponse.json({ message: 'Review submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}