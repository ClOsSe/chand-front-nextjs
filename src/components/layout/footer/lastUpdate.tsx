"use client";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { tokensQueryOptions } from "@/services/price.queries";
import type { Locale } from "@/config/i18n";
import { formatTimeAgo } from "@/lib/date/time";
import { useEffect, useState } from "react";

export default function LastUpdate() {
  const locale = useLocale() as Locale;
  const { dataUpdatedAt, isSuccess } = useQuery(tokensQueryOptions);
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((tick) => tick + 1);
    }, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  if (!isSuccess || !dataUpdatedAt) {
    return null;
  }
  return (
    <div className="flex items-center gap-2 text-sm text-(--tab-inactive-fg)">
      <span>{formatTimeAgo(dataUpdatedAt, locale)}</span>
    </div>
  );
}
