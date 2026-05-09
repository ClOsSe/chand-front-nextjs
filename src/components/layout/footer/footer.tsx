import { getTranslations } from "next-intl/server";
import { CountrySelector } from "./country-selector";
import { Menu } from "./menu/menu";

export default async function Footer() {
  const t = await getTranslations("common");

  return (
    <footer className="mt-auto flex justify-center items-center w-full fixed bottom-2.5 bg-(--background)">
      <div className="mx-auto flex h-12 w-3/4 items-center justify-between px-4 border-2 border-slate-200 rounded-2xl">
        <Menu />

        <div className="flex items-center gap-2">{t("status")}</div>

        <CountrySelector />
      </div>
    </footer>
  );
}
