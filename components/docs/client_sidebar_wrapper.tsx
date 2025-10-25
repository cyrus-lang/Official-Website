"use client";

import { DocNavItem } from "@/app/types/doc_nav_item";
import { usePathname } from "@/i18n/navigation";
import MobileSidebar from "./mobile/mobile_sidebar";
import { Sidebar } from "./sidebar";

interface ClientSideMobileSidebarWrapperProps {
  navigationItems: DocNavItem[];
}

export default function ClientSidebarWrapper({
  navigationItems,
}: ClientSideMobileSidebarWrapperProps) {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith("/docs") && (
        <MobileSidebar navigationItems={navigationItems} />
      )}

      <div className="[&::-webkit-scrollbar]:[width:6px] dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600/45 [&::-webkit-scrollbar-thumb]:bg-neutral-300/60 overflow-y-auto [&::-webkit-scrollbar-thumb]:[border-radius:3px] min-h-[100svh] max-h-[100svh] pb-14">
        <Sidebar navigationItems={navigationItems} />
      </div>
    </>
  );
}
