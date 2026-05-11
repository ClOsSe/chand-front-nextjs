"use client";

import { useQuery } from "@tanstack/react-query";
import type { Locale } from "@/config/i18n";
import { getTokenIcon } from "@/lib/price/token-icon";
import { getTokenKey } from "@/lib/price/token-key";
import { tokensQueryOptions } from "@/services/price.queries";
import type { PriceList } from "@/types/price";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type Props = {
  locale: Locale;
};

export function TokenList({ locale }: Props) {
  const t = useTranslations("common");

  const { data: tokens, error, isPending } = useQuery(tokensQueryOptions);
  const priceError = getErrorMessage(error);
  const selectedTokenKeys = useAppSelector(
    (state) => state.settings.selectedTokenKeys,
  );
  const viewModel = useAppSelector((state) => state.settings.viewModel);

  const priceColor = useAppSelector((state) => state.settings.priceColor);

  useEffect(() => {
    localStorage.setItem(
      "selectedTokenKeys",
      JSON.stringify(selectedTokenKeys),
    );
  }, [selectedTokenKeys]);

  const tokenList =
    selectedTokenKeys.length > 0
      ? (tokens ?? []).filter((token) =>
          selectedTokenKeys.includes(getTokenKey(token)),
        )
      : (tokens ?? []);
  const numberFormatter = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  );

  if (priceError) {
    return (
      <section
        role="alert"
        className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-600 dark:text-red-300"
      >
        <h2 className="font-semibold">{t("priceServiceFailed")}</h2>
        <p className="mt-1 text-sm">{priceError}</p>
      </section>
    );
  }

  if (isPending) {
    return (
      <section className="rounded-lg border border-(--border) p-4">
        {t("loadingPrices")}
      </section>
    );
  }

  if (!tokenList.length) {
    return (
      <section className="rounded-lg border border-(--border) p-4">
        {t("priceNotAvailable")}
      </section>
    );
  }

  return (
    <section
      className={[
        "grid gap-3",
        viewModel === "cardView" ? "grid-cols-2" : "grid-cols-1",
      ].join(" ")}
    >
      {tokenList.map((token) => {
        const priceSummary = summarizePrices(token.ps, numberFormatter);
        const tokenIcon = getTokenIcon(token);
        return (
          <article
            key={`${token.ty}-${token.ab}`}
            className="rounded-2xl border border-(--border) p-4  h-35 sm:h-48 shadow-2xl/15"
          >
            <div className="flex justify-between gap-0 h-full ">
              <div className="grid content-between gap-4">
                <div
                  role="img"
                  aria-label={tokenIcon.label}
                  title={tokenIcon.label}
                  className="block w-8 sm:w-10 aspect-square rounded-full bg-white bg-cover bg-center bg-no-repeat ring-1 ring-(--border)"
                  style={{ backgroundImage: `url("${tokenIcon.src}")` }}
                />
                {priceSummary && (
                  <div className="text-end">
                    <p
                      className={[
                        "font-medium text-md sm:text-2xl  text-left",
                        priceColor === "red"
                          ? "text-red-500"
                          : "text-green-500",
                      ].join(" ")}
                    >
                      {priceSummary.changeWithSeparate}
                    </p>
                    <p className="font-bold text-lg sm:text-2xl text-(--foreground)">
                      {numberFormatter.format(priceSummary.last)}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xs sm:text-base font-thin text-end">
                  {locale === "fa" ? token.fa : token.en}
                </h2>
                <p className="text-xs sm:text-sm text-end text-(--tab-inactive-fg)">
                  {token.ab} - {token.ty}
                </p>
              </div>
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

function summarizePrices(prices: PriceList[], formatter: Intl.NumberFormat) {
  if (!prices.length) {
    return null;
  }

  const values = prices.map(getPriceValue).filter((value) => value != null);

  if (!values.length) {
    return null;
  }

  const high = Math.max(...values);
  const low = Math.min(...values);
  const latestValue = getPriceValue(prices[0]);
  const oldestValue = getPriceValue(prices[prices.length - 1]);

  if (latestValue == null || oldestValue == null) {
    return null;
  }

  const change = latestValue - oldestValue;
  const trend = change > 0 ? "↑" : change < 0 ? "↓" : "→";

  return {
    high,
    low,
    last: latestValue,
    change,
    changeWithSeparate: `${trend}${formatter.format(Math.abs(change))}`,
  };
}

function getPriceValue(price: PriceList) {
  return price.sp ?? price.bp;
}
