import { MOCK_PACKAGES_INTERFACE } from "@/content/packages";
import { PackagesCard } from "./packages-card";

interface PackagesCardsProps {
  packages: MOCK_PACKAGES_INTERFACE[];
  locale: "fa" | "en";
  emptyMessage?: string;
}

export const PackagesCards = ({
  packages,
  locale,
  emptyMessage,
}: PackagesCardsProps) => {
  if (!packages.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <PackagesCard
          locale={locale}
          package={pkg}
          key={pkg.id}
        />
      ))}
    </div>
  );
};
