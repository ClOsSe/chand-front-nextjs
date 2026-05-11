"use client";

import type { Locale } from "@/config/i18n";
import type { Token } from "@/types/price";
import { X } from "lucide-react";
import { MiniPriceChart } from "./mini-price-chart";
import { FullPriceChart } from "./full-price-chart";
import { getTokenIcon } from "@/lib/price/token-icon";
import PriceSummary from "./price-symmary";
import { useAppSelector } from "@/store/hooks";

type Props = {
  token: Token | null;
  locale: Locale;
  onClose: () => void;
};

export function MainPriceChart({ token, locale, onClose }: Props) {
  if (!token) {
    return null;
  }
  const tokenIcon = getTokenIcon(token);
  const priceColor = useAppSelector((state) => state.settings.priceColor);

  const title = locale === "fa" ? token.fa : token.en;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40 ">
      <button
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close"
      />

      <section
        dir="ltr"
        className="relative z-10 w-full rounded-t-3xl bg-(--background) p-5 text-(--foreground) shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="mx-2 my-8">
            <div
              role="img"
              aria-label={tokenIcon.label}
              title={tokenIcon.label}
              className="block w-8 sm:w-10 aspect-square rounded-full bg-white bg-cover bg-center bg-no-repeat ring-1 ring-(--border)"
              style={{ backgroundImage: `url("${tokenIcon.src}")` }}
            />
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-(--tab-inactive-fg)">
              {token.ab.toUpperCase()} - {token.ty}
            </p>
            <PriceSummary token={token} locale={locale} />
          </div>

          <button onClick={onClose} aria-label="Close">
            <X className="size-6" />
          </button>
        </div>

        <div
          className={[
            "h-72",
            priceColor === "red" ? "text-red-500" : "text-green-500",
          ].join(" ")}
        >
          <FullPriceChart prices={token.ps} locale={locale} />
        </div>
      </section>
    </div>
  );
}
