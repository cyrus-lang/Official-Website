"use client";
import MobileSidebar from "@/components/docs/mobile/MobileSidebar";
import { Sidebar } from "@/components/docs/sidebar";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import type React from "react";

export default function SupportUsLayout({
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
