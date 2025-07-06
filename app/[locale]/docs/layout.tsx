import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";
import { getDocsNavigation } from "./collector";
import { DocNavItem } from "@/app/types/doc_nav_item";
import ClientSidebarWrapper from "@/components/docs/client_sidebar_wrapper";
import { HEADER_HEIGHT } from "@/components/header";
import { getTranslations, getLocale } from "next-intl/server";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("DocsNavigation");
  const locale = await getLocale();

  const navigationItems: DocNavItem[] = await getDocsNavigation(
    undefined,
    undefined,
    locale
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <SidebarProvider>
        <div className="flex flex-col md:flex-row md:overflow-hidden flex-1">
          <div
            className={"w-full hidden md:flex flex-none md:w-64 xl:w-80 border-l border-r"}
            style={{ height: `calc(100vh - 1px - ${HEADER_HEIGHT})` }}
          >
            <ClientSidebarWrapper navigationItems={navigationItems} />
          </div>

          <div className="flex-grow pb-6 overflow-y-auto">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}