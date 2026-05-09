import { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { isLocale, locales } from "@/config/i18n";
import { AppProviders } from "@/providers/app";

export const metadata: Metadata = {
  title: "Chand",
  description: "Modern financial market tracking application",
};

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={direction}>
      <AppProviders>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </AppProviders>
    </div>
  );
}
