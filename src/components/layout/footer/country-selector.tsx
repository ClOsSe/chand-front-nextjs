"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

export function CountrySelector() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {open && <></>}

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
