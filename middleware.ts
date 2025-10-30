import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Redirect non-www to www for downscale.com.au
  if (hostname === 'downscale.com.au') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.downscale.com.au';
    return NextResponse.redirect(url, 301);
  }

  // Protect portal routes: require Supabase auth cookie in production
  if (pathname.startsWith('/portal') && pathname !== '/portal/login') {
    const hasAccessToken = Boolean(request.cookies.get('sb-access-token')?.value);
    if (!hasAccessToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/portal/login';
      url.search = search;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap).*)',
  ],
};
