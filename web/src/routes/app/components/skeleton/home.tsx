import { Skeleton } from "@/components/ui/skeleton"

const HomeSkeleton = () => {
  return (
    <div className="grid grid-cols-3 p-2">
      {new Array(6).fill(0)?.map((_, i) => (
        <div key={i} className="rounded-xl p-3">
          <div className="relative overflow-hidden rounded-xl">
            <Skeleton className="aspect-video w-full rounded-xl" />

            <Skeleton className="absolute right-2 bottom-2 h-5 w-10 rounded" />
          </div>

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
  )
}

export default HomeSkeleton
