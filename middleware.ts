import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  // Protect checkout and cart routes
  const protectedRoutes = ['/product/checkout', '/cart'];
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (!token && isProtectedRoute) {
    // Redirect to login page and optionally pass the callback URL
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/product/checkout/:path*', '/cart/:path*'],
};
