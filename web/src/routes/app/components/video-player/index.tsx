import { useEffect, useRef, useState } from "react"
import { AudioMenu } from "@/routes/app/components/video-player/audio-menu"
import { FullscreenButton } from "@/routes/app/components/video-player/fullscreen-button"
import { PlayPauseButton } from "@/routes/app/components/video-player/play-pause-button"
import { QualityMenu } from "@/routes/app/components/video-player/quality-menu"
import { TimeBar } from "@/routes/app/components/video-player/time-bar"
import { TimeDisplay } from "@/routes/app/components/video-player/time-display"
import { HlsJsVideo } from "@videojs/react/media/hlsjs-video"
import { Player } from "@/routes/app/components/video-player/player"
import { VolumeSlider } from "@/routes/app/components/video-player/volume-slider"
import BackButton from "@/routes/app/components/video-player/back-button"

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [controlsVisible, setControlsVisible] = useState(true)

  const showControls = () => {
    setControlsVisible(true)

    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current)
    }

    hideControlsTimer.current = setTimeout(() => {
      setControlsVisible(false)
    }, 2500)
  }

  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current)
      }
    }
  }, [])

  return (
    <Player.Provider>
      <Player.Container
        onMouseMove={showControls}
        onMouseEnter={showControls}
        className={`relative h-full w-full overflow-hidden ${
          !controlsVisible ? "cursor-none" : ""
        }`}
      >
        <HlsJsVideo
          ref={videoRef}
          src={src}
          crossOrigin="anonymous"
          playsInline
          className="object-fit h-full w-full"
        />
        {controlsVisible && <BackButton />}
        <div
          className={`absolute bottom-0 flex w-full flex-col gap-3 px-10 pb-5 transition-opacity duration-200 md:px-20 lg:px-40 ${
            controlsVisible
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex items-end justify-between font-medium">
            <div className="text-2xl">The Avengers</div>
            <TimeDisplay />
          </div>
          <TimeBar videoRef={videoRef} />

          <div className="mt-1 flex h-10 items-center justify-between">
            <div className="flex items-center gap-1">
              <PlayPauseButton />
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
