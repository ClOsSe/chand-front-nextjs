"use client";

import { useState } from "react";
import { MoreHorizontal, ChevronRight, ChevronLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui";

import { menuItems } from "./menu.items";
import type { MenuActionContext, MenuItem, Theme } from "./menu.types";
import { MenuRow } from "./menu-row";
import { SubMenu } from "./submenu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCalendarType } from "@/store/slices/settings.slice";
import { useMutation } from "@tanstack/react-query";
import { logoutMutationOptions } from "@/services/auth/auth.queries";

export function Menu() {
  const dispatch = useAppDispatch();
  const t = useTranslations("menu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const isRtl = locale === "fa";
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const currentTheme: Theme = resolvedTheme === "dark" ? "dark" : "light";

  const calendarType = useAppSelector((state) => state.settings.calendarType);

  const logoutMutation = useMutation({
    ...logoutMutationOptions,
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("[login]", error);
    },
  });

  const handleCalendarTypeChange = (type: "jalali" | "gregorian") => {
    dispatch(setCalendarType(type));
  };

  const ctx: MenuActionContext = {
    locale,
    theme: currentTheme,
    changeLocale: (newLocale) => {
      router.replace(pathname, { locale: newLocale });
    },
    setThemeMode: setTheme,
    calendarType,
    setCalendarType: handleCalendarTypeChange,
    logoutUser: () => logoutMutation.mutate(),
  };

  return (
    <div className="relative">
      {open && (
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className={[
            "absolute bottom-12 w-60 overflow-visible rounded-xl bg-(--menu-bg) text-(--menu-fg) shadow-lg/20 shadow-slate-950",
            isRtl ? "right-0" : "left-0",
          ].join(" ")}
        >
          <div className="rounded-xl">
            {menuItems.map((item: MenuItem) => {
              const hasChildren = Boolean(item.children?.length);
              const isActive = activeSubmenu === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    setActiveSubmenu(hasChildren ? item.label : null)
                  }
                >
                  <MenuRow
                    item={item}
                    t={t}
                    isActive={isActive}
                    ArrowIcon={ArrowIcon}
                    onClick={() => {
                      if (hasChildren) {
                        setActiveSubmenu(isActive ? null : item.label);
                        return;
                      }

                      if (item.href) {
                        window.open(item.href, "_blank");
                      }

                      item.onClick?.(ctx);
                    }}
                  />

                  {hasChildren && isActive && (
                    <SubMenu
                      items={item.children!}
                      t={t}
                      ctx={ctx}
                      isRtl={isRtl}
                    />
                  )}
                </div>
              );
            })}

            <div className="border-b border-(--menu-border) px-4 py-3 text-sm">
              Version : 1.0.0
            </div>

            <div className="px-4 py-3 text-center text-sm text-slate-400">
              <h1 className="text-md font-bold uppercase">webinaexpert</h1>
            </div>
          </div>
        </div>
      )}

      <Button
        size="sm"
        type="button"
        variant="ghost"
        name="load menu"
        onClick={() => {
          setOpen((prev) => !prev);
          setActiveSubmenu(null);
        }}
      >
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
}
