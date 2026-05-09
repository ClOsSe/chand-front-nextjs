import type { LucideIcon } from "lucide-react";
import type { MenuItem } from "./menu.types";

type Props = {
  item: MenuItem;
  t: (key: string) => string;
  isActive: boolean;
  ArrowIcon: LucideIcon;
  onClick: () => void;
};

export function MenuRow({ item, t, isActive, ArrowIcon, onClick }: Props) {
  const Icon = item.icon;
  const hasChildren = Boolean(item.children?.length);

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center justify-between border-b border-(--menu-border) px-4 py-3 text-xs sm:text-sm transition hover:cursor-pointer ",
        isActive
          ? "bg-(--tab-active-bg) text-(--tab-active-fg)"
          : "bg-(--tab-inactive-bg) text-(--tab-inactive-fg)",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        {hasChildren && <ArrowIcon className="h-4 w-4" />}
        <span>{t(item.label)}</span>
      </div>

      {Icon && <Icon className="h-4 w-4" />}
    </button>
  );
}
