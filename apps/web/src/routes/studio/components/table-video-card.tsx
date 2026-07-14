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
    <div className="flex gap-2">
      <div className="relative overflow-hidden rounded-xl">
        <img src={src} alt={title} className="h-20 w-30 object-cover" />

        <span className="absolute right-2 bottom-2 rounded bg-primary/90 px-1.5 py-0.5 text-xs font-medium text-background">
          {formatVideoDuration(duration)}
        </span>
      </div>
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="text-muted-foreground">{description}</div>
      </div>
    </div>
  )
}

export default TableVideoCard
