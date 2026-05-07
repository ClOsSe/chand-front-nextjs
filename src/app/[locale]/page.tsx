import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};
export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "common",
  });

  return (
    <main className="min-h-screen bg-(--background) text-(--foreground)">
      <h1>
        {t("title")} ({locale})
      </h1>
    </main>
  );
}
