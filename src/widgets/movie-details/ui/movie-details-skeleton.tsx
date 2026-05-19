import { Skeleton } from '@/shared/ui/skeleton';

export function MovieDetailsSkeleton() {
  return (
    <section className="space-y-4 px-5 py-5">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-5 md:grid-cols-[280px_1fr]">
        <Skeleton className="aspect-[2/3] w-full" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </section>
  );
}
