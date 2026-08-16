import { Menu, useAudioTrackOptions } from "@videojs/react"
import { Check, Headphones } from "lucide-react"

export function AudioMenu() {
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
            className="flex h-9 w-9 items-center justify-center rounded-md"
          >
            <Headphones className="h-5 w-5" />
          </button>
        }
      />

      <Menu.Content className="min-w-40 rounded-lg border bg-background p-1 text-primary shadow-xl">
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
              className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-sm"
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
