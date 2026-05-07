import createMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "./src/locales/config/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ["/", "/(fa|en)/:path*"],
};