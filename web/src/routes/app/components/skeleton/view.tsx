import { Skeleton } from "@/components/ui/skeleton"

const ViewSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-6 p-4">
      <div className="col-span-8 flex flex-col gap-6">
        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>

          <div className="space-y-2 rounded-xl">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 flex-1 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 flex-1 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 flex-1 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 flex-1 rounded-full" />
          </div>
        </div>
      </div>

      <div className="col-span-4 flex flex-col gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="flex gap-3">
            <Skeleton className="aspect-video h-30 rounded-lg" />

            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewSkeleton
