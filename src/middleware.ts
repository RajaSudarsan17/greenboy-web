import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the protocol from the request
  const proto = request.headers.get('x-forwarded-proto') || 'http';
  
  // If not HTTPS and not in development, redirect to HTTPS
  if (proto === 'http' && process.env.NODE_ENV === 'production') {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
