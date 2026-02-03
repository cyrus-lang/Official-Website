import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PACKAGES_INTERFACE } from "@/content/packages/mock-packages";
import { Box, Clock, Download } from "lucide-react";
import Link from "next/link";

interface PackagesCardProps {
  locale: "fa" | "en";
  package: MOCK_PACKAGES_INTERFACE;
}
export const PackagesCard = ({ locale, package: pkg }: PackagesCardProps) => {
  return (
    <Link href={`/${locale}/packages/${pkg.name}`}>
      <Card className="rounded-2xl border-border/50 bg-card/50 hover:bg-secondary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Box size={24} />
            </div>
            <Badge variant="secondary" className="rounded-full">
              {pkg.version}
            </Badge>
          </div>
          <CardTitle className="text-2xl mt-4 group-hover:text-primary transition-colors">
            {pkg.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {pkg.description}
          </p>
          <div className="flex flex-wrap gap-4 pt-4 border-t border-border/40 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Download size={14} /> {pkg.downloads}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} /> {pkg.updated}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
