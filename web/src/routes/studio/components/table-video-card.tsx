import { formatVideoDuration } from "@/utils/video"

const TableVideoCard = ({
  src,
  duration,
  title,
  description,
}: {
  src: string
  duration: number
  title: string
  description: string
}) => {
  return (
    <div className="flex w-full min-w-0 gap-2">
      <div className="relative shrink-0 overflow-hidden rounded-xl">
        <img src={src} alt={title} className="h-20 w-30 object-cover" />

        <span className="absolute right-2 bottom-2 rounded bg-primary/90 px-1.5 py-0.5 text-xs font-medium text-background">
          {formatVideoDuration(duration)}
        </span>
      </div>

      <div className="w-40 flex-1 truncate lg:min-w-0">
        <div className="truncate font-medium">{title}</div>
        <div className="truncate text-muted-foreground">{description}</div>
      </div>
    </div>
  )
}

export default TableVideoCard
