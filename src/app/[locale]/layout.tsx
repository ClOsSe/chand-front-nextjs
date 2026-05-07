import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Locale } from "@/config/i18n";
import Header from "@/components/layout/header";

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
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
      </NextIntlClientProvider>
    </div>
  );
}
