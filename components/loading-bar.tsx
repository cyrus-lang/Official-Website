"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { LoadingBarContainer, useLoadingBar } from "react-top-loading-bar";
import { isRouteReady, subscribeRouteReady } from "@/lib/route-ready";
import { Motion } from "./motion";

export default function AppLoadingWrapper() {
  const [showLoadingBar, setShowLoadingBar] = useState(false);

  return (
    <LoadingBarContainer props={{ color: "var(--color-primary)", height: 3 }}>
      <InnerApp
        showLoadingBar={showLoadingBar}
        setShowLoadingBar={setShowLoadingBar}
      />
    </LoadingBarContainer>
  );
}

interface InnerAppProps {
  showLoadingBar: boolean;
  setShowLoadingBar: (val: boolean) => void;
}

const MAX_MS = 8000;

function InnerApp({ showLoadingBar, setShowLoadingBar }: InnerAppProps) {
  const { start, complete } = useLoadingBar();
  const pathname = usePathname();
  const firstLoad = useRef(true);

  const startRef = useRef(start);
  const completeRef = useRef(complete);
  useEffect(() => {
    startRef.current = start;
    completeRef.current = complete;
  });

  // Handle initial splash timing
  useEffect(() => {
    const splashTotalTime = 2000 + 500;
    const timeout = setTimeout(() => {
      setShowLoadingBar(true);
      firstLoad.current = false;
    }, splashTotalTime);

    return () => clearTimeout(timeout);
  }, [setShowLoadingBar]);

  useEffect(() => {
    if (!showLoadingBar) return;
    if (firstLoad.current) return;

    if (isRouteReady(pathname)) return;

    startRef.current();

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(maxTimer);
      unsubscribe();
      completeRef.current();
    };

    const unsubscribe = subscribeRouteReady(() => {
      if (isRouteReady(pathname)) finish();
    });
    const maxTimer = setTimeout(finish, MAX_MS);

    return () => {
      clearTimeout(maxTimer);
      unsubscribe();
    };
  }, [pathname, showLoadingBar]);

  return (
    <Motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    />
  );
}
