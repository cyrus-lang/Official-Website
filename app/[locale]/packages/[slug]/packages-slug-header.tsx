export function PackageSlugHeader({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="space-y-3">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
        {name}
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
