import { Skeleton } from "@workspace/ui/components/skeleton"

const ChannelSkeleton = () => {
  return (
    <div className="flex flex-col p-5">
      <Skeleton className="h-36 w-full rounded-2xl" />

      <div className="flex">
        <Skeleton className="m-5 h-40 w-40 shrink-0 rounded-full" />

        <div className="flex flex-1 flex-col justify-center gap-3">
          <Skeleton className="h-10 w-64" />

          <div className="flex gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-xl" />
            <Skeleton className="h-4 w-5/6 max-w-lg" />
          </div>

          <Skeleton className="mt-2 h-10 w-28 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 p-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-xl p-3">
            <Skeleton className="aspect-video w-full rounded-xl" />

            <div className="mt-3 flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChannelSkeleton
