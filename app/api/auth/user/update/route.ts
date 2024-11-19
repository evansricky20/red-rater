import { NextResponse } from 'next/server';
import { getConnection } from '../../../../lib/db_util'; // Adjust the import based on your project structure
import { hash } from 'argon2'; // Password hashing function
import { signJWT } from '../../../../lib/jwt'; // Import the signJWT function

export async function POST(request: Request) {
  const { email, fname, lname, password } = await request.json();

  try {
    // Retrieve user from the database
    const connection = await getConnection();
    const [rows]: any[] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) { // If the table is not empty
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = rows[0];

    // Update user data
    const updatedData: any = {
      email: email || user.email,
      fname: fname || user.fname,
      lname: lname || user.lname,
    };

    if (password) {
      updatedData.password_hash = await hash(password);
    } else {
      updatedData.password_hash = user.password_hash;
    }

    await connection.execute(
      'UPDATE users SET email = ?, fname = ?, lname = ?, password_hash = ? WHERE id = ?',
      [updatedData.email, updatedData.fname, updatedData.lname, updatedData.password_hash, user.id]
    );

    // Generate a new JWT token after successful update
    const token = await signJWT({ userId: user.id, email: updatedData.email, fname: updatedData.fname, lname: updatedData.lname });

    // Return the token as an HTTP-only cookie
    const response = NextResponse.json({ message: 'Profile updated successfully' });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set the 'secure' flag for production
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week expiration
    });

    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Error updating profile' }, { status: 500 });
  }
}