import { Expand } from "lucide-react"

import { Player } from "@/routes/app/components/video-player/player"

export function FullscreenButton() {
  const player = Player.usePlayer()

  return (
    <button
      type="button"
      onClick={() => player.requestFullscreen()}
      aria-label="Fullscreen"
      className="flex h-9 w-9 items-center justify-center rounded-md text-background transition hover:bg-background/10"
    >
      <Expand className="h-5 w-5" />
    </button>
  )
}
