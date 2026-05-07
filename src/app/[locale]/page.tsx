import { Locale } from "@/config/i18n";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("common");
  return (
    <main className="flex mx-auto w-3/4  bg-(--background) text-(--foreground)">
      <h1>
        {t("title")} ({locale})
      </h1>
    </main>
  );
}
