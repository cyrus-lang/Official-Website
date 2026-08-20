import { Skeleton } from "@/components/ui/skeleton";

export default function DocsLoading() {
  return (
    <div className="px-1 py-5 pt-8 ltr:lg:ml-8 rtl:lg:mr-8 ltr:md:ml-6 rtl:md:mr-6 sm:px-0">
      <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-9 2xl:col-span-10 lg:col-span-8 col-span-12 space-y-4">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />

          <div className="pt-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Skeleton className="h-40 w-full rounded-lg" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        <div className="xl:col-span-3 2xl:col-span-2 lg:col-span-4 col-span-full max-lg:hidden space-y-3">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/5" />
        </div>
      </div>
    </div>
  );
}
