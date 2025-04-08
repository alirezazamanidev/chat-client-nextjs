import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/signin' || path === '/signup';
  
  // Check if token exists in cookies
  const token = request.cookies.get('token')?.value || '';
  
  // If the user is on a login/signup page but already has a token,
  // redirect them to the homepage
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // If the user is not on a public path and doesn't have a token,
  // redirect them to the signin page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

// Configure which paths this middleware should run on
export const config = {
  matcher: [
    // Match all paths except for:
    // - api routes
    // - static files (images, js, css, etc.)
    // - favicon
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 