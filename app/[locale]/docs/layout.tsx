import type React from "react";
import Header from "@/components/header";
import { getLocale } from "next-intl/server";
import { getDocsNavigation } from "./collector";
import { DocNavItem } from "@/app/types/doc_nav_item";
import { SidebarProvider } from "@/components/ui/sidebar";
import ClientSidebarWrapper from "@/components/docs/client_sidebar_wrapper";
import { useLocaleInfo, isLocaleRTL } from "@/hooks/use-locale";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const isRTL = isLocaleRTL(locale);

  const navigationItems: DocNavItem[] = await getDocsNavigation(
    undefined,
    undefined,
    locale
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header className="docs-header" navigationItems={navigationItems} />

      <SidebarProvider>
        <div className="flex flex-1 rtl">
          <div
            className={`fixed bottom-0 w-64 xl:w-80 border-r z-10 hidden md:flex flex-col rounded-lg shadow-md ${isRTL ? "right-0" : "left-0"
              }`}
            style={{ top: "var(--header-height)" }}
          >
            <div className="overflow-y-auto h-full">
              <ClientSidebarWrapper navigationItems={navigationItems} />
            </div>
          </div>

          <div className="relative flex-grow pb-6 overflow-y-auto md:ml-64 xl:ml-80 p-4">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
