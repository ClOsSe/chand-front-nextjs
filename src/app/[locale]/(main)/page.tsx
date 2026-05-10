import { isLocale } from "@/config/i18n";
import { notFound } from "next/navigation";
import { TokenList } from "@/components/price/token-list";

export const dynamic = "force-dynamic";

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

  return (
    <main className="mx-auto flex w-full sm:w-3/4 flex-col gap-4 bg-(--background) py-6 text-(--foreground) px-1 mb-5">
      <TokenList locale={locale} />
    </main>
  );
}
