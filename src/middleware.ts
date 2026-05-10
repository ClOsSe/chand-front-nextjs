import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, locales, type Locale } from "@/config/i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

const PUBLIC_PATHS = ["/login", "/register", "/forget"];

function getLocale(pathname: string): Locale {
  const maybeLocale = pathname.split("/")[1];

  return locales.includes(maybeLocale as Locale)
    ? (maybeLocale as Locale)
    : defaultLocale;
}

function isPublicPath(pathname: string, locale: Locale) {
  return PUBLIC_PATHS.some((path) => pathname === `/${locale}${path}`);
}

function isLocaleHome(pathname: string, locale: Locale) {
  return pathname === `/${locale}`;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const intlResponse = intlMiddleware(request);

  const locale = getLocale(pathname);
  const token = request.cookies.get("token")?.value;

  const isLoggedIn = Boolean(token);
  const isPublic = isPublicPath(pathname, locale);
  const isHome = isLocaleHome(pathname, locale);

  if (!isLoggedIn && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;

    return NextResponse.redirect(url);
  }

  if (isLoggedIn && isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;

    return NextResponse.redirect(url);
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};