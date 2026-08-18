import { Expand } from "lucide-react"

import { Player } from "@/routes/app/components/video-player/player"

export function FullscreenButton() {
  const player = Player.usePlayer()

  return (
    <button
      type="button"
      onClick={() => player.requestFullscreen()}
      aria-label="Fullscreen"
      className="flex h-9 w-9 items-center justify-center rounded-md"
    >
      <Expand className="size-6" />
    </button>
  )
}
