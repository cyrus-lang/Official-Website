"use client";
import Header from "@/components/header";
import { usePathname } from "@/i18n/navigation";
import type React from "react";

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {children}
    </div>
  );
}
