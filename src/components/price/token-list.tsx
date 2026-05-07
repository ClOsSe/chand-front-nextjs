"use client";

import { useQuery } from "@tanstack/react-query";
import type { Locale } from "@/config/i18n";
import { tokensQueryOptions } from "@/services/price.queries";
import type { PriceList, Token } from "@/types/price";

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
        const priceSummary = summarizePrices(token.ps, numberFormatter);
        const tokenIcon = getTokenIcon(token);
        // console.log("token", token);

        return (
          <article
            key={`${token.ty}-${token.ab}`}
            className="rounded-2xl border border-(--border) p-4 h-48 shadow-2xl/15"
          >
            <div className="flex justify-between gap-4 h-full ">
              <div className="grid content-between gap-4">
                <span
                  aria-label={tokenIcon.label}
                  title={tokenIcon.label}
                  className="block h-10 w-10 rounded-full bg-white bg-cover bg-center bg-no-repeat ring-1 ring-(--border)"
                  style={{ backgroundImage: `url("${tokenIcon.src}")` }}
                />
                {priceSummary && (
                  <div className="text-end">
                    <p className="font-medium text-xl text-red-500 text-left">
                      {priceSummary.changeWithSeparate}
                    </p>
                    <p className="font-bold text-2xl text-(--foreground)">
                      {numberFormatter.format(priceSummary.last)}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-medium text-end">
                  {locale === "fa" ? token.fa : token.en}
                </h2>
                <p className="text-sm text-(--tab-inactive-fg)">
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

type TokenIcon = {
  label: string;
  src: string;
};

const fiatIconBySymbol: Record<string, TokenIcon> = {
  USD: { label: "US flag", src: "https://flagcdn.com/us.svg" },
  EUR: { label: "European Union flag", src: "https://flagcdn.com/eu.svg" },
  GBP: { label: "United Kingdom flag", src: "https://flagcdn.com/gb.svg" },
  CHF: { label: "Switzerland flag", src: "https://flagcdn.com/ch.svg" },
  CAD: { label: "Canada flag", src: "https://flagcdn.com/ca.svg" },
  JPY: { label: "Japan flag", src: "https://flagcdn.com/jp.svg" },
  TRY: { label: "Turkey flag", src: "https://flagcdn.com/tr.svg" },
};

const cryptoIconBySymbol: Record<string, TokenIcon> = {
  BTC: {
    label: "Bitcoin",
    src: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  USDT: {
    label: "Tether",
    src: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
  },
};

function getTokenIcon(token: Token): TokenIcon {
  const symbol = normalizeTokenText(token.ab);
  const tokenText = normalizeTokenText(`${token.ab} ${token.en} ${token.ty}`);
  const knownIcon = fiatIconBySymbol[symbol] ?? cryptoIconBySymbol[symbol];

  if (knownIcon) {
    return knownIcon;
  }

  if (isGoldToken(tokenText)) {
    return {
      label: `${token.en} gold coin`,
      src: createBadgeSvg("G", {
        background: "#f5d36b",
        foreground: "#7a5500",
        ring: "#d1a72c",
      }),
    };
  }

  return {
    label: token.en,
    src: createBadgeSvg(symbol.slice(0, 3) || "?", {
      background: "#e5e7eb",
      foreground: "#111827",
      ring: "#cbd5e1",
    }),
  };
}

function isGoldToken(value: string) {
  return [
    "GOLD",
    "GRAM",
    "GERAMI",
    "AZADI",
    "EMAMI",
    "HALF",
    "QUARTER",
    "COIN",
  ].some((keyword) => value.includes(keyword));
}

function normalizeTokenText(value: string) {
  return value.trim().toUpperCase();
}

function createBadgeSvg(
  text: string,
  colors: { background: string; foreground: string; ring: string },
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="38" fill="${colors.background}" stroke="${colors.ring}" stroke-width="4"/>
      <text x="40" y="47" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="${colors.foreground}">${escapeSvgText(text)}</text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function escapeSvgText(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
