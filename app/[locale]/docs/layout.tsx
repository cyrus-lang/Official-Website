import type React from "react";
import Header from "@/components/header";
import { getLocale } from "next-intl/server";
import { getDocsNavigation } from "./collector";
import { DocNavItem } from "@/app/types/doc_nav_item";
import { SidebarProvider } from "@/components/ui/sidebar";
import ClientSidebarWrapper from "@/components/docs/client_sidebar_wrapper";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  const navigationItems: DocNavItem[] = await getDocsNavigation(
    undefined,
    undefined,
    locale
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header className="docs-header" navigationItems={navigationItems}/>

      <SidebarProvider>
        <div className="flex flex-1">
          <div
            className="fixed bottom-0 w-64 xl:w-80 border-r z-10 hidden md:flex flex-col rounded-lg shadow-md"
            style={{ top: "var(--header-height)" }}
          >
            <div className="overflow-y-auto h-full">
              <ClientSidebarWrapper navigationItems={navigationItems} />
            </div>
          </div>

          <div
            className="flex-grow pb-6 overflow-y-auto md:ml-64 xl:ml-80 p-4"
          >
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
