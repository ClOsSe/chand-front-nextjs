import { isLocale } from "@/config/i18n";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/react-query/query-client";
import { TokenList } from "@/components/price/token-list";
import { tokensQueryOptions } from "@/services/price.queries";

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

  const queryClient = makeQueryClient();
  let priceError: string | null = null;

  try {
    await queryClient.fetchQuery(tokensQueryOptions);
  } catch (error) {
    priceError =
      error instanceof Error
        ? error.message
        : "Price service failed for an unknown reason";
  }

  return (
    <main className="mx-auto flex w-fit sm:w-3/4 flex-col gap-4 bg-(--background) py-6 text-(--foreground)">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TokenList initialError={priceError} locale={locale} />
      </HydrationBoundary>
    </main>
  );
}
