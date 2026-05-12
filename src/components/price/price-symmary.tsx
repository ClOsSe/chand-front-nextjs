import { useAppSelector } from "@/store/hooks";
import { summarizePrices } from "./token-list";
import type { Locale } from "@/config/i18n";
import { Token } from "@/types/price";
import { formatPrice } from "@/lib/price/format-price";

type Props = {
  token: Token;
  locale: Locale;
};
export default function PriceSummary({ token, locale }: Props) {
  const isRtl = locale === "fa";

  const priceSummary = summarizePrices(token.ps, locale);

  const priceColor = useAppSelector((state) => state.settings.priceColor);

  return (
    <>
      {priceSummary && (
        <div className="text-end">
          <p
            className={[
              "font-medium text-xl sm:text-2xl ",
              priceColor === "red" ? "text-red-500" : "text-green-500",
              isRtl ? "text-right" : "text-left",
            ].join(" ")}
          >
            {priceSummary.changeWithSeparate}
          </p>
          <p
            className={[
              "font-bold text-2xl sm:text-3xl text-(--foreground)",
              isRtl ? "text-right" : "text-left",
            ].join(" ")}
          >
            {formatPrice(priceSummary.last, locale)}
          </p>
        </div>
      )}
    </>
  );
}
