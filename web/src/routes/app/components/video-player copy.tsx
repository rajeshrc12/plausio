import {
  createPlayer,
  Menu,
  useAudioTrackOptions,
  useQualityOptions,
} from "@videojs/react"
import { HlsJsVideo } from "@videojs/react/media/hlsjs-video"
import { videoFeatures } from "@videojs/react/video"

const Player = createPlayer({
  features: videoFeatures,
})

function PlayPauseButton() {
  const player = Player.usePlayer()
  const paused = Player.usePlayer((state) => state.paused)

  return (
    <button
      type="button"
      onClick={() => player.togglePaused()}
      className="rounded bg-black/70 px-3 py-1.5 text-sm text-white"
    >
      {paused ? "Play" : "Pause"}
    </button>
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
            className="rounded bg-black/70 px-3 py-1.5 text-sm text-white"
          >
            Audio
          </button>
        }
      />

      <Menu.Content className="rounded bg-black p-1 text-white">
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
              className="flex cursor-pointer items-center justify-between gap-4 rounded px-3 py-1.5 text-sm hover:bg-white/10"
            >
              <span>{option.label}</span>
              {option.value === audio.value && <span>✓</span>}
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
            className="rounded bg-black/70 px-3 py-1.5 text-sm text-white"
          >
            Quality
          </button>
        }
      />

      <Menu.Content className="rounded bg-black p-1 text-white">
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
              className="flex cursor-pointer items-center justify-between gap-4 rounded px-3 py-1.5 text-sm hover:bg-white/10"
            >
              <span>{option.label}</span>
              {option.value === quality.value && <span>✓</span>}
            </Menu.RadioItem>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  )
}

export default function VideoPlayer({ src }: { src: string }) {
  return (
    <Player.Provider>
      <Player.Container className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        <HlsJsVideo
          src={src}
          crossOrigin="anonymous"
          playsInline
          className="h-full w-full object-contain"
        />

        <div className="absolute right-2 bottom-2 flex gap-1">
          <PlayPauseButton />
          <QualityMenu />
          <AudioMenu />
        </div>
      </Player.Container>
    </Player.Provider>
  )
}
