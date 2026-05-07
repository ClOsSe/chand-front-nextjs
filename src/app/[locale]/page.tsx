import { isLocale } from "@/config/i18n";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = await getTranslations("common");

  return (
    <main className="flex mx-auto w-3/4  bg-(--background) text-(--foreground)">
      <h1>
        {t("title")} ({locale})
      </h1>
    </main>
  );
}
