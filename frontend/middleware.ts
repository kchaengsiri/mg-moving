import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "th"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Rewrite root / to /en seamlessly without a 307 redirect
  if (pathname === "/") {
    return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
  }

  // Redirect other missing locales to correct fallback
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
