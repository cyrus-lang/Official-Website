'use client';

import { usePathname } from 'next/navigation';
import MobileSidebar from './mobile/mobile_sidebar';
import { Sidebar } from './sidebar';
import { DocNavItem } from '@/app/types/doc_nav_item';

interface ClientSideMobileSidebarWrapperProps {
    navigationItems: DocNavItem[];
}

export default function ClientSidebarWrapper({ navigationItems }: ClientSideMobileSidebarWrapperProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Show MobileSidebar on /docs and all nested routes */}
            {pathname.startsWith("/docs") && <MobileSidebar navigationItems={navigationItems} />}
            <div className="w-full flex-none md:w-64">
                {/* Pass navigationItems to Sidebar */}
                <Sidebar navigationItems={navigationItems} />
            </div>
        </>
    );
}