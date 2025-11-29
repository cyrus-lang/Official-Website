import { getMDXComponents } from "@/lib/get-mdx";
import { parseHeadings } from "@/lib/heading-parser";
import { MDXRemote } from "next-mdx-remote/rsc";
import { HeadingTree } from "./heading-tree";
import { getTranslations } from "next-intl/server";

export default async function MDXContent({
  source,
  path,
}: {
  source: string;
  path: string;
}) {
  const components = await getMDXComponents();
  const headings = parseHeadings(source);
  const t = await getTranslations("DocsContent.onThisPage");
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="xl:col-span-9 2xl:col-span-10 lg:col-span-8 col-span-12">
        <MDXRemote source={source} components={components} />

        <div className="mt-8 flex justify-end w-full">
          <a
            className="text-primary text-sm hover:underline"
            href={`https://github.com/cyrus-lang/Official-Website/edit/v2/${path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("editOnGithub")}
          </a>
        </div>
      </div>
      <div className=" xl:col-span-3 2xl:col-span-2 lg:col-span-4 col-span-full max-lg:hidden relative">
        <div className="sticky top-24">
          <p className="text-lg font-semibold mb-3 dark:text-gray-300 text-gray-500">
            {t("title")}
          </p>
          <HeadingTree items={headings} />
        </div>
      </div>
    </div>
  );
}
