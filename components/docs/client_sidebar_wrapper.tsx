'use client';

import { usePathname } from '@/i18n/navigation';
import MobileSidebar from './mobile/mobile_sidebar';
import { Sidebar } from './sidebar';
import { DocNavItem } from '@/app/types/doc_nav_item';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ClientSideMobileSidebarWrapperProps {
    navigationItems: DocNavItem[];
}

export default function ClientSidebarWrapper({ navigationItems }: ClientSideMobileSidebarWrapperProps) {
    const pathname = usePathname();

    return (
        <>
            {pathname.startsWith("/docs") && <MobileSidebar navigationItems={navigationItems} />}

            <div className="[&::-webkit-scrollbar]:[width:20px] [&::-webkit-scrollbar-thumb]:bg-gray-400 overflow-y-auto [&::-webkit-scrollbar-thumb]:[border-radius:3px] pb-20 max-h-[100svh] min-h-[100svh]">

                <Sidebar navigationItems={navigationItems} />
            </div>
        </>
    );
}