"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const PackagesSearchInput = ({ isRtl }: { isRtl: boolean }) => {
  const t = useTranslations("Packages");
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(params.get("query") || "");

  useEffect(() => {
    const currentQuery = params.get("query") || "";
    if (value === currentQuery) return;

    const timeout = setTimeout(() => {
      const sp = new URLSearchParams(params.toString());

      if (value) sp.set("query", value);
      else sp.delete("query");

      const nextQuery = sp.toString();
      router.push(nextQuery ? `?${nextQuery}` : "?");
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, params, router]);

  return (
    <div className="relative w-full max-w-xl mt-8">
      <Search
        className={`pointer-events-none absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4`}
      />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className={`h-11 ${isRtl ? "pr-10 pl-10" : "pl-10 pr-10"} rounded-lg bg-background border border-input shadow-xs`}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className={`absolute ${isRtl ? "left-3.5" : "right-3.5"} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
