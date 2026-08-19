import { Player } from "@/routes/app/components/video-player/player"

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00"
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`
  }

  return `${minutes}:${String(secs).padStart(2, "0")}`
}

export function TimeDisplay() {
  const currentTime = Player.usePlayer((state) => state.currentTime ?? 0)
  const duration = Player.usePlayer((state) => state.duration ?? 0)

  return (
    <span className="text-xs font-medium whitespace-nowrap tabular-nums">
      {formatTime(currentTime)}
      <span className="mx-1">/</span>
      {formatTime(duration)}
    </span>
  )
}
