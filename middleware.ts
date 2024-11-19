import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone(); // Clone current URL

  // Retrieve protocol and host from request headers
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('host');

  // Assign the Base URL
  url.searchParams.set('baseURL', `${protocol}://${host}`);
  return NextResponse.rewrite(url);
}