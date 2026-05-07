import { getRequestConfig } from "next-intl/server";

import { defaultLocale, locales, type Locale } from "@/config/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/locales/${locale}.json`)).default,
  };
});