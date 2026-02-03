import { Badge } from "@/components/ui/badge";

export function PackageSlugHeader({
  name,
  version,
  description,
}: {
  name: string;
  version: string;
  description: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-5xl font-bold tracking-tight">{name}</h1>
        <Badge variant="secondary" className="rounded-md px-3 py-1 font-mono">
          v{version}
        </Badge>
      </div>

      <p className="text-xl text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
