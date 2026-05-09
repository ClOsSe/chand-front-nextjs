import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, Locale, locales } from "@/config/i18n"

const intlProxy = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forget",
];

function getLocale(pathname: string) {
  const maybeLocale = pathname.split("/")[1];

  return locales.includes(maybeLocale as Locale)
    ? maybeLocale
    : defaultLocale;
}

function isPublicPath(pathname: string, locale: string) {
  return PUBLIC_PATHS.some((path) => pathname === `/${locale}${path}`);
}

export default function proxy(request:NextRequest){
  const { pathname } = request.nextUrl;

  const locale = getLocale(pathname);

  const token = request.cookies.get('token')?.value;
  console.log("pathname:", pathname);
  console.log("cookies:", request.cookies.getAll());
  console.log("token:", token);
  
  const isLoggedIn = Boolean(token);
  const isPublic = isPublicPath(pathname,locale);



  if(!isLoggedIn && !isPublic){
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;

    return NextResponse.redirect(url)
  }


  if(isLoggedIn && pathname === `/${locale}/login`){
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }
  return intlProxy(request);

}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};


