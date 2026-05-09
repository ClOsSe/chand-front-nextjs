import { Link } from "@/i18n/navigation";
import { Calendar } from "./calendar";
import { getTranslations } from "next-intl/server";
export default async function Header() {
  const t = await getTranslations("common");
  return (
    <header className="border-b border-slate-300  bg-(--background) ">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold" dir="ltr">
          {t("title")}
        </Link>
        <div className="flex items-center gap-2">
          <Calendar />
        </div>
      </div>
    </header>
  );
}
