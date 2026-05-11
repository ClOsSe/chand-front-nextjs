"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  setCalendarType,
  setPriceColorType,
  setViewModelType,
} from "@/store/slices/settings.slice";
import { useMutation } from "@tanstack/react-query";
import { logoutMutationOptions } from "@/services/auth/auth.queries";
import { CalendarType, PriceColorType, ViewModelType } from "@/types/settings";

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

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setActiveSubmenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentTheme: Theme = resolvedTheme === "dark" ? "dark" : "light";

  const calendarType = useAppSelector((state) => state.settings.calendarType);
  const viewModel = useAppSelector((state) => state.settings.viewModel);
  const priceColor = useAppSelector((state) => state.settings.priceColor);

  const logoutMutation = useMutation({
    ...logoutMutationOptions,
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("[login]", error);
    },
  });

  const handleCalendarTypeChange = (type: CalendarType) => {
    dispatch(setCalendarType(type));
  };
  const changeViewModelType = (type: ViewModelType) => {
    dispatch(setViewModelType(type));
  };
  const changePriceColorType = (type: PriceColorType) => {
    dispatch(setPriceColorType(type));
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
    viewModel,
    changeViewModel: changeViewModelType,
    priceColor,
    changePriceColor: changePriceColorType,
  };

  return (
    <div ref={containerRef} className="relative">
      {open && (
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className={[
            "absolute bottom-12 w-50 sm:w-60 overflow-visible rounded-xl bg-(--menu-bg) text-(--menu-fg) shadow-lg/20 shadow-slate-950",
            isRtl ? "-right-9" : "-left-9",
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
