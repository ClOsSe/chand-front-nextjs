import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={direction}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
