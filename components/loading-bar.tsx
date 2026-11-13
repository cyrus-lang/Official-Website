"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { LoadingBarContainer, useLoadingBar } from "react-top-loading-bar";

export default function AppLoadingWrapper() {
  return (
    <LoadingBarContainer props={{ color: "var(--color-primary)", height: 3 }}>
      <InnerApp />
    </LoadingBarContainer>
  );
}

function InnerApp() {
  const { start, complete } = useLoadingBar();
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    start();
    const timeout = setTimeout(() => complete(), 300);
    return () => clearTimeout(timeout);
  }, [pathname, start, complete]);

  return null;
}
