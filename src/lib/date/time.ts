import type { Locale } from "@/config/i18n";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export function formatTimeAgo(timestamp: number, locale: Locale) {
  const now = Date.now();
  const diff = timestamp - now;
  const absDiff = Math.abs(diff);

  const rtf = new Intl.RelativeTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    numeric: "auto",
  });

  if (absDiff < MINUTE) {
    return locale === "fa" ? "لحظاتی پیش" : "moments ago";
  }

  if (absDiff < HOUR) {
    return rtf.format(Math.round(diff / MINUTE), "minute");
  }

  if (absDiff < DAY) {
    return rtf.format(Math.round(diff / HOUR), "hour");
  }

  if (absDiff < WEEK) {
    return rtf.format(Math.round(diff / DAY), "day");
  }

  return rtf.format(Math.round(diff / WEEK), "week");
}