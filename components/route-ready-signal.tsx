"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { markRouteReady } from "@/lib/route-ready";

export function RouteReadySignal() {
  const pathname = usePathname();

  useEffect(() => {
    markRouteReady(pathname);
  }, [pathname]);

  return null;
}
