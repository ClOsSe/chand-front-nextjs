"use client";

import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

import type { PriceList } from "@/types/price";
import { toPriceChartData } from "@/lib/price/chart-data";

type Props = {
  prices: PriceList[];
};

export function MiniPriceChart({ prices }: Props) {
  const data = toPriceChartData(prices);

  if (data.length < 2) {
    return null;
  }

  return (
    <div className="h-12 w-full  min-w-0">
      <ResponsiveContainer width="100%" height={48}>
        <LineChart data={data}>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Line
            type="monotone"
            dataKey="price"
            stroke="currentColor"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
