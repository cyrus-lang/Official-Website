import { DocNavItem } from "@/types/doc-nav-item";
import { Sidebar } from "./sidebar";
import MobileSidebar from "./mobile-sidebar";

interface ClientSideMobileSidebarWrapperProps {
  navigationItems: DocNavItem[];
  pathname: string;
}

export default function ClientSidebarWrapper({
  navigationItems,
  pathname,
}: ClientSideMobileSidebarWrapperProps) {
  console.log("in csw:", pathname);
  return (
    <>
      {pathname.startsWith("/docs") && (
        <MobileSidebar pathname={pathname} navigationItems={navigationItems} />
      )}

      <div className="[&::-webkit-scrollbar]:[width:6px] dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600/45 [&::-webkit-scrollbar-thumb]:bg-neutral-300/60 overflow-y-auto [&::-webkit-scrollbar-thumb]:[border-radius:3px] min-h-[100svh] max-h-[100svh] pb-14">
        <Sidebar pathname={pathname} navigationItems={navigationItems} />
      </div>
    </>
  );
}
