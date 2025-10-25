"use client";
import { useEffect } from "react";

export function ScrollToElement() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, []);

  return null;
}
