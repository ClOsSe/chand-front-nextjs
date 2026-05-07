import { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { isLocale, locales } from "@/config/i18n";
import { AppProviders } from "@/providers/app";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import "../globals.css";

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

  const localeDirections = {
    fa: "rtl",
    en: "ltr",
  } as const;

  const direction = localeDirections[locale];

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <AppProviders>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </AppProviders>
      </body>
    </html>
  );
}
