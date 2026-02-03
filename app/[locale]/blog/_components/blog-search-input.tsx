"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const BlogSearchInput = ({ isRtl }: { isRtl: boolean }) => {
  const t = useTranslations("Blog");
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
    <div className="relative w-full max-w-sm">
      <Search
        className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground`}
      />

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className={`${isRtl ? "pr-10" : "pl-10"} rounded-xl border-2 bg-secondary/60`}
      />
    </div>
  );
};
