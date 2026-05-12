"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
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

  const gradientId = "fullPriceGradient";

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.25} />

              <stop offset="100%" stopColor="currentColor" stopOpacity={0.02} />
            </linearGradient>
          </defs>

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
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
            }}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
