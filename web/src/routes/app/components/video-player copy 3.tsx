import {
  createPlayer,
  Menu,
  useAudioTrackOptions,
  useQualityOptions,
} from "@videojs/react"
import { HlsJsVideo } from "@videojs/react/media/hlsjs-video"
import { videoFeatures } from "@videojs/react/video"
import {
  Check,
  Expand,
  Headphones,
  Pause,
  Play,
  SquarePlay,
} from "lucide-react"
import { useRef } from "react"

const Player = createPlayer({
  features: videoFeatures,
})

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

function PlayPauseButton() {
  const player = Player.usePlayer()
  const paused = Player.usePlayer((state) => state.paused)

  return (
    <button
      type="button"
      onClick={() => player.togglePaused()}
      aria-label={paused ? "Play" : "Pause"}
      className="flex h-9 w-9 items-center justify-center rounded-md text-white transition hover:bg-white/10"
    >
      {paused ? (
        <Play className="h-5 w-5 fill-current" />
      ) : (
        <Pause className="h-5 w-5 fill-current" />
      )}
    </button>
  )
}

function TimeBar({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>
}) {
  const currentTime = Player.usePlayer((state) => state.currentTime ?? 0)

  const duration = Player.usePlayer((state) => state.duration ?? 0)

  const progress =
    duration > 0
      ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
      : 0

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)

    const video = videoRef.current

    if (!video || !Number.isFinite(value)) {
      return
    }

    video.currentTime = value
  }

  return (
    <input
      type="range"
      min={0}
      max={duration || 0}
      step={0.01}
      value={Math.min(currentTime, duration || 0)}
      onChange={handleSeek}
      aria-label="Seek video"
      className="h-1 w-full cursor-pointer appearance-none rounded-full accent-white transition-all hover:h-1.5"
      style={{
        background: `linear-gradient(
          to right,
          white ${progress}%,
          rgba(255,255,255,0.35) ${progress}%
        )`,
      }}
    />
  )
}

function TimeDisplay() {
  const currentTime = Player.usePlayer((state) => state.currentTime ?? 0)

  const duration = Player.usePlayer((state) => state.duration ?? 0)

  return (
    <span className="text-xs font-medium whitespace-nowrap text-white tabular-nums">
      {formatTime(currentTime)}
      <span className="mx-1 text-white/50">/</span>
      {formatTime(duration)}
    </span>
  )
}

function AudioMenu() {
  const audio = useAudioTrackOptions()

  if (audio?.state.availability !== "available") {
    return null
  }

  return (
    <Menu.Root side="top" align="end">
      <Menu.Trigger
        render={
          <button
            type="button"
            aria-label="Audio tracks"
            className="flex h-9 w-9 items-center justify-center rounded-md text-white transition hover:bg-white/10"
          >
            <Headphones className="h-5 w-5" />
          </button>
        }
      />

      <Menu.Content className="min-w-40 rounded-lg border border-white/10 bg-black/95 p-1 text-white shadow-xl">
        <Menu.RadioGroup
          value={audio.value}
          onValueChange={audio.setValue}
          aria-label="Audio"
        >
          {audio.options.map((option) => (
            <Menu.RadioItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-sm hover:bg-white/10"
            >
              <span>{option.label}</span>

              {option.value === audio.value && <Check className="h-4 w-4" />}
            </Menu.RadioItem>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  )
}

function QualityMenu() {
  const quality = useQualityOptions()

  if (quality?.state.availability !== "available") {
    return null
  }

  return (
    <Menu.Root side="top" align="end">
      <Menu.Trigger
        render={
          <button
            type="button"
            aria-label="Video quality"
            className="flex h-9 w-9 items-center justify-center rounded-md text-white transition hover:bg-white/10"
          >
            <SquarePlay className="h-5 w-5" />
          </button>
        }
      />

      <Menu.Content className="min-w-40 rounded-lg border border-white/10 bg-black/95 p-1 text-white shadow-xl">
        <Menu.RadioGroup
          value={quality.value}
          onValueChange={quality.setValue}
          aria-label="Quality"
        >
          {quality.options.map((option) => (
            <Menu.RadioItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-sm hover:bg-white/10"
            >
              <span>{option.label}</span>

              {option.value === quality.value && <Check className="h-4 w-4" />}
            </Menu.RadioItem>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  )
}

function FullscreenButton() {
  const player = Player.usePlayer()

  return (
    <button
      type="button"
      onClick={() => player.requestFullscreen()}
      aria-label="Fullscreen"
      className="flex h-9 w-9 items-center justify-center rounded-md text-white transition hover:bg-white/10"
    >
      <Expand className="h-5 w-5" />
    </button>
  )
}

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  return (
    <Player.Provider>
      <Player.Container className="group relative h-full w-full overflow-hidden bg-black">
        <HlsJsVideo
          ref={videoRef}
          src={src}
          crossOrigin="anonymous"
          playsInline
          className="h-full w-full object-contain"
        />

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/60 to-transparent px-3 pt-10 pb-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <TimeBar videoRef={videoRef} />

          <div className="mt-1 flex h-10 items-center justify-between">
            <div className="flex items-center gap-1">
              <PlayPauseButton />
              <TimeDisplay />
            </div>

            <div className="flex items-center gap-1">
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
