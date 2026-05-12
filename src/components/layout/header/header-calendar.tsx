"use client";

import dynamic from "next/dynamic";

const Calendar = dynamic(
  () => import("./calendar").then((mod) => mod.Calendar),
  {
    ssr: false,
    loading: () => <span className="text-sm text-(--foreground)">—</span>,
  },
);

export function HeaderCalendar() {
  return <Calendar />;
}
