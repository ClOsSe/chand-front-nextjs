import { CalendarType } from "@/types/settings";
import type { LucideIcon } from "lucide-react";

export type Theme = "dark" | "light";

export type MenuActionContext = {
  locale: string;
  theme: Theme;
  calendarType: CalendarType;
  changeLocale: (locale: "fa" | "en") => void;
  setThemeMode: (theme: Theme) => void;
  setCalendarType: (type: CalendarType) => void;
  logoutUser: () => void;
};

export type MenuItem = {
  label: string;
  icon?: LucideIcon;
  href?: string;
  children?: MenuItem[];
  onClick?: (ctx: MenuActionContext) => void;
  isActive?: (ctx: MenuActionContext) => boolean;
};
