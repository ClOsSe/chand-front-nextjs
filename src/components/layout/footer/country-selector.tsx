"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

const countries = [
  { name: "US Dollar", flag: "🇺🇸" },
  { name: "Euro", flag: "🇪🇺" },
  { name: "British Pound", flag: "🇬🇧" },
  { name: "Swiss Franc", flag: "🇨🇭" },
  { name: "Canadian Dollar", flag: "🇨🇦" },
  { name: "Japanese Yen", flag: "🇯🇵" },
  { name: "Turkish Lira", flag: "🇹🇷" },
];

export function CountrySelector() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {open && (
        <div className="absolute bottom-12 left-0 max-h-100 w-64 overflow-y-auto rounded-xl py-2 shadow-xl bg-slate-900">
          {countries.map((item) => (
            <button
              key={item.name}
              type="button"
              className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-slate-100"
            >
              <span>{item.name}</span>
              <span className="text-xl">{item.flag}</span>
            </button>
          ))}
        </div>
      )}

      <Button
        size="sm"
        type="button"
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
}
