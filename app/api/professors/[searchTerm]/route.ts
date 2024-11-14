import { NextResponse } from 'next/server';
import { getConnection } from './../../../lib/db_util';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);

  console.log({ pathname });

  let name = pathname.split('/').pop();

  if (name) {
    name = decodeURIComponent(decodeURIComponent(name)); // Decode the name parameter twice
    name = name.replace(/ /g, ', '); // Replace space with comma and space
  }

  console.log({ name }); // Log the extracted name parameter

  if (!name) {
    return NextResponse.json({ message: 'Name parameter is required' }, { status: 400 });
  }

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM results WHERE Name = ?', [name]);
    console.log(`Data retrieved for name ${name}:`, rows);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(`Error in /api/professors/${name}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}