import type { LucideIcon } from "lucide-react";

export type Theme = "dark" | "light";

export type MenuActionContext = {
  locale:string;
  theme:Theme;
  changeLocale:( locale: "fa" | "en" ) => void;
  setThemeMode:( theme:Theme ) => void;
};

export type MenuItem = {
  label:string;
  icon?:LucideIcon;
  href?:string;
  children?:MenuItem[];
  onClick?:( ctx: MenuActionContext ) => void;
  isActive?:( ctx: MenuActionContext ) => void;
}