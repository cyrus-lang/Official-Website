"use client";

import { useEffect, useState } from "react";

export function useScrolledPastHero(sentinelId: string) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) {
      setPastHero(true);
      return;
    }

    const headerHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ),
        10,
      ) || 0;
      
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: `-${headerHeight}px 0px 200px 0px` },
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [sentinelId]);

  return pastHero;
}
