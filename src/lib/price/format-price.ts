import type { Locale } from "@/config/i18n";

const compactFormatter = {
  fa: new Intl.NumberFormat("fa-IR", {
    notation: "compact",
    maximumFractionDigits: 2,
  }),
  en: new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }),
};

const fullFormatter = {
  fa: new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 0,
  }),
  en: new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }),
};

export function formatPrice(value: number, locale: Locale) {
  const absValue = Math.abs(value);

  if (absValue >= 100_000) {
    return compactFormatter[locale].format(value);
  }

  return fullFormatter[locale].format(value);
}

export function formatPriceChange(value: number, locale: Locale) {
  const trend = value > 0 ? "↑" : value < 0 ? "↓" : "→";
  const formatted = formatPrice(Math.abs(value), locale);

  return `${trend}${formatted}`;
}