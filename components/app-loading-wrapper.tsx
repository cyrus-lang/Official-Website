"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import { LoadingBarContainer, useLoadingBar } from "react-top-loading-bar";
import ClientSplashWrapper from "./splash-screen-client-wrapper"; 
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

interface AppLoadingWrapperProps {
  children: ReactNode;
}

export default function AppLoadingWrapper({ children }: AppLoadingWrapperProps) {
  const [showLoadingBar, setShowLoadingBar] = useState(false);

  return (
    <LoadingBarContainer props={{ color: "var(--color-primary)", height: 3 }}>
      <InnerApp showLoadingBar={showLoadingBar} setShowLoadingBar={setShowLoadingBar}>
        {children}
      </InnerApp>
    </LoadingBarContainer>
  );
}

interface InnerAppProps {
  children: ReactNode;
  showLoadingBar: boolean;
  setShowLoadingBar: (val: boolean) => void;
}

function InnerApp({ children, showLoadingBar, setShowLoadingBar }: InnerAppProps) {
  const { start, complete } = useLoadingBar();
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    return () => {
      AOS.refresh();
    };
  }, []);

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
    start();
    const timeout = setTimeout(() => complete(), 500);
    return () => clearTimeout(timeout);
  }, [pathname, showLoadingBar, start, complete]);

  return <ClientSplashWrapper>{children}</ClientSplashWrapper>;
}
