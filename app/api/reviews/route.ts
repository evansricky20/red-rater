import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from './../../lib/db_util';

export async function POST(req: NextRequest) {
  const { userName, course, date, professorRating, courseRating, reviewContent, professorName } = await req.json();

  if (!userName || !course || !date || !professorRating || !courseRating || !reviewContent || !professorName) {
    console.error('Missing required fields:', { userName, course, date, professorRating, courseRating, reviewContent, professorName });
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const connection = await getConnection();
    await connection.execute(
      'INSERT INTO reviews (userName, profName, course, date, professorRating, courseRating, reviewContent) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userName, professorName, course, date, professorRating, courseRating, reviewContent]
    );
    connection.release();
    return NextResponse.json({ message: 'Review submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}