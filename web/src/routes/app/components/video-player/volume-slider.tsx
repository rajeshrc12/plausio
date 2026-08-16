import { Volume1, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"
import { Menu } from "@videojs/react"

import { Slider } from "@/components/ui/slider"

type VolumeSliderProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>
}

export function VolumeSlider({ videoRef }: VolumeSliderProps) {
  const [volume, setVolume] = useState(100)

  const handleVolumeChange = (value: number | readonly number[]) => {
    const nextVolume = typeof value === "number" ? value : (value[0] ?? 0)

    setVolume(nextVolume)

    if (videoRef.current) {
      videoRef.current.volume = nextVolume / 100
      videoRef.current.muted = nextVolume === 0
    }
  }

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2

  return (
    <Menu.Root side="top" align="end">
      <Menu.Trigger
        render={
          <button
            type="button"
            aria-label="Volume"
            className="flex h-9 w-9 items-center justify-center rounded-md"
          >
            <VolumeIcon className="h-5 w-5" />
          </button>
        }
      />

      <Menu.Content className="flex h-48 w-12 items-center justify-center rounded-lg bg-background p-2 text-primary shadow-xl">
        <Slider
          value={[volume]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          orientation="vertical"
          className="h-32 **:data-[slot=slider-range]:bg-primary **:data-[slot=slider-track]:bg-muted-foreground"
          aria-label="Volume"
        />
      </Menu.Content>
    </Menu.Root>
  )
}
