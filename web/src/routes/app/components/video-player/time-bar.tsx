import { Slider } from "@/components/ui/slider"
import { Player } from "@/routes/app/components/video-player/player"

export function TimeBar({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>
}) {
  const currentTime = Player.usePlayer((state) => state.currentTime ?? 0)
  const duration = Player.usePlayer((state) => state.duration ?? 0)

  const value = duration > 0 ? Math.min(currentTime, duration) : 0

  const handleSeek = (value: number | readonly number[]) => {
    const nextValue = typeof value === "number" ? value : (value[0] ?? 0)

    const video = videoRef.current

    if (!video || !Number.isFinite(nextValue)) {
      return
    }

    video.currentTime = nextValue
  }

  return (
    <Slider
      value={[value]}
      onValueChange={handleSeek}
      min={0}
      max={duration || 0}
      step={0.01}
      aria-label="Seek video"
      className="h-1 w-full cursor-pointer **:data-[slot=slider-range]:bg-primary **:data-[slot=slider-track]:bg-muted-foreground"
    />
  )
}
