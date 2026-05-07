import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={direction}>
      {children}
    </div>
  );
}
