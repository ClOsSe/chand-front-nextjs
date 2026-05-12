"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { formatDate } from "@/lib/utils/format-date";

export function Calendar() {
  const calendarType = useAppSelector((state) => state.settings.calendarType);

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    localStorage.setItem("SelectedCalendarType", JSON.stringify(calendarType));
  }, [calendarType]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 30_000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="text-sm text-(--foreground)">
      {formatDate(now, calendarType)}
    </span>
  );
}
