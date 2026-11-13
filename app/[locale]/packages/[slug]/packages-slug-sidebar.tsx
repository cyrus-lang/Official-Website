import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOCK_PACKAGES_INTERFACE } from "@/content/packages";
import { cn } from "@/lib/utils";
import { Translation } from "@/types/translation";
import { ExternalLink } from "lucide-react";
import { PackageSlugInstall } from "./packages-slug-install";

export function PackageSidebar({
  pkg,
  t,
  isRtl,
}: {
  pkg: MOCK_PACKAGES_INTERFACE;
  t: Translation;
  isRtl: boolean;
}) {
  return (
    <aside className="space-y-6">
      <Card className="rounded-xl border bg-background shadow-xs p-6">
        <h3 className="font-semibold mb-4 text-base tracking-tight text-foreground">
          {isRtl ? "جزئیات" : "Details"}
        </h3>

        <div className="space-y-3.5 text-sm">
          <Row label={t("stats.version")} value={`v${pkg.version}`} mono />
          <Row label={t("stats.license")} value={pkg.license} />
          <Row label={t("stats.downloads")} value={pkg.downloads} />
          <Row
            label={t("stats.author")}
            value={pkg.author}
            highlight
            borderBottom={false}
          />
        </div>

        {pkg.dependencies.length > 0 && (
          <div className="mt-6 pt-5 border-t border-border/60">
            <h4 className="font-medium mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              {t("dependencies")}
            </h4>

            <div className="flex flex-wrap gap-2">
              {pkg.dependencies.map((dep) => (
                <Badge
                  key={dep}
                  variant="outline"
                  className="rounded-md px-2.5 py-0.5 font-mono text-xs"
                >
                  {dep}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      <PackageSlugInstall name={pkg.name} isRtl={isRtl} />

      <Button className="w-full h-11 rounded-lg text-sm font-semibold gap-2">
        {t("documentation")} <ExternalLink size={16} />
      </Button>
    </aside>
  );
}

function Row({
  label,
  value,
  highlight,
  mono,
  borderBottom = true,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
  mono?: boolean;
  borderBottom?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-between items-center border-border/40 pb-2.5",
        borderBottom && "border-b"
      )}
    >
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-medium",
          mono && "font-mono text-xs",
          highlight && "text-primary"
        )}
      >
        {value}
      </span>
    </div>
  );
}
