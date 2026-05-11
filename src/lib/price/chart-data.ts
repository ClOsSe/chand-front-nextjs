import type { PriceList } from "@/types/price";

export type PriceChartPoint = {
  time: string;
  timestamp: number;
  price: number;
};

export function toPriceChartData(prices: PriceList[]): PriceChartPoint[] {
  return prices
    .map((price) => {
      const value = price.sp ?? price.bp;

      if (!value || !price.ts) {
        return null;
      }

      return {
        time: new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(price.ts)),
        timestamp: new Date(price.ts).getTime(),
        price: value,
      };
    })
    .filter((item): item is PriceChartPoint => item !== null)
    .sort((a, b) => a.timestamp - b.timestamp);
}