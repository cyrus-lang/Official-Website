import { getLocale } from "next-intl/server";
import { getDocsNavigation } from "./get-docs-nav";

export const getBreadcrumbTitle = async (pathname: string) => {
  const [, , groupSlug, slug] = pathname.split("/");
  const locale = await getLocale();
  const docsNavigations = await getDocsNavigation(undefined, undefined, locale);
  const docsNavigation = docsNavigations.find(
    (item) => item.slug === groupSlug
  );
  const title =
    docsNavigation?.children?.find(
      (item) => item.slug === `${groupSlug}/${slug}`
    )?.title || "";
  return { title, navigationItems: docsNavigations };
};
