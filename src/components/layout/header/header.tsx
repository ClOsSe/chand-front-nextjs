import { Link } from "@/i18n/navigation";
import { Calendar } from "./calendar";
export default function Header() {
  return (
    <header className="border-b border-slate-300  bg-(--background) ">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          Now Chand
        </Link>
        <div className="flex items-center gap-2">
          <Calendar />
        </div>
      </div>
    </header>
  );
}
