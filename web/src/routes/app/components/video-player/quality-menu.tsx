import { Menu, useQualityOptions } from "@videojs/react"
import { Check, SquarePlay } from "lucide-react"

export function QualityMenu() {
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
            className="flex h-9 w-9 items-center justify-center rounded-md text-background transition hover:bg-background/10"
          >
            <SquarePlay className="h-5 w-5" />
          </button>
        }
      />

      <Menu.Content className="min-w-40 rounded-lg border border-background/10 bg-primary/95 p-1 text-background shadow-xl">
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
              className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-sm hover:bg-background/10"
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
