"use client";

import { Logo } from "@/components/header";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import { SidebarMenuList } from "./SidebarMenuList";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  // Pass the onItemClick prop to SidebarMenuList
  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="flex items-center w-full px-4 py-2 md:hidden bg-background text-foreground shadow-sm transition-colors">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="p-2 rounded-md hover:bg-muted active:bg-secondary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-[80vw] max-w-xs h-full flex flex-col"
        >
          {/* Header: Logo on the left, close (X) button on the right */}
          <div className="flex items-center justify-between px-3 h-14">
            <Link href="/" className="flex items-center gap-2 pl-1 pr-8">
              <Logo />
              <span className="text-md font-bold">Cyrus</span>
            </Link>
            <SheetTrigger asChild>
              <button
                className="rounded-md p-2 hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </SheetTrigger>
          </div>
          {/* Navigation menu list rendered below the header */}
          <div className="flex-1 overflow-y-auto">
            <SidebarMenuList onItemClick={handleClose} />
          </div>
        </SheetContent>
      </Sheet>
      {/* Breadcrumb section in the center */}
      <div className="flex-1 flex">
        <nav className="flex items-center space-x-1 rtl:space-x-reverse">
          <Breadcrumb />
        </nav>
      </div>
    </div>
  );
}
