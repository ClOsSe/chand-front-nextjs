import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/config/i18n";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const localeDirections = {
    fa: "rtl",
    en: "ltr",
  } as const;

  const direction = localeDirections[locale];

  return (
    <div lang={locale} dir={direction}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
