"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import type { DonationFrontmatter } from "@/lib/sponsors";
import { cn } from "@/lib/utils";

type DonationRow = { slug: string; metadata: DonationFrontmatter };

export const DonationsTable = ({ donations }: { donations: DonationRow[] }) => {
  const t = useTranslations("Sponsors");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  if (!donations.length) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-start">{t("table.donation")}</TableHead>
          <TableHead className="text-start hidden sm:table-cell">
            {t("table.type")}
          </TableHead>
          <TableHead className="text-start hidden sm:table-cell">
            {t("table.date")}
          </TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {donations.map(({ slug, metadata }) => {
          const isOpen = openSlug === slug;
          const toggle = () => setOpenSlug(isOpen ? null : slug);

          return (
            <Fragment key={slug}>
              <TableRow
                className="cursor-pointer transition-none hover:bg-muted/50"
                onClick={toggle}
              >
                <TableCell className="font-medium">
                  <button
                    type="button"
                    className="text-start"
                    aria-expanded={isOpen}
                    aria-controls={`donation-${slug}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle();
                    }}
                  >
                    {metadata.title}
                  </button>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {t(`kinds.${metadata.kind}`)}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {metadata.date ?? "—"}
                </TableCell>
                <TableCell>
                  <ChevronDown
                    className={cn("h-4 w-4", isOpen && "rotate-180")}
                  />
                </TableCell>
              </TableRow>

              {isOpen && (
                <TableRow id={`donation-${slug}`} className="bg-muted/30">
                  <TableCell colSpan={4}>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-muted-foreground">
                      <dt>{t("table.sponsor")}</dt>
                      <dd className="text-foreground">{metadata.sponsor}</dd>
                      <dt className="sm:hidden">{t("table.type")}</dt>
                      <dd className="sm:hidden text-foreground">
                        {t(`kinds.${metadata.kind}`)}
                      </dd>
                      {metadata.value && (
                        <>
                          <dt>{t("table.value")}</dt>
                          <dd className="text-foreground">{metadata.value}</dd>
                        </>
                      )}
                      {metadata.date && (
                        <>
                          <dt className="sm:hidden">{t("table.date")}</dt>
                          <dd className="sm:hidden text-foreground">
                            {metadata.date}
                          </dd>
                        </>
                      )}
                    </dl>
                    {metadata.summary && <p className="mt-3">{metadata.summary}</p>}
                    <Link
                      href={`/sponsors/${slug}`}
                      className="mt-3 inline-block text-primary hover:underline"
                    >
                      {t("viewDetails")}
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};
