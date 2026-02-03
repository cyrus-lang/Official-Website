import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOCK_PACKAGES_INTERFACE } from "@/content/packages";
import { cn } from "@/lib/utils";
import { Translation } from "@/types/translation";
import { ExternalLink } from "lucide-react";

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
    <div className="space-y-6">
      <Card className="rounded-xl border bg-secondary/5 shadow-none p-6">
        <h3 className="font-bold mb-4 uppercase text-2xl !font-vazir ltr:tracking-wider text-muted-foreground">
          {isRtl ? "جزئیات" : "Details"}
        </h3>

        <div className="space-y-4 text-sm">
          <Row label={t("stats.license")} value={pkg.license} />
          <Row label={t("stats.downloads")} value={pkg.downloads} />
          <Row
            label={t("stats.author")}
            value={pkg.author}
            highlight
            borderBottom={false}
          />
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-muted-foreground">
            {t("dependencies")}
          </h3>

          <div className="flex flex-wrap gap-2">
            {pkg.dependencies.map((dep) => (
              <Badge
                key={dep}
                variant="outline"
                className="rounded-sm px-2 py-0"
              >
                {dep}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Button className="w-full h-12 rounded-lg text-md font-semibold gap-2">
        {t("documentation")} <ExternalLink size={18} />
      </Button>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
  borderBottom = true,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
  borderBottom?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-between border-border/40 pb-2",
        borderBottom && "border-b",
      )}
    >
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", highlight && "text-primary")}>
        {value}
      </span>
    </div>
  );
}
