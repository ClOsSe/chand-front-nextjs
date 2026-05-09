"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui";
import { getTokenIcon } from "@/lib/price/token-icon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSelectedToken } from "@/store/slices/settings.slice";
import { getTokenKey } from "@/lib/price/token-key";
import { tokensQueryOptions } from "@/services/price.queries";

export function CountrySelector() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const selectedTokenKeys = useAppSelector(
    (state) => state.settings.selectedTokenKeys,
  );
  const { data: tokens, error, isPending } = useQuery(tokensQueryOptions);
  const tokenList = tokens ?? [];
  const isRtl = locale === "fa";

  return (
    <div className="relative">
      {open && (
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className={[
            "absolute bottom-12 max-h-96 w-72 overflow-y-auto rounded-xl bg-(--menu-bg) py-2 text-(--menu-fg) shadow-xl ring-1 ring-(--menu-border)",
            isRtl ? "left-0" : "right-0",
          ].join(" ")}
        >
          {isPending && (
            <div className="px-4 py-3 text-sm text-(--tab-inactive-fg)">
              {t("loadingFailed")}
            </div>
          )}

          {error && (
            <div className="px-4 py-3 text-sm text-red-500">{t("loading")}</div>
          )}

          {!isPending &&
            !error &&
            tokenList.map((token) => {
              const tokenKey = getTokenKey(token);
              const isSelected = selectedTokenKeys.includes(tokenKey);
              const tokenIcon = getTokenIcon(token);

              return (
                <button
                  key={tokenKey}
                  type="button"
                  className="flex w-full items-center justify-between gap-3 border-b border-(--menu-border) px-4 py-3 text-sm transition hover:bg-(--tab-active-bg)"
                  onClick={() => dispatch(toggleSelectedToken(tokenKey))}
                >
                  <span className="flex min-w-0 items-center gap-3 text-start">
                    <span
                      aria-label={tokenIcon.label}
                      title={tokenIcon.label}
                      className="block h-7 w-7 shrink-0 rounded-full bg-white bg-cover bg-center bg-no-repeat ring-1 ring-(--border)"
                      style={{ backgroundImage: `url("${tokenIcon.src}")` }}
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {locale === "fa" ? token.fa : token.en}
                      </span>
                      <span className="block truncate text-xs text-(--tab-inactive-fg)">
                        {token.ab} - {token.ty}
                      </span>
                    </span>
                  </span>

                  <span className="grid h-5 w-5 place-items-center rounded-full border border-(--menu-border)">
                    {isSelected && <Check className="h-4 w-4 text-green-500" />}
                  </span>
                </button>
              );
            })}
        </div>
      )}

      <Button
        size="sm"
        type="button"
        variant="ghost"
        name="load counrty list"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Plus className="h-5 w-5" />
        {selectedTokenKeys.length > 0 && (
          <span className="ms-1 text-xs">{selectedTokenKeys.length}</span>
        )}
      </Button>
    </div>
  );
}
