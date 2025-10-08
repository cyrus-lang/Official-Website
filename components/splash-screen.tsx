"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, ReactNode } from "react";

interface SplashScreenProps {
  logo: ReactNode;
  duration?: number; // ms for progress bar
  fadeOutDuration?: number; // ms for fade-out
}

export default function SplashScreen({
  logo,
  duration = 2000,
  fadeOutDuration = 500,
}: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage >= 100) {
        clearInterval(interval);
        setFadeOut(true);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center transition-opacity z-999999! bg-background",
        fadeOut
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto splash-screen",
        `[transition-duration:${fadeOutDuration}ms]`
      )}
    >
      <div className="mb-4">{logo}</div>
      <div className="w-32 h-1 bg-gray-400 rounded overflow-hidden">
        <div
          className="h-full bg-gray-100 transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
