import {
  Sun,
  Moon,
  Globe,
  Languages,
  Eye,
  Columns2,
  Rows4,
  Palette,
  Brush,
  BanknoteArrowDown,
  EyeOff,
  EyeIcon,
  Calendar,
  CalendarRange,
  Send,
  SendIcon,
  CameraIcon,
  Aperture,
  ExternalLink,
} from "lucide-react";
import type { MenuItem } from "./menu.types";

export const menuItems: MenuItem[] = [
  {
    label: "theme",
    icon: Sun,
    children: [
      {
        label: "dark",
        icon: Moon,
        onClick: ({ setThemeMode }) => setThemeMode("dark"),
        isActive: ({ theme }) => theme === "dark",
      },
      {
        label: "light",
        icon: Sun,
        onClick: ({ setThemeMode }) => setThemeMode("light"),
        isActive: ({ theme }) => theme === "light",
      },
    ],
  },
  {
    label: "language",
    icon: Globe,
    children: [
      {
        label: "persian",
        icon: Languages,
        onClick: ({ changeLocale }) => changeLocale("fa"),
        isActive: ({ locale }) => locale === "fa",
      },
      {
        label: "english",
        icon: Languages,
        onClick: ({ changeLocale }) => changeLocale("en"),
        isActive: ({ locale }) => locale === "en",
      },
    ],
  },
  {
    label: "viewModel",
    icon: Eye,
    children: [
      { label: "cardView", icon: Columns2 },
      { label: "listView", icon: Rows4 },
    ],
  },
  {
    label: "priceChangeColor",
    icon: Palette,
    children: [
      { label: "redGreen", icon: Brush },
      { label: "greenRed", icon: Brush },
    ],
  },
  {
    label: "buyPrice",
    icon: BanknoteArrowDown,
    children: [
      { label: "hidden", icon: EyeOff },
      { label: "showIfAvailable", icon: EyeIcon },
    ],
  },
  {
    label: "calender",
    icon: Calendar,
    children: [
      { 
        label: "persian",
        icon: CalendarRange,
        onClick: ({ setCalendarType }) => setCalendarType("jalali"),
        isActive: ({ calendarType }) => calendarType === "jalali",
      },
      { 
        label: "georgian",
        icon: CalendarRange,
        onClick: ({ setCalendarType }) => setCalendarType("gregorian"),
        isActive: ({ calendarType }) => calendarType === "gregorian", 
      },
    ],
  },
  {
    label: "socialMedia",
    icon: Send,
    children: [
      { label: "telegram", icon: SendIcon },
      { label: "instagram", icon: CameraIcon },
      { label: "youtube", icon: Aperture },
    ],
  },
  {
    label: "website",
    icon: ExternalLink,
    href: "https://webinaexpert.com",
  },
];