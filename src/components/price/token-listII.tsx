"use client";

import { useQuery } from "@tanstack/react-query";
import type { Locale } from "@/config/i18n";
import { tokensQueryOptions } from "@/services/price.queries";

type Props = {
  initialError: string | null;
  locale: Locale;
};

export function TokenList({ initialError, locale }: Props) {
  const { data: tokens, error, isPending } = useQuery(tokensQueryOptions);
  const priceError = getErrorMessage(error) ?? (!tokens ? initialError : null);
  const tokenList = tokens ?? [];
  const numberFormatter = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  );

  if (priceError) {
    return (
      <section
        role="alert"
        className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-600 dark:text-red-300"
      >
        <h2 className="font-semibold">Price service failed</h2>
        <p className="mt-1 text-sm">{priceError}</p>
      </section>
    );
  }

  if (isPending) {
    return (
      <section className="rounded-lg border border-(--border) p-4">
        Loading prices...
      </section>
    );
  }

  if (!tokenList.length) {
    return (
      <section className="rounded-lg border border-(--border) p-4">
        No prices are available.
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-3">
      {tokenList.map((token) => {
        const latestPrice = token.ps[0];
        // console.log("token", token);

        return (
          <article
            key={`${token.ty}-${token.ab}`}
            className="rounded-lg border border-(--border) p-4 h-36"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-medium">
                  {locale === "fa" ? token.fa : token.en}
                </h2>
                <p className="text-sm text-(--tab-inactive-fg)">
                  {token.ab} - {token.ty}
                </p>
              </div>

              {latestPrice && (
                <div className="text-end">
                  <p className="font-semibold">
                    {numberFormatter.format(latestPrice.sp)}
                  </p>
                  {latestPrice.bp != null && (
                    <p className="text-sm text-(--tab-inactive-fg)">
                      {numberFormatter.format(latestPrice.bp)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return null;
}
