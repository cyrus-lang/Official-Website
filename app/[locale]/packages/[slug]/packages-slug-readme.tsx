export function PackageSlugReadme({
  name,
  isRtl,
  description,
}: {
  name: string;
  isRtl: boolean;
  description?: string;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">{isRtl ? "توضیحات" : "Readme"}</h2>

      <div className="p-8 border rounded-xl bg-card text-muted-foreground min-h-[300px] flex gap-3 flex-col">
        <p>{description}</p>
        <p>{description}</p>
        <p>{description}</p>
      </div>
    </section>
  );
}
