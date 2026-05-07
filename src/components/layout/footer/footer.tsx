import { CalendarType } from "@/types/settings";
import { CountrySelector } from "./country-selector";
import { Menu } from "./menu/menu";

export default function Footer() {
  return (
    <footer className="mt-auto flex justify-center items-center w-full fixed bottom-2.5">
      <div className="mx-auto flex h-12 w-3/4 items-center justify-between px-4 border-2 border-slate-300 rounded-2xl">
        <Menu />

        <div className="flex items-center gap-2">status</div>

        <CountrySelector />
      </div>
    </footer>
  );
}
