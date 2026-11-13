import { MOCK_PACKAGES_INTERFACE } from "@/content/packages";
import { Box, Clock, Download } from "lucide-react";
import Link from "next/link";

interface PackagesCardProps {
  locale: "fa" | "en";
  package: MOCK_PACKAGES_INTERFACE;
}

export const PackagesCard = ({
  locale,
  package: pkg,
}: PackagesCardProps) => {
  return (
    <Link href={`/${locale}/packages/${pkg.name}`} className="block h-full">
      <div className="bg-background rounded-xl p-6 sm:p-7 shadow-xs border flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group relative overflow-hidden h-full">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Box className="h-6 w-6" />
            </div>
            <span className="rounded-md border border-border/60 bg-muted/60 px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
              {pkg.version}
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors">
            {pkg.name}
          </h3>

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-2 mb-6">
            {pkg.description}
          </p>
        </div>

        <div className="pt-4 border-t border-border/60 mt-auto flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" />
            <span>{pkg.downloads}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{pkg.updated}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
