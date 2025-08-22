import { DocNavItem } from "@/app/types/doc_nav_item";
import ClientSidebarWrapper from "@/components/docs/client_sidebar_wrapper";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { isLocaleRTL } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";
import { getLocale } from "next-intl/server";
import type React from "react";
import { getDocsNavigation } from "./collector";

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
            className={`fixed bottom-0 w-64 xl:w-80 border-r z-10 hidden md:flex flex-col rounded-lg shadow-md ${
              isRTL ? "right-0" : "left-0"
            }`}
            style={{ top: "var(--header-height)" }}
          >
            <div className="overflow-y-auto h-full">
              <ClientSidebarWrapper navigationItems={navigationItems} />
            </div>
          </div>

          <div
            className={cn(
              `relative flex-grow pb-6 overflow-y-auto p-4`,
              isRTL ? "md:mr-64 xl:mr-80" : "md:ml-64 xl:ml-80"
            )}
          ></div>
        </div>
      </SidebarProvider>
      {children}
    </div>
  );
}
