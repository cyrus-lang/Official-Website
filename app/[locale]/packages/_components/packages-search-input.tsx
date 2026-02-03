"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const PackagesSearchInput = ({ isRtl }: { isRtl: boolean }) => {
  const t = useTranslations("Packages");
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(params.get("query") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sp = new URLSearchParams(params.toString());

      if (value) sp.set("query", value);
      else sp.delete("query");

      router.push(`?${sp.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative w-full max-w-2xl mt-8">
      <Search
        className={`absolute ${isRtl ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5`}
      />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className={`h-14 ${isRtl ? "pr-12" : "pl-12"} rounded-xl bg-secondary/60 text-lg border-2 dark:border-neutral-700 border-neutral-300 focus-visible:ring-2 focus-visible:ring-primary`}
      />
    </div>
  );
};
