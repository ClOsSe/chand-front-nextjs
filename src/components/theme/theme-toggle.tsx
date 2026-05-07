"use client";

import { ToggleRight } from "lucide-react";
import { ToggleLeft } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button size="sm" type="button" variant="ghost" onClick={toggleTheme}>
      <span>{theme === "dark" ? t("light") : t("dark")}</span>
      {theme === "dark" ? (
        <ToggleRight className="mx-2" />
      ) : (
        <ToggleLeft className="mx-2" />
      )}
    </Button>
  );
}
