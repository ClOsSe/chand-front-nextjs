import { CalendarType } from "@/types/settings";
import type { LucideIcon } from "lucide-react";

export type Theme = "dark" | "light";

export type MenuActionContext = {
  locale: string;
  theme: Theme;
  calendarType: CalendarType;
  viewModel: "cardView" | "listView";
  changeLocale: (locale: "fa" | "en") => void;
  setThemeMode: (theme: Theme) => void;
  setCalendarType: (type: CalendarType) => void;
  logoutUser: () => void;
  changeViewModel:(viewModel:"cardView" | "listView") => void
};

export type MenuItem = {
  label: string;
  icon?: LucideIcon;
  href?: string;
  children?: MenuItem[];
  onClick?: (ctx: MenuActionContext) => void;
  isActive?: (ctx: MenuActionContext) => boolean;
};
