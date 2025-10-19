import ClientSidebarWrapper from "@/components/docs/client_sidebar_wrapper";
import Layout from "@/components/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { isLocaleRTL } from "@/hooks/use-locale";
import { getBreadcrumbTitle } from "@/lib/get-breadcrumb-title";
import { cn } from "@/lib/utils";
import { getLocale } from "next-intl/server";
import type React from "react";

export default async function DocsLayout({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode;
  params: { slug?: string[] };
  searchParams?: { locale?: string };
}) {
  const locale = await getLocale();
  const isRTL = isLocaleRTL(locale);

  const slug = params.slug ?? [];
  const pathname = "/docs/" + slug.join("/");

  const { navigationItems } = await getBreadcrumbTitle(pathname);

  return (
    <Layout
      className="flex flex-col min-h-screen"
      header={{ className: "docs-header", pathname }}
    >
      <SidebarProvider>
        <div className="flex flex-1 rtl">
          <div
            className={cn(
              "fixed top-0 w-64 xl:w-80 border-r z-10 hidden md:flex flex-col",
              isRTL ? "right-0" : "left-0"
            )}
            style={{ top: "var(--header-height)" }}
          >
            <div className="overflow-y-auto h-full">
              <ClientSidebarWrapper
                pathname={pathname}
                navigationItems={navigationItems}
              />
            </div>
          </div>
        </div>
      </SidebarProvider>

      <div
        className={cn(
          `relative grow pb-6 overflow-y-auto p-4`,
          isRTL ? "md:mr-64 xl:mr-80" : "md:ml-64 xl:ml-80"
        )}
      >
        {children}
      </div>
    </Layout>
  );
}
