import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";
import { getDocsNavigation } from "./collector";
import { DocNavItem } from '@/app/types/doc_nav_item';
import ClientSidebarWrapper from '../../components/docs/client_sidebar_wrapper';

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationItems: DocNavItem[] = await getDocsNavigation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <SidebarProvider>
        <div className="flex flex-col md:flex-row md:overflow-hidden flex-1">
          <div className="w-full flex-none md:w-64">
            <ClientSidebarWrapper navigationItems={navigationItems} />
          </div>

          <div className="flex-grow pt-24 md:pt-12 pb-6 px-6 md:px-12 md:overflow-y-auto">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
