"use client";

import { Area, AreaChart, Line, ResponsiveContainer, YAxis } from "recharts";

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

  const gradientId = "priceGradient";

  return (
    <div className="h-12 w-full min-w-0">
      <ResponsiveContainer width="100%" height={48}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.25} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <YAxis domain={["dataMin", "dataMax"]} hide />

          <Area
            type="monotone"
            dataKey="price"
            stroke="none"
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="currentColor"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
