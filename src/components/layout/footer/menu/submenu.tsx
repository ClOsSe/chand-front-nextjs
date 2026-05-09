import { Check } from "lucide-react";
import type { MenuActionContext, MenuItem } from "./menu.types";

type Props = {
  items: MenuItem[];
  t: (key: string) => string;
  ctx: MenuActionContext;
  isRtl: boolean;
};

export function SubMenu({ items, t, ctx, isRtl }: Props) {
  return (
    <div
      className={[
        "absolute top-0 w-52 overflow-hidden rounded-lg bg-(--submenu-bg) text-(--submenu-fg) shadow-xl",
        isRtl ? "right-full mr-2" : "left-full ml-2",
      ].join(" ")}
    >
      {items.map((child) => {
        const Icon = child.icon;
        const isActive = child.isActive?.(ctx) ?? false;

        return (
          <button
            key={child.label}
            type="button"
            onClick={() => child.onClick?.(ctx)}
            className={[
              "flex w-full items-center justify-between border-b border-(--menu-border) px-4 py-3 text-sm transition  hover:cursor-pointer ",
              isActive
                ? "bg-(--submenu-active-bg) text-(--submenu-active-fg)"
                : "text-(--tab-inactive-fg)",
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              <span>{t(child.label)}</span>
            </div>

            {isActive && <Check className="h-4 w-4 text-green-400" />}
          </button>
        );
      })}
    </div>
  );
}
