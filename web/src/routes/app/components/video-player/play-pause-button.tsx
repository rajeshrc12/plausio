import { Pause, Play } from "lucide-react"

import { Player } from "@/routes/app/components/video-player/player"

export function PlayPauseButton() {
  const player = Player.usePlayer()
  const paused = Player.usePlayer((state) => state.paused)

  return (
    <button
      type="button"
      onClick={() => player.togglePaused()}
      aria-label={paused ? "Play" : "Pause"}
      className="flex h-9 w-9 items-center justify-center rounded-md"
    >
      {paused ? (
        <Play className="h-5 w-5 fill-current" />
      ) : (
        <Pause className="h-5 w-5 fill-current" />
      )}
    </button>
  )
}
