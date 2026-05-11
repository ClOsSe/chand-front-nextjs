"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Locale } from "@/config/i18n";
import type { PriceList } from "@/types/price";
import { toPriceChartData } from "@/lib/price/chart-data";

type Props = {
  prices: PriceList[];
  locale: Locale;
};

export function FullPriceChart({ prices, locale }: Props) {
  const data = toPriceChartData(prices);

  if (data.length < 2) {
    return null;
  }

  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US");

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            stroke="currentColor"
            strokeOpacity={0.08}
            vertical={false}
          />

          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            minTickGap={30}
            tick={{
              fontSize: 12,
            }}
          />

          <YAxis
            domain={["dataMin", "dataMax"]}
            tickFormatter={(value) => formatter.format(value)}
            tickLine={false}
            axisLine={false}
            width={80}
            tick={{
              fontSize: 12,
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "none",
              background: "var(--background)",
              color: "var(--foreground)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
            formatter={(value) => {
              if (typeof value !== "number") {
                return "";
              }

              return formatter.format(value);
            }}
            labelFormatter={(label) =>
              locale === "fa" ? `زمان: ${label}` : `Time: ${label}`
            }
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="currentColor"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
            }}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
