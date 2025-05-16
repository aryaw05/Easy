import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-screen-sm px-4 py-6">
      <article>
        <header className="mb-4">
          <Skeleton className="h-[72px] w-2/6 rounded-none" />
          <div className="mt-5 flex gap-2">
            <Skeleton className="h-3 w-20 rounded-none" />
            <Skeleton className="h-3 w-20 rounded-none" />
          </div>
        </header>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full rounded-none" />
          <Skeleton className="h-4 w-4/6 rounded-none" />
          <Skeleton className="h-4 w-8/12 rounded-none" />
          <Skeleton className="h-4 w-10/12 rounded-none" />
          <Skeleton className="h-4 w-1/4 rounded-none" />
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <Skeleton className="h-4 w-10/12 rounded-none" />
          <Skeleton className="h-4 w-4/6 rounded-none" />
          <Skeleton className="h-4 w-8/12 rounded-none" />
          <Skeleton className="h-4 w-10/12 rounded-none" />
          <Skeleton className="h-4 w-1/4 rounded-none" />
          <Skeleton className="h-4 w-full rounded-none" />
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <Skeleton className="h-4 w-10/12 rounded-none" />
          <Skeleton className="h-4 w-4/6 rounded-none" />
          <Skeleton className="h-4 w-8/12 rounded-none" />
          <Skeleton className="h-4 w-10/12 rounded-none" />
          <Skeleton className="h-4 w-1/4 rounded-none" />
          <Skeleton className="h-4 w-full rounded-none" />
        </div>
      </article>
    </div>
  );
}
