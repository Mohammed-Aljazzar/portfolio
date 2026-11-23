import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip paths that should not be localized
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.') // static files like favicon.svg, images, etc.
  ) {
    return NextResponse.next();
  }

  // 2. Check if pathname already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 3. Determine target locale from cookie or fallback to default
  const savedLocale = request.cookies.get('portfolio_lang')?.value;
  const locale = (savedLocale && locales.includes(savedLocale)) ? savedLocale : defaultLocale;
  const newPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(new URL(newPath, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets (public static assets)
     * - favicon.ico, icon.svg, etc.
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|icon.svg|admin).*)',
  ],
};
