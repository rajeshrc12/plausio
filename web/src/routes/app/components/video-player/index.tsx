import { AudioMenu } from "@/routes/app/components/video-player/audio-menu"
import { FullscreenButton } from "@/routes/app/components/video-player/fullscreen-button"
import { PlayPauseButton } from "@/routes/app/components/video-player/play-pause-button"
import { QualityMenu } from "@/routes/app/components/video-player/quality-menu"
import { TimeBar } from "@/routes/app/components/video-player/time-bar"
import { TimeDisplay } from "@/routes/app/components/video-player/time-display"
import { HlsJsVideo } from "@videojs/react/media/hlsjs-video"
import { useRef } from "react"
import { Player } from "@/routes/app/components/video-player/player"
import { VolumeSlider } from "@/routes/app/components/video-player/volume-slider"

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  return (
    <Player.Provider>
      <Player.Container className="group relative h-full w-full overflow-hidden bg-primary">
        <HlsJsVideo
          ref={videoRef}
          src={src}
          crossOrigin="anonymous"
          playsInline
          className="h-full w-full object-contain"
        />

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-primary/95 via-primary/60 to-transparent px-3 pt-10 pb-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <TimeBar videoRef={videoRef} />

          <div className="mt-1 flex h-10 items-center justify-between">
            <div className="flex items-center gap-1">
              <PlayPauseButton />
              <TimeDisplay />
            </div>

            <div className="flex items-center gap-1">
              <VolumeSlider videoRef={videoRef} />
              <QualityMenu />
              <AudioMenu />
              <FullscreenButton />
            </div>
          </div>
        </div>
      </Player.Container>
    </Player.Provider>
  )
}
