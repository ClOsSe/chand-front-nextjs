import { Link } from "@/i18n/navigation";
export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-(--background) dark:border-zinc-800">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          Now Chand
        </Link>
        <div className="flex items-center gap-2">Date</div>
      </div>
    </header>
  );
}
